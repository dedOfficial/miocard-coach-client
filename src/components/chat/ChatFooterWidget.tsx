import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const chatFooterStyle = classnames(
  'p-1',
  'px-3',
  'flex',
  'flex-row',
  'items-center',
  'justify-between'
)

const ChatFooterWidget: FC = ({ children }) => {
  return <div className={chatFooterStyle}>{children}</div>
}

export default ChatFooterWidget
