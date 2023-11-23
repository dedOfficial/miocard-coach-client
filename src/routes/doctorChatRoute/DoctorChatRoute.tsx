/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { FC, useEffect, useRef, useState, useCallback } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import openSocket from 'socket.io-client'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import useScrollToRef from 'hooks/useScrollToRef'
import usePressEnter from 'hooks/usePressEnter'

import { API_WS } from '../../config'
import Send from '../../assets/send.svg'
import ChatMessage from '../../components/chat/chatMessage/ChatMessage'
import ChatTitle from '../../components/chat/ChatTitle'
import ChatBox from '../../components/chat/ChatBox'
import ChatFooter from '../../components/chat/ChatFooter'
import ChatWidgetsPopup from '../../components/chat/ChatWidgetsPopup'
import Message from '../../interfaces/message.interface'
import chatStore from '../../store/chatStore/chat.store'
import accountStore from '../../store/accountStore/account.store'
import statsStore from '../../store/statsStore/stats.store'
import { objectValueToArray } from '../../helpers/helper'

import {
  messageWrapperStyle,
  inputStyle,
  sendButtonStyle,
  sendIconStyle,
  widgetButton,
  widgetsContentStyle,
  modalBackgroundStyle,
} from './DoctorChatRoute.styled'

const DoctorChatRoute: FC = () => {
  const { id: kitId } = chatStore.currentChat.kit

  const { id } = useParams<{ id: string }>()
  const [text, setText] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const socket = useRef<SocketIOClient.Socket>()
  const divRef = useRef<HTMLDivElement>(null)
  const [isWidgetsModal, isSetWidgetsModal] = useState<boolean>(false)

  const fetchUser = useCallback(() => {
    if (!accountStore.userToken.length) {
      accountStore.getUser()
    }
  }, [])

  const fetchChatData = useCallback(async () => {
    chatStore.fetchChat(id)
    await chatStore.fetchChatHistory(id)
    setMessages(objectValueToArray(chatStore.chatMessages))
  }, [id])

  useEffect(() => {
    fetchUser()
    fetchChatData()
  }, [fetchUser, fetchChatData])

  useEffect(() => {
    socket.current = openSocket(`${API_WS}`, {
      path: '/messages',
      query: `room=${id}`,
      transports: ['websocket'],
    })
    return () => {
      socket.current?.close()
    }
  }, [id])

  useEffect(() => {
    socket.current?.on('message:user', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: msg,
          type: 'user',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('message:operator', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: msg,
          type: 'operator',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('message:doctor', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: msg,
          type: 'doctor',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('widget:weight:operator', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: 'Weight widget has been sent to the client.',
          type: 'system',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('widget:weight:user', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: `Weight widget response: ${msg}`,
          type: 'system',
          date: moment().format(),
        },
      ])

      statsStore.addWeight(Number(msg), kitId)
    })
    // TODO сокеты пульса и оператора надо объеденить в один - кардио
    /* socket.current?.on('widget:pulse:operator', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: 'Pulse widget has been sent to the client.',
          type: 'system',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('widget:pulse:user', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: `Pulse widget response: ${msg}`,
          type: 'system',
          date: moment().format(),
        },
      ])

      statsStore.addPulse(msg)
    })

    socket.current?.on('widget:pressure:operator', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: 'Pressure widget has been sent to the client.',
          type: 'system',
          date: moment().format(),
        },
      ])
    })

    socket.current?.on('widget:pressure:user', (msg: string) => {
      setMessages([
        ...messages,
        {
          body: `Pressure widget response: ${msg}`,
          type: 'system',
          date: moment().format(),
        },
      ])

      statsStore.addPressure(msg)
    }) */

    return () => {
      socket.current?.off('message:user')
      socket.current?.off('message:operator')
      socket.current?.off('message:doctor')
      /* socket.current?.off('widget:pulse:operator')
      socket.current?.off('widget:pulse:user') */
      socket.current?.off('widget:weight:operator')
      socket.current?.off('widget:weight:user')
      /* socket.current?.off('widget:pressure:operator')
      socket.current?.off('widget:pressure:user') */
    }
  }, [id, kitId, messages])

  const sendMessage = useCallback(() => {
    if (text !== '')
      socket.current?.emit('message:doctor', {
        message: text,
        room: id,
      })
    setText('')
  }, [id, text])

  const sendPulse = useCallback(() => {
    socket.current?.emit('widget:pulse:operator', {
      message: 'Pulse widget',
      room: id,
    })
    isSetWidgetsModal(false)
  }, [id])

  const sendWeight = useCallback(() => {
    socket.current?.emit('widget:weight:operator', {
      message: 'Weight widget',
      room: id,
    })
    isSetWidgetsModal(false)
  }, [id])

  const sendPressure = useCallback(() => {
    socket.current?.emit('widget:pressure:operator', {
      message: 'Blood pressure widget',
      room: id,
    })
    isSetWidgetsModal(false)
  }, [id])

  useScrollToRef({
    ref: divRef,
    dependencies: [messages.length],
  })

  const showWidgetModal = useCallback(() => {
    isSetWidgetsModal(!isWidgetsModal)
  }, [isWidgetsModal])

  usePressEnter(sendMessage)

  if (!accountStore.user.doctor) {
    return <Redirect to="/" />
  }

  return (
    <>
      {isWidgetsModal && <div className={modalBackgroundStyle} />}
      {isWidgetsModal && (
        <ChatWidgetsPopup showWidgetModal={showWidgetModal}>
          <div className={widgetsContentStyle}>
            <button type="button" className={widgetButton} onClick={sendPulse}>
              Pulse widget
            </button>
            <button type="button" className={widgetButton} onClick={sendWeight}>
              Weight widget
            </button>
            <button
              type="button"
              className={widgetButton}
              onClick={sendPressure}>
              Blood pressure widget
            </button>
          </div>
        </ChatWidgetsPopup>
      )}
      <ChatBox>
        <ChatTitle chatId={id} isDoctor />
        <div className={messageWrapperStyle} ref={divRef}>
          {messages.map(({ body, type, date }: Message) => (
            <ChatMessage body={body} type={type} date={date} key={nanoid()} />
          ))}
        </div>
        <ChatFooter>
          <input
            type="text"
            placeholder="Write a message..."
            className={inputStyle}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div>
            <button
              type="submit"
              className={sendButtonStyle}
              onClick={sendMessage}>
              <img src={Send} alt="Send" className={sendIconStyle} />
            </button>
          </div>
        </ChatFooter>
      </ChatBox>
    </>
  )
}

export default observer(DoctorChatRoute)
