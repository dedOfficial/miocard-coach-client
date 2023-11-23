/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import moment from 'moment'
import { observer } from 'mobx-react-lite'

import { ChatMessageItemProps } from '../ChatMessage.types'
import { IconChevron } from '../../../ui/Icon/Icon'
import ChatMessageActions from '../chatMessageActions/ChatMessageActions'

import {
  styledDate,
  styledIcon,
  styledRepliedMessage,
  styledTextIconWrapper,
} from '../ChatMessage.styled'
import './styles.scss'

const ChatMessageItem: React.FC<ChatMessageItemProps> = observer(
  ({
    styleWrapper,
    styleDate = styledDate,
    body,
    date,
    _id,
    unresponsive,
    repliedMessageBody,
    isUserChat,
  }) => {
    const [isShowingMessageMenu, setIsShowingMessageMenu] = useState(false)

    return (
      <div className={styleWrapper}>
        {repliedMessageBody && (
          <div className={styledRepliedMessage}>
            Replied to: {repliedMessageBody}
          </div>
        )}
        <div className={styledTextIconWrapper}>
          <div className="chat-message">{body}</div>
          {!unresponsive && !isUserChat && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              className={styledIcon}
              onClick={() => {
                setIsShowingMessageMenu(!isShowingMessageMenu)
              }}>
              <IconChevron />
            </div>
          )}
          {isShowingMessageMenu && (
            <ChatMessageActions
              _id={_id}
              setIsShowingMessageMenu={setIsShowingMessageMenu}
            />
          )}
        </div>
        <p className={styleDate}>{moment(date).format('MMMM Do, h:mm a')}</p>
      </div>
    )
  }
)

export default ChatMessageItem
