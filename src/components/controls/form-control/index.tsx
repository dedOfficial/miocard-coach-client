import React from 'react'

import { formControlStyles, labelStyles } from './styles'

interface FormControlProps {
  children?: any
  htmlFor?: string
  label?: string
}

const FormControl: React.ForwardRefRenderFunction<
  HTMLDivElement,
  FormControlProps
> = ({ children, label, htmlFor }, ref) => {
  return (
    <div className={formControlStyles} ref={ref}>
      {label && (
        <label className={labelStyles} htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
    </div>
  )
}

export default React.forwardRef(FormControl)
