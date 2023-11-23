import React from 'react'

import CloseIcon from '../../../../../assets/close.svg'

import { wrapperStyle } from './styles'

interface HeaderProps {
  chatName: string
  toggleWindow: (flag: boolean) => () => void
}

const Header: React.FC<HeaderProps> = ({ chatName, toggleWindow }) => {
  return (
    <div className={wrapperStyle}>
      <div className="font-semibold">Client dashboard:</div>
      <div>{chatName}</div>
      <button type="button" onClick={toggleWindow(false)}>
        <img src={CloseIcon} alt="Close" />
      </button>
    </div>
  )
}

export default Header
