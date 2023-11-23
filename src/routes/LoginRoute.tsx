/* eslint-disable no-console */
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

import { APP_ID } from '../config'
import FacebookButton from '../components/auth/FacebookButton'
import EmailButton from '../components/auth/email'
import BoardFooter from '../components/board/BoardFooter'
import Logo from '../assets/logo.svg'
import accountStore from '../store/accountStore/account.store'

const mainScreenStyle = classnames('bg-blue-900', 'mx-auto')

const screenWrapperStyle = classnames('flex', 'flex-col')

const logoStyle = classnames(
  'animate-pulse',
  'flex',
  'flex-1',
  'items-center',
  'justify-center',
  'py-20'
)

const LoginRoute: FC = () => {
  const responseFacebook = async (response: any) => {
    accountStore.login(response.accessToken)
  }

  return (
    <div className={mainScreenStyle}>
      <div className={screenWrapperStyle}>
        <div className={logoStyle}>
          <img src={Logo} alt="Hth" />
        </div>
        <FacebookButton response={responseFacebook} appId={APP_ID} />
        <EmailButton />
      </div>
      <BoardFooter fixed />
    </div>
  )
}

export default observer(LoginRoute)
