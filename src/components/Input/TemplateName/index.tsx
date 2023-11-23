import React from 'react'

import { inputStyles, listWrapper } from './styles'

interface TemplateNameProps {
  onChange: (e: any) => void
  label: string
  value: string
}

const TemplateName: React.FC<TemplateNameProps> = ({
  onChange,
  label,
  value,
}) => {
  return (
    <div className={listWrapper}>
      <span className="font-medium mb-2">{label}:</span>
      <input
        type="text"
        id="name"
        placeholder="Enter name..."
        className={inputStyles}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default TemplateName
