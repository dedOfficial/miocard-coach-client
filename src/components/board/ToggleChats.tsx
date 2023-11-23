import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const toggleWrapperStyle = classnames(
  'flex',
  'items-center',
  'justify-end',
  'mt-4'
)
const checkBoxStyle = classnames(
  'w-16',
  'h-8',
  'rounded-full',
  'flex-shrink-0',
  'p-1',
  'mx-2',
  'duration-300',
  'ease-in-out'
)
const toggleStyle = classnames(
  'bg-white',
  'w-8',
  'h-6',
  'rounded-full',
  'shadow-md',
  'duration-300',
  'ease-in-out'
)
const toggleTextStyle = classnames('text-sm', 'text-gray-900')
interface ToggleChatsProps {
  toggleChat: boolean
  setToggleChat: (data: boolean) => void
}

const ToggleChats: FC<ToggleChatsProps> = ({ toggleChat, setToggleChat }) => {
  return (
    <div className={toggleWrapperStyle}>
      <h2 className={toggleTextStyle}>View all chats</h2>
      <button
        style={
          toggleChat
            ? { backgroundColor: 'lightblue' }
            : { backgroundColor: '#D0D0D0' }
        }
        className={checkBoxStyle}
        type="button"
        onClick={() => {
          if (toggleChat) setToggleChat(false)
          if (!toggleChat) setToggleChat(true)
        }}>
        <div
          style={
            toggleChat
              ? { transform: 'translateX(1.5rem)' }
              : { transform: 'translateX(0)' }
          }
          className={toggleStyle}
        />
      </button>
    </div>
  )
}

export default ToggleChats
