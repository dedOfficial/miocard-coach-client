/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react-lite'
import React, { useCallback, useRef, useState } from 'react'
import accountStore from 'store/accountStore/account.store'

import useCloseByClickOutside from '../../../../../hooks/useCloseByClickOutside'

import {
  overlayStyle,
  wrapperStyle,
  btnsWrapperStyle,
  submitBtnStyle,
  cancelBtnStyle,
  inputStyle,
  labelStyle,
  inputWrapperStyle,
  errorStyle,
} from './styles'

interface LoginModalProps {
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>()
  const loginModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: loginModalRef,
    handler: () => onClose(),
  })

  const handleUser = useCallback(
    (value: string) => (e) => setUser({ ...user, [value]: e.target.value }),
    [user]
  )

  const handleSubmit = useCallback(async () => {
    try {
      await accountStore.loginWithEmail(user.email, user.password)
    } catch (err) {
      setError('Wrong login or password')
    }
  }, [user.email, user.password])

  return (
    <>
      <div className={overlayStyle} />
      <div className={wrapperStyle} ref={loginModalRef}>
        <div className={inputWrapperStyle}>
          {error && <div className={errorStyle}>{error}</div>}
          <label className={labelStyle}>Email:</label>
          <input
            type="email"
            className={inputStyle}
            placeholder="Enter email"
            value={user.email}
            onChange={handleUser('email')}
            autoFocus
          />
        </div>

        <div className={inputWrapperStyle}>
          <label className={labelStyle}>Password:</label>
          <input
            type="password"
            className={inputStyle}
            placeholder="Enter password"
            value={user.password}
            onChange={handleUser('password')}
          />
        </div>

        <div className={btnsWrapperStyle}>
          <button
            type="button"
            className={submitBtnStyle}
            onClick={handleSubmit}>
            Submit
          </button>
          <button
            type="button"
            className={cancelBtnStyle}
            onClick={() => onClose()}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(LoginModal)
