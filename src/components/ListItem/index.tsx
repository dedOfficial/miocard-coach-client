import React, { FC } from 'react'
import { classnames } from '../../classnames/tailwind'

interface ListItemProps {
  children?: any
}

const listItemStyle = classnames(
  'mt-4',
  'bg-gray-100',
  'rounded-md',
  'p-6',
  'leading-4',
  'font-medium',
  'text-blue-600'
)

const ListItem: FC<ListItemProps> = ({ children }) => {
  return <div className={listItemStyle}>{children}</div>
}

export default ListItem
