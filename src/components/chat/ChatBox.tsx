import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const chatWrapperStyle = classnames('h-full', 'max-w-3xl', 'mx-auto')
const chatStyle = classnames('flex', 'flex-col', 'h-full')

const ChatBox: FC = ({ children }) => {
  return (
    <div className="block-wrapper">
      <div className={chatWrapperStyle}>
        <div className={chatStyle}>{children}</div>
      </div>
    </div>
  )
}

export default ChatBox
