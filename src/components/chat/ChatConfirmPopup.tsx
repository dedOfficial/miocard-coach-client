import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

const popupWrapperStyle = classnames(
  'absolute',
  'flex',
  'flex-col',
  'h-screen',
  'w-full',
  'max-w-3xl',
  'z-50',
  'items-center',
  'justify-center'
)
const popupStyle = classnames('p-5', 'bg-white', 'rounded-xl', 'mx-10')

const ChatConfirmPopup: FC = ({ children }) => (
  <div className={popupWrapperStyle}>
    <div className={popupStyle}>{children}</div>
  </div>
)

export default observer(ChatConfirmPopup)
