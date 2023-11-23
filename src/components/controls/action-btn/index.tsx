import React from 'react'

import { actionBtnStyles, buttonBlueStyle, buttonWhiteStyle } from './styles'

interface ActionButtonProps {
  label?: string
  children?: any
  action?: React.MouseEventHandler<HTMLButtonElement>
  white?: boolean
  disabled?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  action,
  label,
  white,
  disabled = false,
}) => {
  const componentClassName = `${
    white ? buttonWhiteStyle : buttonBlueStyle
  } ${actionBtnStyles} ${disabled ? 'cursor-not-allowed' : ''}`

  return (
    <button
      className={componentClassName}
      type="button"
      onClick={action}
      disabled={disabled}>
      {children || label}
    </button>
  )
}

export default ActionButton
