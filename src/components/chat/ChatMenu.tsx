import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

const chatMenuWrapperStyle = classnames(
  'absolute',
  'top-16',
  'flex',
  'flex-col',
  'w-full',
  'max-w-3xl',
  'z-30',
  'items-end'
)

const ChatMenu: FC = ({ children }) => (
  <div className={chatMenuWrapperStyle}>{children}</div>
)

export default observer(ChatMenu)
