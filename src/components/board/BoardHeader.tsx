import React, { FC, useState } from 'react'
import { classnames } from 'tailwindcss-classnames'
import { Link } from 'react-router-dom'
import { API_URL } from 'config'

import Bell from '../../assets/bell.svg'
import Logo from '../../assets/logo.svg'
import Burger from '../../assets/burger.svg'
import CloseBurger from '../../assets/closeburger.svg'
import operatorStore from '../../store/operatorStore/operator.store'
import accountStore from '../../store/accountStore/account.store'

const headerStyle = classnames(
  'py-3',
  'px-5',
  'bg-blue-900',
  'mb-0',
  'shadow-md',
  'rounded-none',
  'flex',
  'align-middle',
  'justify-between',
  'transition-all',
  'ease-out',
  'duration-500'
)

const headerIsOpenStyle = classnames(
  'py-3',
  'px-5',
  'bg-blue-900',
  'mb-0',
  'shadow-md',
  'flex',
  'align-middle',
  'justify-between',
  'transition-all',
  'ease-in',
  'duration-1000',
  'rounded-xl',
  'rounded-t-none'
)

const burgerStyle = classnames(
  'flex',
  'h-0',
  'w-0',
  'mb-10',
  'transition-all',
  'ease-out',
  'duration-700',
  'flex-col',
  'text-center',
  'bg-blue-900',
  'text-2xl',
  'text-white',
  'rounded-xl',
  'overflow-hidden',
  'rounded-t-none',
  'shadow-md',
  'pointer-events-none'
)

const burgerIsOpenStyle = classnames(
  'flex',
  'flex-col',
  'h-96',
  'transition-all',
  'ease-out',
  'duration-700',
  'text-center',
  'py-6',
  'mt-0',
  'mb-10',
  'bg-blue-900',
  'text-2xl',
  'text-white',
  'rounded-xl',
  'rounded-t-none',
  'shadow-md'
)

const burgerTopLinkStyle = classnames(
  'mb-2.5',
  'text-white',
  'text-opacity-80',
  'hover:text-opacity-100'
)

const burgerLinkStyle = classnames(
  'my-2.5',
  'text-white',
  'text-opacity-80',
  'hover:text-opacity-100'
)

const burgerIconStyle = classnames('opacity-80', 'hover:opacity-100')

const burgerCloseIconStyle = classnames(
  'opacity-80',
  'hover:opacity-100',
  'w-8'
)

const bellStyle = classnames('mr-5', 'opacity-80', 'hover:opacity-100')

const bellWrapStyle = classnames('relative')

const notificationsStyle = classnames(
  'absolute',
  'bottom-0',
  'right-2',
  'w-8',
  'h-8',
  'rounded-full',
  'bg-red-600',
  'opacity-100',
  'flex',
  'items-center',
  'justify-center',
  'text-white'
)

const BoardHeader: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className={isOpen ? headerStyle : headerIsOpenStyle}>
        <Link to="/">
          <img src={Logo} alt="Logo" width="80" />
        </Link>
        <div className="flex flex-row items-center">
          <Link className={bellWrapStyle} to="/tasks">
            <img className={bellStyle} width="40" src={Bell} alt="Bell" />
            <div
              className={
                operatorStore.operatorTasks.filter(
                  (task) => task.operatorId === accountStore.user.id
                ).length > 0
                  ? notificationsStyle
                  : ''
              }>
              {operatorStore.operatorTasks.filter(
                (task) => task.operatorId === accountStore.user.id
              ).length > 0
                ? operatorStore.operatorTasks.filter(
                    (task) => task.operatorId === accountStore.user.id
                  ).length
                : ''}
            </div>
          </Link>
          <button type="button" className="block" onClick={handleClick}>
            {isOpen ? (
              <img
                src={CloseBurger}
                alt="Close"
                width="27"
                className={burgerCloseIconStyle}
              />
            ) : (
              <img
                src={Burger}
                alt="Menu"
                width="40"
                className={burgerIconStyle}
              />
            )}
          </button>
        </div>
      </div>

      <div className={isOpen ? burgerIsOpenStyle : burgerStyle}>
        <Link className={burgerTopLinkStyle} to="/">
          Chats
        </Link>
        <Link className={burgerLinkStyle} to="/tasks">
          Tasks
        </Link>
        {accountStore.user.isSuperadmin && (
          <>
            <Link className={burgerLinkStyle} to="/templates">
              Templates
            </Link>
            <Link className={burgerLinkStyle} to="/operators">
              Operators
            </Link>
            <Link className={burgerLinkStyle} to="/doctors">
              Doctors
            </Link>
            <Link className={burgerLinkStyle} to="/tracked-parameters">
              Tracked parameters
            </Link>
            <a className={burgerLinkStyle} href={`${API_URL}v2/export`}>
              Export all data
            </a>
          </>
        )}
      </div>
    </>
  )
}

export default BoardHeader
