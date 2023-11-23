import React, { FC } from 'react'

import {
  customSelectItemBtnStyle,
  customSelectItemStyle,
} from './customSelect.style'

type CustomSelectItemProp = {
  onClick: () => void
}

type CustomActionBtnProp = {
  action: () => void
  className?: string
}

export const CustomActionButton: FC<CustomActionBtnProp> = ({
  action,
  children,
  className,
}) => {
  return (
    <button type="button" className={className} onClick={action}>
      {children}
    </button>
  )
}

const CustomSelectItem: FC<CustomSelectItemProp> = ({ onClick, children }) => {
  return (
    <li className={customSelectItemStyle}>
      <CustomActionButton action={onClick} className={customSelectItemBtnStyle}>
        {children}
      </CustomActionButton>
    </li>
  )
}

export default CustomSelectItem
