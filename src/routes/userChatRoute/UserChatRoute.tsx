/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, {
  FC,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import openSocket from 'socket.io-client'
import moment from 'moment'
import { nanoid } from 'nanoid'
import { debounce } from 'lodash-es'

import useScrollToRef from 'hooks/useScrollToRef'
import usePressEnter from 'hooks/usePressEnter'
import EmojiButton from 'components/emoji/EmojiButton'
import useElementOnScreen from '../../hooks/useElementOnScreen'

import { API_WS } from '../../config'
import ChatMessage from '../../components/chat/chatMessage/ChatMessage'
import ChatTitle from '../../components/chat/ChatTitle'
import ChatBox from '../../components/chat/ChatBox'
import ChatFooter from '../../components/chat/ChatFooter'
import Message from '../../interfaces/message.interface'
import Send from '../../assets/send.svg'
import chatStore from '../../store/chatStore/chat.store'
import { checkRegExp, repliedMessage } from '../../helpers/chat/chat.helper'
import ChatFooterWidget from '../../components/chat/ChatFooterWidget'
import { checkToEmptyString, objectValueToArray } from '../../helpers/helper'
import {
  ClientConnectedOperatorType,
  ClientPressureData,
} from './UserChatRoute.types'
import useIsOnline from '../../hooks/useIsOnline'

import {
  chatFooterWidgetInput,
  chatFooterWidgetText,
  inputStyle,
  isErrorNoticeMessageStyle,
  messageWrapperStyle,
  sendButtonStyle,
  sendIconStyle,
  styledMessageEndRefWrapper,
} from './UserChatRoute.styled'
import { alertStyle } from '../operatorChatRoute/OperatorChatRoute.styled'

const UserChatRoute: FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  const [text, setText] = useState<string>('')
  const [pressureData, setPressureData] = useState<ClientPressureData>({
    mm: '',
    hg: '',
  })
  const [messageEnd, setMessageEnd] = useState<Message>()
  const [isPulseWidget, setIsPulseWidget] = useState<boolean>(false)
  const [isWeightWidget, setIsWeightWidget] = useState<boolean>(false)
  const [isPressureWidget, setIsPressureWidget] = useState<boolean>(false)
  const [isErrorNoticeMessage, setIsErrorNoticeMessage] =
    useState<boolean>(false)
  const [isMoodWidget, setIsMoodWidget] = useState<boolean>(false)
  const [isWalkedDistanceWidget, setIsWalkedDistanceWidget] =
    useState<boolean>(false)

  const socket = useRef<SocketIOClient.Socket>()
  const divRef = useRef<HTMLDivElement>(null)
  const divRefEnd = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messages = objectValueToArray(chatStore.userChatMessages)
  const isOnline = useIsOnline()

  useLayoutEffect(() => {
    chatStore.removeUserChatMessages()
    chatStore.clearPersistedData()
  }, [])

  useEffect(() => setMessageEnd(messages[messages.length - 1]), [messages])

  const [isVisible] = useElementOnScreen({
    options: { root: null, rootMargin: '0px', threshold: 0 },
    divRefEnd,
  })

  useScrollToRef({
    ref: divRef,
    isVisible,
    location: location.pathname,
    messageEnd,
    dependencies: [messageEnd],
  })

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
    socket.current?.on('message:user', (value: string) => {
      const [body, , _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'user',
        date: moment().format(),
        userError: isErrorNoticeMessage,
        _id,
      })
    })

    socket.current?.on('message:operator', (value: string) => {
      const [body, _id, repliedMessageId, repliedMessageBody] = value.split('#')

      chatStore.toggleCoachIsTyping(false)

      chatStore.addUserChatMessage({
        body,
        type: 'operator',
        date: moment().format(),
        userError: isErrorNoticeMessage,
        _id,
        ...repliedMessage(repliedMessageId, repliedMessageBody),
      })
    })

    socket.current?.on('message:doctor', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'doctor',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on('widget:mood:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body: 'How is your mood?',
        type: 'system',
        date: moment().format(),
        _id,
      })
      setIsMoodWidget(true)
    })

    socket.current?.on('widget:mood:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on('widget:walkedDistance:operator', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })

      setIsWalkedDistanceWidget(true)
    })

    socket.current?.on('widget:walkedDistance:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on('widget:pulse:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body: `Please, send your heart rate.
        For example: 80
        `,
        type: 'system',
        date: moment().format(),
        _id,
      })

      setIsPulseWidget(true)
    })

    socket.current?.on('widget:pulse:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on('widget:weight:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body: `Please, send your weight.
        For example: 190`,
        type: 'system',
        date: moment().format(),
        _id,
      })

      setIsWeightWidget(true)
    })

    socket.current?.on('widget:weight:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on('widget:pressure:operator', (value: string) => {
      const [, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body: `Please, send your blood pressure.
        For example: 120/80`,
        type: 'system',
        date: moment().format(),
        _id,
      })

      setIsPressureWidget(true)
    })

    socket.current?.on('widget:pressure:user', (value: string) => {
      const [body, _id] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'system',
        date: moment().format(),
        _id,
      })
    })

    socket.current?.on(
      'client:connected:operator',
      (msg: ClientConnectedOperatorType) => {
        if (msg?.isOperatorStatus) {
          chatStore.setActiveOperator(msg)
        }

        chatStore.addUserChatMessage({
          body: 'You have connected to the chat.',
          type: 'system',
          date: moment().format(),
          _id: nanoid(),
        })
      }
    )

    socket.current?.on(
      'operator:online',
      (msg: ClientConnectedOperatorType) => {
        if (msg?.isOperatorStatus) {
          chatStore.setActiveOperator(msg)
        }
      }
    )

    socket.current?.on('operator:offline', () => {
      // TODO: check if deprecated
      // chatStore.setActiveOperator({
      //   room: '',
      //   isOperatorStatus: false,
      //   operatorName: '',
      //   operatorAvatar: '',
      // })
    })

    socket.current?.on('widget:cancel', () => {
      chatStore.addUserChatMessage({
        body: 'Cancelled last widget.',
        type: 'system',
        date: moment().format(),
        _id: nanoid(),
      })

      if (isPulseWidget) {
        setIsPulseWidget(false)
      } else if (isWeightWidget) {
        setIsWeightWidget(false)
      } else if (isPressureWidget) {
        setIsPressureWidget(false)
      } else if (isMoodWidget) {
        setIsMoodWidget(false)
      } else if (isWalkedDistanceWidget) {
        setIsWalkedDistanceWidget(false)
      }
      setIsErrorNoticeMessage(false)
    })

    socket.current?.on('image:operator', (value: string) => {
      const [body, _id, date] = value.split('#')

      chatStore.addUserChatMessage({
        body,
        type: 'image',
        date,
        _id,
      })

      chatStore.toggleCoachIsTyping(false)
    })

    return () => {
      socket.current?.off('image:operator')
      socket.current?.off('message:user')
      socket.current?.off('message:user:error')
      socket.current?.off('message:operator')
      socket.current?.off('message:doctor')
      socket.current?.off('widget:pulse:operator')
      socket.current?.off('widget:pulse:user')
      socket.current?.off('widget:weight:operator')
      socket.current?.off('widget:weight:user')
      socket.current?.off('widget:pressure:operator')
      socket.current?.off('widget:pressure:user')
      socket.current?.off('widget:mood:operator')
      socket.current?.off('widget:mood:user')
      socket.current?.off('client:connected:operator')
      socket.current?.off('operator:online')
      socket.current?.off('operator:offline')
      socket.current?.off('widget:cancel')
      socket.current?.off('widget:walkedDistance:operator')
      socket.current?.off('widget:walkedDistance:user')
    }
  }, [
    id,
    messages,
    isErrorNoticeMessage,
    isPulseWidget,
    isWeightWidget,
    isPressureWidget,
    isMoodWidget,
    isWalkedDistanceWidget,
  ])

  useEffect(() => {
    socket.current?.emit('client:connected:operator', {
      room: id,
    })
  }, [id])

  useEffect(() => {
    socket.current?.on('coach:typing', () => {
      chatStore.toggleCoachIsTyping(true)

      if (chatStore.coachIsTyping) {
        const timerId = setTimeout(
          () => chatStore.toggleCoachIsTyping(false),
          5000
        )
        return () => clearTimeout(timerId)
      }
    })

    return () => {
      socket.current?.off('coach:typing')
    }
  }, [])

  const clientTyping = useMemo(
    () =>
      debounce(
        () => {
          socket.current?.emit('client:typing', {
            room: id,
          })
        },
        2000,
        {
          leading: true,
          trailing: false,
        }
      ),
    [id]
  )

  const onChangeInput = useCallback(
    (e) => {
      clientTyping()
      setText(e.target.value)
    },
    [clientTyping]
  )

  const sendMessageValidation = useMemo(
    () =>
      (isPulseWidget ||
        isWeightWidget ||
        isPressureWidget ||
        isMoodWidget ||
        isWalkedDistanceWidget) &&
      (checkToEmptyString(text) ||
        (checkToEmptyString(pressureData.hg) &&
          checkToEmptyString(pressureData.mm))),
    [
      isMoodWidget,
      isPressureWidget,
      isPulseWidget,
      isWalkedDistanceWidget,
      isWeightWidget,
      pressureData,
      text,
    ]
  )

  const sendMessage = useCallback(() => {
    if (sendMessageValidation) {
      setIsErrorNoticeMessage(true)
      if (isMoodWidget) {
        socket.current?.emit('widget:mood:user', {
          message: text,
          room: id,
        })
        setIsMoodWidget(false)
        setIsErrorNoticeMessage(false)
      } else if (checkRegExp(text, /^\d{2,3}$/) && isPulseWidget) {
        socket.current?.emit('widget:pulse:user', {
          message: text,
          room: id,
        })
        setIsPulseWidget(false)
        setIsErrorNoticeMessage(false)
      } else if (checkRegExp(text, /^\d{2,4}$/) && isWeightWidget) {
        socket.current?.emit('widget:weight:user', {
          message: text,
          room: id,
        })
        setIsWeightWidget(false)
        setIsErrorNoticeMessage(false)
      } else if (
        checkRegExp(
          `${pressureData.mm}/${pressureData.hg}`,
          /^\d{2,3}\/\d{2,3}$/
        ) &&
        isPressureWidget
      ) {
        socket.current?.emit('widget:pressure:user', {
          message: `${pressureData.mm}/${pressureData.hg}`,
          room: id,
        })
        setIsPressureWidget(false)
        setIsErrorNoticeMessage(false)
      } else if (checkRegExp(text, /^\d+$/) && isWalkedDistanceWidget) {
        socket.current?.emit('widget:walkedDistance:user', {
          message: text,
          room: id,
        })
        setIsWalkedDistanceWidget(false)
        setIsErrorNoticeMessage(false)
      } else {
        socket.current?.emit('message:user:error', {
          message: `Client tried to enter invalid widget data: ${
            pressureData.mm && pressureData.hg
              ? `${pressureData.mm}/${pressureData.hg}`
              : text
          }`,
          room: id,
        })
      }
    } else if (checkToEmptyString(text)) {
      const validatedText = text.replaceAll('#', '')
      socket.current?.emit('message:user', {
        message: validatedText,
        room: id,
      })
    }
    setText('')
    if (pressureData.mm && pressureData.hg) {
      setPressureData({
        mm: '',
        hg: '',
      })
    }
  }, [
    id,
    isMoodWidget,
    isPressureWidget,
    isPulseWidget,
    isWalkedDistanceWidget,
    isWeightWidget,
    pressureData,
    sendMessageValidation,
    text,
  ])

  usePressEnter(sendMessage)

  const widgetInput = useMemo(
    () =>
      isPulseWidget
        ? 'bpm'
        : isWeightWidget
        ? 'Lbs'
        : isPressureWidget
        ? 'mm Hg'
        : isWalkedDistanceWidget
        ? 'miles'
        : isMoodWidget
        ? ' '
        : '',
    [
      isMoodWidget,
      isPressureWidget,
      isPulseWidget,
      isWalkedDistanceWidget,
      isWeightWidget,
    ]
  )

  const handleSetPressuresData = useCallback(
    (value) => (e) => {
      setPressureData((prev) => ({ ...prev, [value]: e.target.value }))
    },
    []
  )

  return (
    <ChatBox>
      <ChatTitle />
      <div className={messageWrapperStyle} ref={divRef}>
        {messages
          .filter(({ userError }: Message) => !userError)
          .map(
            ({
              body,
              type,
              date,
              repliedMessageId,
              repliedMessageBody,
              unresponsive,
            }: Message) => (
              <ChatMessage
                body={body}
                type={type}
                date={date}
                repliedMessageId={repliedMessageId}
                repliedMessageBody={repliedMessageBody}
                unresponsive={unresponsive}
                key={nanoid()}
                isUserChat
              />
            )
          )}
        <div className={styledMessageEndRefWrapper} ref={divRefEnd} />
        {isErrorNoticeMessage && (
          <div className={isErrorNoticeMessageStyle}>
            Please, fill in the widget according to the example
          </div>
        )}
      </div>

      {!isOnline && (
        <span className={alertStyle}>The Internet connection was lost...</span>
      )}

      {widgetInput.length ? (
        <ChatFooterWidget>
          <div className={chatFooterWidgetInput}>
            {isPressureWidget ? (
              <>
                <input
                  type="text"
                  maxLength={3}
                  className={inputStyle}
                  value={pressureData.mm}
                  onChange={handleSetPressuresData('mm')}
                />
                <p className="flex justify-cecnter items-center text-blue-900 text-lg font-medium pr-2 pl-2">
                  /
                </p>
                <input
                  type="text"
                  maxLength={2}
                  className={inputStyle}
                  value={pressureData.hg}
                  onChange={handleSetPressuresData('hg')}
                />
              </>
            ) : (
              <input
                type="text"
                className={inputStyle}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            )}
          </div>
          <div className={chatFooterWidgetText}>{widgetInput}</div>
          <button
            type="submit"
            onClick={sendMessage}
            className={sendButtonStyle}>
            <img src={Send} alt="Send" className={sendIconStyle} />
          </button>
        </ChatFooterWidget>
      ) : (
        <ChatFooter>
          <EmojiButton inputRef={inputRef} text={text} setText={setText} />
          <input
            type="text"
            placeholder="Write a message..."
            className={inputStyle}
            value={text}
            onChange={onChangeInput}
            ref={inputRef}
          />
          <button
            type="submit"
            onClick={sendMessage}
            className={sendButtonStyle}>
            <img src={Send} alt="Send" className={sendIconStyle} />
          </button>
        </ChatFooter>
      )}
    </ChatBox>
  )
}

export default observer(UserChatRoute)
