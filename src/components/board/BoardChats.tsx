import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { classnames } from 'tailwindcss-classnames'

import chatStore from '../../store/chatStore/chat.store'
import accountStore from '../../store/accountStore/account.store'
import { ChatType } from '../../store/chatStore/chat.store.types'
import Trash from '../../assets/trash.svg'

interface BoardChatProps {
  shortKey: ChatType['shortKey']
  chatId: string
  operatorId: string
  assistantId: string
  dummyName: ChatType['dummyName']
  type: string
  active: boolean
  unreadMessages: number
  toggleDeleteChat: () => void
  removeChat: (clientNumber: string, shortKey: string) => void
}

const chatWrapperStyle = classnames(
  'py-3',
  'border-t',
  'border-gray-300',
  'hover:bg-gray-50',
  'transition'
)
const chatStyle = classnames('flex', 'flex-row', 'items-center')
const clientStyle = classnames('font-medium', 'text-gray-700', 'flex-1')
const trackingStyle = classnames('text-gray-400', 'pl-1', 'pr-3')
const redButtonStyle = classnames(
  'pr-7',
  'font-medium',
  'text-red-400',
  'hover:opacity-80'
)
const blueButtonStyle = classnames(
  'pr-7',
  'font-medium',
  'text-blue-500',
  'hover:opacity-80'
)
const buttonStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border'
)
const linkStyle = classnames('flex', 'items-center', 'block', 'w-full')
const avatarChat = classnames(
  'flex',
  'text-sm',
  'items-center',
  'text-gray-400',
  'border-2',
  'border-gray-400',
  'font-bold',
  'justify-center',
  'h-10',
  'w-10',
  'rounded-full',
  'mr-2',
  'ml-1',
  'relative'
)

const BoardChats: FC<BoardChatProps> = ({
  shortKey,
  chatId,
  type,
  dummyName,
  unreadMessages,
  toggleDeleteChat,
  removeChat,
  active,
  operatorId,
  assistantId,
}) => {
  const handleChatStatus = useCallback(() => {
    chatStore.patchChatStatus(chatId, !active)
  }, [active, chatId])

  if (accountStore.user.type !== type && !accountStore.user.isSuperadmin) {
    return null
  }
  return (
    <>
      <div className={chatWrapperStyle}>
        <div className={chatStyle}>
          <div className={clientStyle}>
            <Link
              to={`operator/chat/${shortKey}`}
              key={chatId}
              className={linkStyle}>
              <div className={avatarChat}>
                {dummyName?.match(/[A-Z]/g)?.join('')}

                {unreadMessages > 0 && (
                  <span className="absolute -top-2 -right-5 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {unreadMessages}
                  </span>
                )}
              </div>

              {!active && <div className={trackingStyle}>Not tracked</div>}
              {!operatorId && type === 'coach' && (
                <div className={trackingStyle}>No coach</div>
              )}
              {!assistantId && type === 'assistant' && (
                <div className={trackingStyle}>No assistant</div>
              )}
              <span className="pl-1">{dummyName}</span>
            </Link>
          </div>
          {accountStore.user.isSuperadmin && (
            <>
              <button
                type="button"
                className={active ? redButtonStyle : blueButtonStyle}
                onClick={handleChatStatus}>
                {active ? 'Stop tracking' : 'Start tracking'}
              </button>
              <button
                className={buttonStyle}
                onClick={() => {
                  toggleDeleteChat()
                  removeChat(dummyName, shortKey)
                }}
                type="button">
                <img src={Trash} alt="Trash" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default observer(BoardChats)
