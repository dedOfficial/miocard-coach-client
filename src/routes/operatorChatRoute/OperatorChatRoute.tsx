/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import _ from 'lodash-es'

import EmojiButton from 'components/emoji/EmojiButton'
import usePressEnter from 'hooks/usePressEnter'
import useUploadFiles from './hooks/useUploadFiles'
import useLazyLoading from './hooks/useLazyLoading'
import useScrollToRef from '../../hooks/useScrollToRef'
import useElementOnScreen from '../../hooks/useElementOnScreen'
import useSocketEffects from './hooks/useSocketEffect'
import useIsOnline from '../../hooks/useIsOnline'
import { removeReplyChatMessage } from '../../helpers/chat/chat.helper'
import ChatMessage from '../../components/chat/chatMessage/ChatMessage'
import ChatTitle from '../../components/chat/ChatTitle'
import ChatBox from '../../components/chat/ChatBox'
import ChatFooter from '../../components/chat/ChatFooter'
import Loader from '../../components/loader/loader'
import Message from '../../interfaces/message.interface'
import chatStore from '../../store/chatStore/chat.store'
import operatorStore from '../../store/operatorStore/operator.store'
import { checkToEmptyString, objectValueToArray } from '../../helpers/helper'
import ChatReplyMessage from '../../components/chat/chatReplyMessage/ChatReplyMessage'
import { chatMessagesValidation } from './helpers'

import Send from '../../assets/send.svg'
import {
  styledChatBoxWrapper,
  styledInput,
  styledSendButton,
  styledUploadButton,
  styledSendIcon,
  styledModalBackground,
  styledChatBoxButtonWrapper,
  styledChatBoxButton,
  styledMessageEndRefWrapper,
  styledClientTyping,
  alertStyle,
} from './OperatorChatRoute.styled'

const OperatorChatRoute: React.FC = () => {
  const { replyChatMessage } = chatStore

  const { id } = useParams<{ id: string }>()
  const socket = useSocketEffects(id)
  const location = useLocation()

  const inputRef = useRef<HTMLInputElement>(null)
  const divRefEnd = useRef<HTMLDivElement>(null)

  const [text, setText] = useState('')
  const [isWidgetsModal] = useState(false)
  const [count, setCount] = useState(1)
  const [messageEnd, setMessageEnd] = useState<Message>()

  const isOnline = useIsOnline()

  const uploadFile = useUploadFiles(id, socket, removeReplyChatMessage)

  const chatMessages = objectValueToArray(chatStore.chatMessages)

  useEffect(() => {
    const fetchChatData = async () => {
      await chatStore.fetchChat(id)
      await chatStore.fetchChatHistory(id)
      await operatorStore.fetchAllTemplates()
      await chatStore.markAllMessagesAsSeen(id)
    }

    fetchChatData()
    return () => {
      chatStore.toggleHasMoreMessagesChat(true)
    }
  }, [id])

  useEffect(() => {
    setMessageEnd(_.last(chatMessages))
    return () => setMessageEnd(undefined)
  }, [chatMessages])

  const handleCount = async () => {
    if (chatStore.isMoreChatMessages) {
      setCount((prevState) => prevState + 1)
      const getPartOfMessage = async () => {
        await chatStore.getPartOfChatHistory(id, count)
      }
      await getPartOfMessage()
    }
  }
  const [onScroll, containerRef] = useLazyLoading({
    onIntersection: handleCount,
  })

  const [isVisible] = useElementOnScreen({
    options: { root: null, rootMargin: '0px', threshold: 1.0 },
    divRefEnd,
  })
  useScrollToRef({
    ref: containerRef,
    isVisible,
    location: location.pathname,
    messageEnd,
    dependencies: [messageEnd],
  })

  useEffect(() => {
    if (chatMessages.length > 11) {
      divRefEnd.current?.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, [divRefEnd.current]) // eslint-disable-line react-hooks/exhaustive-deps

  const sendMessage = useCallback(() => {
    if (checkToEmptyString(text)) {
      const validatedText = text.replaceAll('#', '')
      socket.current?.emit('message:operator', {
        message: replyChatMessage
          ? `${validatedText}#${replyChatMessage._id}#${replyChatMessage.body}`
          : validatedText,
        room: id,
      })
    }
    setText('')
    removeReplyChatMessage()
  }, [id, replyChatMessage, socket, text])

  usePressEnter(sendMessage)

  const cancelCurrentWidget = useCallback(() => {
    socket.current?.emit('widget:cancel', {
      message: 'Widget cancelled.',
      room: id,
    })
    removeReplyChatMessage()
  }, [id, socket])

  const coachTyping = useMemo(
    () =>
      _.debounce(
        () => {
          socket.current?.emit('coach:typing', {
            room: id,
          })
        },
        2000,
        {
          leading: true,
          trailing: false,
        }
      ),
    [id, socket]
  )

  const onChangeInput = useCallback(
    (e) => {
      coachTyping()
      setText(e.target.value)
    },
    [coachTyping]
  )

  return (
    <>
      {isWidgetsModal && <div className={styledModalBackground} />}
      <ChatBox>
        <ChatTitle chatId={id} isOperator />
        {chatStore.requestInitialState.loading && <Loader />}
        <div
          className={styledChatBoxWrapper}
          ref={containerRef}
          onScroll={onScroll}>
          {!chatStore.requestInitialState.loading && (
            <>
              {chatMessages.map(
                ({
                  body,
                  type,
                  date,
                  _id,
                  unresponsive,
                  repliedMessageId,
                  repliedMessageBody,
                }: Message) =>
                  chatMessagesValidation(type, body) ? (
                    <div key={nanoid()} className={styledChatBoxButtonWrapper}>
                      <ChatMessage
                        body={body}
                        type={type}
                        date={date}
                        _id={_id}
                        key={_id}
                        unresponsive={unresponsive}
                        repliedMessageId={repliedMessageId}
                        repliedMessageBody={repliedMessageBody}
                      />
                      <button
                        className={styledChatBoxButton}
                        type="button"
                        onClick={cancelCurrentWidget}>
                        Cancel this widget
                      </button>
                    </div>
                  ) : (
                    <ChatMessage
                      body={body}
                      type={type}
                      date={date}
                      _id={_id}
                      key={_id}
                      unresponsive={unresponsive}
                      isOperator
                      repliedMessageId={repliedMessageId}
                      repliedMessageBody={repliedMessageBody}
                    />
                  )
              )}
              <div className={styledMessageEndRefWrapper} ref={divRefEnd} />
            </>
          )}
        </div>

        {chatStore.clientIsTyping && (
          <span className={styledClientTyping}>The client is typing...</span>
        )}

        {!isOnline && (
          <span className={alertStyle}>
            The Internet connection was lost...
          </span>
        )}

        <ChatReplyMessage />

        <ChatFooter>
          <EmojiButton inputRef={inputRef} text={text} setText={setText} />
          <label htmlFor="upload" className={styledUploadButton}>
            <span className="text-base leading-normal">IMG</span>
            <input
              type="file"
              className="hidden"
              id="upload"
              onChange={uploadFile}
              accept="image/png, image/gif, image/jpeg, image/tiff"
            />
          </label>
          <input
            type="text"
            placeholder="Write a message..."
            className={styledInput}
            value={text}
            onChange={onChangeInput}
            ref={inputRef}
          />
          <div>
            <button
              type="submit"
              className={styledSendButton}
              onClick={sendMessage}>
              <img src={Send} alt="Send" className={styledSendIcon} />
            </button>
          </div>
        </ChatFooter>
      </ChatBox>
    </>
  )
}

export default observer(OperatorChatRoute)
