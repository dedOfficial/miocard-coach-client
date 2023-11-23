import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '../../../../../../ListItem'

import { assignedItemStyles, assignTitleStyles } from './styles'

interface AssignedItemProps {
  chatName: string
  href?: string
}

const AssignedItem: React.FC<AssignedItemProps> = ({ chatName, href }) => {
  const withLink = (c: JSX.Element | React.Component, to: string) => (
    <Link to={to}>{c}</Link>
  )

  const title = <h5 className={assignTitleStyles}>{chatName}</h5>

  return (
    <ListItem>
      <li className={assignedItemStyles}>
        {href ? withLink(title, href) : title}
      </li>
    </ListItem>
  )
}

export default AssignedItem
