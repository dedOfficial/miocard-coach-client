import React from 'react'

import { API_URL } from 'config'

import {
  avatarWrapperStyles,
  avatarImageStyles,
  noAvatarImageStyles,
} from './styles'

interface AvatarProps {
  id: string
  avatar?: string
  defaultAvatar: string
  userType: 'operator' | 'doctor'
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({
  id,
  avatar,
  defaultAvatar,
  userType,
  className = '',
}) => {
  const componentClassName = `${avatarWrapperStyles} ${className}`

  return (
    <label htmlFor={id} className={componentClassName}>
      {avatar ? (
        <img
          src={`${API_URL}static/${avatar}`}
          alt={userType}
          className={avatarImageStyles}
        />
      ) : (
        <div className={noAvatarImageStyles}>{defaultAvatar}</div>
      )}
    </label>
  )
}

export default Avatar
