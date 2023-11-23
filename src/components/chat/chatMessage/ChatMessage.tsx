/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { API_URL } from 'config'

import ChatMessageItem from './ChatMessageItem'

import { ChatMessageProps } from './ChatMessage.types'
import {
  styledDateOperator,
  styledDate,
  styledDoctorMessage,
  styledOperatorMessageWrapper,
  styledOperatorMessage,
  styledSystemMessage,
  styledUserMessageWrapper,
  styledOperatorMessageImgStyle,
  styledUserChatMessageWrapper,
  styledUserChatOperatorMessageWrapper,
} from './ChatMessage.styled'

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  body,
  date,
  isOperator = false,
  _id,
  unresponsive,
  repliedMessageId,
  repliedMessageBody,
  isUserChat,
}: ChatMessageProps) => {
  if (type === 'image') {
    return (
      <div
        className={
          isUserChat
            ? styledUserChatOperatorMessageWrapper
            : styledOperatorMessageWrapper
        }>
        <div
          className={styledOperatorMessage}
          onClick={() => window.open(`${API_URL}static/${body}`, '_blank')}>
          <img
            className={styledOperatorMessageImgStyle}
            src={`${API_URL}static/${body}`}
            alt={body}
          />
        </div>
        <p className={styledDate}>{moment(date).format('MMMM Do, h:mm a')}</p>
      </div>
    )
  }

  if (type === 'system') {
    return (
      <ChatMessageItem
        body={body}
        date={date}
        styleWrapper={styledSystemMessage}
        _id={_id}
        unresponsive={unresponsive}
        repliedMessageId={repliedMessageId}
        repliedMessageBody={repliedMessageBody}
        isUserChat={isUserChat}
      />
    )
  }

  if (type === 'doctor') {
    return (
      <ChatMessageItem
        body={body}
        date={date}
        styleWrapper={styledDoctorMessage}
        _id={_id}
        unresponsive={unresponsive}
        repliedMessageId={repliedMessageId}
        repliedMessageBody={repliedMessageBody}
        isUserChat={isUserChat}
      />
    )
  }

  if (type === 'user') {
    if (isOperator) {
      return (
        <>
          <ChatMessageItem
            body={body}
            date={date}
            styleWrapper={styledUserMessageWrapper}
            _id={_id}
            repliedMessageId={repliedMessageId}
            repliedMessageBody={repliedMessageBody}
            unresponsive={unresponsive}
            isUserChat={isUserChat}
          />
        </>
      )
    }

    return (
      <ChatMessageItem
        body={body}
        date={date}
        styleWrapper={
          isUserChat ? styledUserChatMessageWrapper : styledUserMessageWrapper
        }
        _id={_id}
        repliedMessageId={repliedMessageId}
        repliedMessageBody={repliedMessageBody}
        unresponsive={unresponsive}
        isUserChat={isUserChat}
      />
    )
  }

  return (
    <ChatMessageItem
      body={body}
      date={date}
      styleWrapper={
        isUserChat
          ? styledUserChatOperatorMessageWrapper
          : styledOperatorMessageWrapper
      }
      styleDate={styledDateOperator}
      _id={_id}
      repliedMessageId={repliedMessageId}
      repliedMessageBody={repliedMessageBody}
      unresponsive={unresponsive}
      isUserChat={isUserChat}
    />
  )
}

export default observer(ChatMessage)
