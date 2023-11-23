/* eslint-disable @typescript-eslint/naming-convention */
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'
import moment from 'moment'
import { nanoid } from 'nanoid'
import openSocket from 'socket.io-client'

import chatStore from '../../../store/chatStore/chat.store'
import operatorStore from '../../../store/operatorStore/operator.store'
import statsStore from '../../../store/statsStore/stats.store'
import accountStore from '../../../store/accountStore/account.store'
import { repliedMessage } from '../../../helpers/chat/chat.helper'

import { API_WS } from '../../../config'

const useSocketEffects = (
  id: string
): MutableRefObject<SocketIOClient.Socket | undefined> => {
  const { id: kitId } = chatStore.currentChat.kit
  const socket = useRef<SocketIOClient.Socket>()

  const sendOperatorOnline = useCallback(() => {
    const findAvatar = operatorStore.operators.find(
      (oper) => oper.avatar === `${accountStore.user?.id}.webp`
    )
    socket.current?.emit('operator:online', {
      room: id,
      isOperatorStatus: true,
      operatorName: `${
        accountStore.user?.type.charAt(0).toUpperCase() +
        accountStore.user?.type.slice(1)
      } ${accountStore.user?.name}`,
      operatorAvatar: findAvatar?.avatar,
    })
  }, [id])

  const sendOperatorOffline = useCallback(() => {
    socket.current?.emit('operator:offline', {
      room: id,
    })
  }, [id])

  useEffect(() => {
    window.addEventListener('beforeunload', sendOperatorOffline)
    return () => {
      sendOperatorOffline()
      window.removeEventListener('beforeunload', sendOperatorOffline)
    }
  }, [sendOperatorOffline])

  useEffect(() => {
    socket.current = openSocket(`${API_WS}`, {
      path: '/messages',
      query: `room=${id}`,
      transports: ['websocket'],
    })

    sendOperatorOnline()
    const interval = setInterval(() => sendOperatorOnline(), 10000)

    return () => {
      clearInterval(interval)
      socket.current?.close()
    }
  }, [id, sendOperatorOnline])

  useEffect(() => {
    socket.current?.on('message:user', (value: string) => {
      const [body, userError, _id, repliedMessageId, repliedMessageBody] =
        value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        userError: JSON.parse(userError),
        type: 'user',
        ...repliedMessage(repliedMessageId, repliedMessageBody),
      })
    })

    socket.current?.on('message:operator', (value: string) => {
      const [body, _id, repliedMessageId, repliedMessageBody] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'operator',
        ...repliedMessage(repliedMessageId, repliedMessageBody),
      })
    })

    socket.current?.on('message:doctor', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'doctor',
      })
    })

    socket.current?.on('widget:mood:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body: 'Mood widget has been sent to the client.',
        date: moment().format(),
        type: 'system',
      })
    })

    socket.current?.on('widget:mood:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'system',
      })

      statsStore.addMood(body, kitId)
    })

    socket.current?.on('widget:walkedDistance:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body: 'Walked distance widget has been sent to the client.',
        date: moment().format(),
        type: 'system',
      })
    })

    socket.current?.on('widget:walkedDistance:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'system',
      })

      statsStore.addWalkedDistance(Number(body), kitId)
    })

    socket.current?.on('widget:weight:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body: 'Weight widget has been sent to the client.',
        date: moment().format(),
        type: 'system',
      })
    })

    socket.current?.on('widget:weight:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'system',
      })

      statsStore.addWeight(Number(body), kitId)
    })
    // TODO сокеты пульса и оператора надо объеденить в один - кардио
    /* socket.current?.on('widget:pulse:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body: 'Pulse widget has been sent to the client.',
        date: moment().format(),
        type: 'system',
      })
    })

    socket.current?.on('widget:pulse:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'system',
      })

      statsStore.addPulse(body)
    })

    socket.current?.on('widget:pressure:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body: 'Pressure widget has been sent to the client.',
        date: moment().format(),
        type: 'system',
      })
    })

    socket.current?.on('widget:pressure:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date: moment().format(),
        type: 'system',
      })

      statsStore.addPressure(body)
    }) */

    socket.current?.on('widget:cancel', (body: string) => {
      chatStore.addChatMessages({
        _id: nanoid(),
        body,
        date: moment().format(),
        type: 'system',
        unresponsive: true,
      })
    })

    socket.current?.on('client:connected:operator', () => {
      chatStore.addChatMessages({
        _id: nanoid(),
        body: 'The client has connected to the chat.',
        date: moment().format(),
        type: 'system',
        unresponsive: true,
      })
    })

    socket.current?.on('image:operator', (value: string) => {
      const [body, _id, date] = value.split('#')

      chatStore.addChatMessages({
        _id,
        body,
        date,
        type: 'image',
      })
    })

    return () => {
      socket.current?.off('image:operator')
      socket.current?.off('message:user')
      socket.current?.off('message:operator')
      socket.current?.off('message:doctor')
      /* socket.current?.off('widget:pulse:operator')
      socket.current?.off('widget:pulse:user') */
      socket.current?.off('widget:mood:operator')
      socket.current?.off('widget:mood:user')
      socket.current?.off('widget:weight:operator')
      socket.current?.off('widget:weight:user')
      /* socket.current?.off('widget:pressure:operator')
      socket.current?.off('widget:pressure:user') */
      socket.current?.off('connected:user')
      socket.current?.off('client:connected:operator')
      socket.current?.off('operator:online')
      socket.current?.off('operator:offline')
      socket.current?.off('widget:cancel')
      socket.current?.off('widget:walkedDistance:operator')
      socket.current?.off('widget:walkedDistance:user')
    }
  }, [id, kitId])

  useEffect(() => {
    // eslint-disable-next-line consistent-return
    socket.current?.on('client:typing', () => {
      chatStore.toggleClientIsTyping(true)

      if (chatStore.clientIsTyping) {
        const timerId = setTimeout(
          () => chatStore.toggleClientIsTyping(false),
          5000
        )
        return () => clearTimeout(timerId)
      }
    })

    return () => {
      socket.current?.off('client:typing')
    }
  }, [])

  return socket
}

export default useSocketEffects
