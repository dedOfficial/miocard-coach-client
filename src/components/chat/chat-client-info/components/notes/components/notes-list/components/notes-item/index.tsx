/* eslint-disable no-underscore-dangle */
import React from 'react'
import { observer } from 'mobx-react-lite'

import { NoteType } from 'store/notes-store/notes.store.types'
import Avatar from './components/avatar'

import { itemWrapperStyle, itemNameStyle, messageStyle } from './styles'

interface NotesItemProps {
  item: NoteType
  name: string | null
  avatar: string | null | undefined
}

const NotesItem: React.FC<NotesItemProps> = ({ item, name, avatar }) => {
  const role = item.type === 'coach' ? 'Coach' : 'Health assitant'

  return (
    <div className={itemWrapperStyle}>
      <div className="flex">
        <div>
          <Avatar
            id={item._id}
            defaultAvatar={name?.charAt(0) || ''}
            userType={item.type}
            avatar={avatar}
          />
        </div>
        <div className={itemNameStyle}>
          {role} {name}
        </div>
      </div>
      <div className={messageStyle}>{item.message}</div>
    </div>
  )
}

export default observer(NotesItem)
