/* eslint-disable react/no-unescaped-entities */
import React from 'react'

import CloseIcon from '../../../../../assets/close.svg'

import { wrapperStyle } from './styles'

interface HeaderProps {
  chatName: string
  patientName: string
  toggleWindow: (flag: boolean) => () => void
}

const Header: React.FC<HeaderProps> = ({
  chatName,
  patientName,
  toggleWindow,
}) => {
  return (
    <div className={wrapperStyle}>
      <div className="font-semibold">Client's info:</div>
      <div>
        {chatName} ({patientName || ''})
      </div>
      <button type="button" onClick={toggleWindow(false)}>
        <img src={CloseIcon} alt="Close" />
      </button>
    </div>
  )
}

export default Header
