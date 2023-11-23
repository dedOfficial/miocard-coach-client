import React, { ForwardRefExoticComponent } from 'react'

import { customSelectStyle } from './customSelect.style'
import CustomSelectItem from './CustomSelectItem'

type CustomSelectProp = {
  ref: React.ForwardedRef<HTMLUListElement>
  isActiveState: boolean
  onEdit?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
}

const CustomSelect: ForwardRefExoticComponent<CustomSelectProp> =
  React.forwardRef<HTMLUListElement, CustomSelectProp>(
    ({ isActiveState, onEdit, onDuplicate, onDelete }, ref) => {
      return (
        <ul
          className={`${
            isActiveState ? 'flex' : 'hidden'
          } ${customSelectStyle}`}
          ref={ref}>
          {onEdit && <CustomSelectItem onClick={onEdit}>Edit</CustomSelectItem>}
          {onDuplicate && (
            <CustomSelectItem onClick={onDuplicate}>Duplicate</CustomSelectItem>
          )}
          {onDelete && (
            <CustomSelectItem onClick={onDelete}>Delete</CustomSelectItem>
          )}
        </ul>
      )
    }
  )

export default CustomSelect
