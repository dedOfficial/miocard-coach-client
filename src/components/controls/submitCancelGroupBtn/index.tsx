import React from 'react'
import { containerButtonBlock, wrapperButtonBlock } from './styles'
import ActionButton from '../action-btn'

interface GroupButtonsProps {
  onSubmit: (e?) => void
  onSubmitLabel: string
  disabled?: boolean
  onCancel: () => void
  onCancelLabel: string
}

const GroupButtons: React.FC<GroupButtonsProps> = ({
  onSubmit,
  onCancel,
  onSubmitLabel,
  onCancelLabel,
  disabled,
}) => {
  return (
    <div className={containerButtonBlock}>
      <div className={wrapperButtonBlock}>
        <ActionButton
          label={onSubmitLabel}
          action={onSubmit}
          disabled={disabled}
        />
        <ActionButton label={onCancelLabel} action={onCancel} white />
      </div>
    </div>
  )
}

export default GroupButtons
