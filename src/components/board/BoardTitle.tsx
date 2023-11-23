import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

import accountStore from '../../store/accountStore/account.store'

interface BoardTitleProps {
  title: string
  buttonAction?: () => void
}

const titleWrapperStyle = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center',
  'font-medium',
  'mt-3'
)
const titleStyle = classnames('text-xl', 'text-blue-900')
const buttonStyle = classnames(
  'py-2',
  'px-4',
  'bg-blue-500',
  'text-white',
  'rounded-xl',
  'hover:opacity-80',
  'transition',
  'font-medium'
)

const BoardTitle: FC<BoardTitleProps> = ({ title, buttonAction }) => {
  const btn = () => {
    if (
      accountStore.user.isSuperadmin ||
      title === 'My chats' ||
      title === 'Chats'
    ) {
      return (
        <button className={buttonStyle} onClick={buttonAction} type="button">
          + Add
        </button>
      )
    }
    return null
  }

  return (
    <div className={titleWrapperStyle}>
      <div className={titleStyle}>{title}</div>
      {!!buttonAction && btn()}
    </div>
  )
}

export default BoardTitle
