import React, { FC, useState } from 'react'

import LoginModal from './components/login-modal'
import { wrapperStyle, buttonStyle } from './styles'

const EmailButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={wrapperStyle}>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}

      <button
        className={buttonStyle}
        type="button"
        onClick={() => setIsOpen(true)}>
        Login with HTN Coach
      </button>
    </div>
  )
}

export default EmailButton
