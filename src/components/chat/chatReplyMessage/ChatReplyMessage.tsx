import React, { FC, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import CloseIcon from '../../../assets/close.svg'
import chatStore from '../../../store/chatStore/chat.store'
import { EMessageActions } from '../chatMessage/chatMessageActions/ChatMessageActions.types'
import {
  styledChatReplyMessageWrapper,
  styledChatReplyMessage,
  styledReplyToThisMassage,
  styledCloseButton,
} from './ChatReplyMessage.styled'

const ChatReplyMessage: FC = () => {
  const { currentChatMessageAction } = chatStore
  const { replyChatMessage } = chatStore

  const isReplyMessage = useMemo(
    () => currentChatMessageAction === EMessageActions.REPLY,
    [currentChatMessageAction]
  )

  const replyMessage = useMemo(() => replyChatMessage?.body, [replyChatMessage])

  const removeReplyMessage = useCallback(() => {
    chatStore.setCurrentChatMessageAction(EMessageActions.NO_ACTION)
    chatStore.removeReplyChatMessage()
  }, [])

  return (
    <>
      {isReplyMessage && (
        <div className={styledChatReplyMessageWrapper}>
          <div className={styledChatReplyMessage}>
            <p className={styledReplyToThisMassage}>Reply to this massage:</p>
            <p>{replyMessage}</p>
          </div>
          <button
            className={styledCloseButton}
            type="button"
            onClick={removeReplyMessage}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
      )}
    </>
  )
}

export default observer(ChatReplyMessage)
