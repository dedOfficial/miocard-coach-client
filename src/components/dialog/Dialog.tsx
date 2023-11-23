import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const dialogWrapperStyle = classnames(
  'absolute',
  'inset-0',
  'flex',
  'h-screen',
  'w-full',
  'z-50',
  'items-center',
  'justify-center'
)
const dialogStyle = classnames('p-5', 'bg-white', 'rounded-xl', 'mx-10')

const Dialog: FC = ({ children }) => {
  return (
    <div className={dialogWrapperStyle}>
      <div className={dialogStyle}>{children}</div>
    </div>
  )
}

export default Dialog
