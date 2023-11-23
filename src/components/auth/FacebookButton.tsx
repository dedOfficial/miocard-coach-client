import React, { FC } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { classnames } from 'tailwindcss-classnames'

import Facebook from 'assets/facebook.svg'

interface FacebookButtonProps {
  response: (response: any) => Promise<void>
  appId: string | undefined
}

const facebookWrapperStyle = classnames(
  'bg-white',
  'rounded-2xl',
  'rounded-b-none',
  'p-5'
)
const facebookButtonStyle = classnames(
  'transition',
  'cursor-pointer',
  'hover:opacity-80',
  'p-3',
  'bg-blue-500',
  'text-white',
  'rounded-md',
  'w-80',
  'mx-auto',
  'flex',
  'font-medium',
  'items-center',
  'justify-center'
)
const facebookIconStyle = classnames('pr-3')

const FacebookButton: FC<FacebookButtonProps> = ({
  response,
  appId,
}: FacebookButtonProps) => {
  return (
    <FacebookLogin
      appId={appId}
      callback={response}
      autoload={false}
      disableMobileRedirect
      render={(renderProps: any) => (
        <div className={facebookWrapperStyle}>
          <button
            className={facebookButtonStyle}
            type="button"
            onClick={renderProps.onClick}>
            <img src={Facebook} alt="Facebook" className={facebookIconStyle} />
            Login with Facebook
          </button>
        </div>
      )}
    />
  )
}

export default FacebookButton
