import React from 'react'
import { observer } from 'mobx-react-lite'

import { API_URL } from 'config'

import {
  avatarWrapperStyle,
  noAvatarImageStyle,
  avatarImageStyle,
} from './styles'

interface AvatarProps {
  id: string
  avatar?: string | null | undefined
  defaultAvatar: string
  userType: string
}

const Avatar: React.FC<AvatarProps> = ({
  id,
  avatar,
  defaultAvatar,
  userType,
}) => {
  return (
    <label htmlFor={id} className={avatarWrapperStyle}>
      {avatar ? (
        <img
          src={`${API_URL}static/${avatar}`}
          alt={userType}
          className={avatarImageStyle}
        />
      ) : (
        <div className={noAvatarImageStyle}>{defaultAvatar}</div>
      )}
    </label>
  )
}

export default observer(Avatar)
