/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'

import chatStore from '../../../../store/chatStore/chat.store'
import {
  ChatMessageActionProps,
  EMessageActions,
} from './ChatMessageActions.types'
import {
  StyledChatMessageAction,
  styledChatMessageActionsWrapper,
} from './ChatMessageActions.styled'

const messageActions = [{ name: EMessageActions.REPLY }]

const ChatMessageActions = ({ setIsShowingMessageMenu, _id }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleChooseAction = useCallback(
    (name) => {
      if (name === EMessageActions.REPLY) {
        chatStore.setCurrentChatMessageAction(EMessageActions.REPLY)
        chatStore.addReplyChatMessage(_id)
      }
      setIsShowingMessageMenu(false)
    },
    [_id, setIsShowingMessageMenu]
  )

  useCloseByClickOutside({
    mainRef: wrapperRef,
    handler: () => setIsShowingMessageMenu(false),
  })

  return (
    <div ref={wrapperRef} className={styledChatMessageActionsWrapper}>
      <ul>
        {messageActions.map(({ name }: ChatMessageActionProps) => (
          <li
            onClick={() => handleChooseAction(name)}
            className={StyledChatMessageAction}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default observer(ChatMessageActions)
