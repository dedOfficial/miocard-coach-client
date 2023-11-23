import React from 'react'
import { itemStyle, labelStyle, inputStyle } from '../../styles'

interface InputProps {
  type: string
  label: string
  placeholder?: string
  value?: any
  defaultValue?: any
  disabled?: boolean
  onChange?: (e: any) => void
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  placeholder,
  value,
  defaultValue,
  disabled,
  onChange,
}) => {
  return (
    <div className={itemStyle}>
      <div className={labelStyle}>{label}</div>
      <input
        type={type}
        className={inputStyle}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
