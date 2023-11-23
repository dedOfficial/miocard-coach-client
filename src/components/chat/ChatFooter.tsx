import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const chatFooterStyle = classnames(
  'p-1',
  'px-3',
  'flex',
  'flex-row',
  'border-t-2',
  'items-center',
  'h-24'
)

const ChatFooter: FC = ({ children }) => {
  return <div className={chatFooterStyle}>{children}</div>
}

export default ChatFooter
