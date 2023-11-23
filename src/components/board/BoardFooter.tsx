import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { classnames } from 'tailwindcss-classnames'

import accountStore from '../../store/accountStore/account.store'

const footerStyle = classnames(
  'mt-10',
  'py-3',
  'border-t-2',
  'border-gray-50',
  'text-gray-300',
  'flex',
  'justify-start',
  'sm:justify-end',
  'gap-2',
  'items-start',
  'flex-wrap',
  'sm:flex-nowrap',
  'text-sm',
  'sm:text-base',
  'px-2',
  'sm:px-0'
)

const linkStyle = classnames('transition', 'hover:text-gray-500')

interface BoardFooterProps {
  fixed?: boolean
}

const BoardFooter: FC<BoardFooterProps> = ({ fixed = false }) => {
  const isAuth = accountStore.userToken
  const position = fixed ? 'fixed' : 'static'

  return (
    <footer
      className={
        isAuth
          ? footerStyle
          : `${footerStyle} bottom-0 right-0 w-full ${position}`
      }>
      <span className="animate-pulse">❤️</span> {new Date().getFullYear()}. HTN
      Coach is a project of SensoAI Systems Inc.{' '}
      <div className={fixed ? 'flex gap-1.5 mr-3' : 'flex gap-1.5'}>
        <Link to="/terms" className={linkStyle}>
          Terms
        </Link>
        <Link to="/privacy" className={linkStyle}>
          Privacy
        </Link>
        <Link to="/support" className={linkStyle}>
          Support
        </Link>
      </div>
      {isAuth && (
        <button
          className="border-b border-red-300 text-red-600 cursor-pointer"
          onClick={() => {
            accountStore.removeUserToken()
          }}
          type="button">
          Logout
        </button>
      )}
    </footer>
  )
}

export default BoardFooter
