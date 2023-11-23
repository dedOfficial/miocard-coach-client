import React, { FC } from 'react'

import Avatar from 'components/avatar/AvatarSmall'
import { emailStyle, nameStyle, operatorInfoWrapperStyles } from './styles'

interface OperatorInfoProps {
  id: string
  name: string
  type: string
  email: string
  avatar?: string
}

const OperatorInfo: FC<OperatorInfoProps> = ({
  id,
  name,
  email,
  type,
  avatar,
}) => {
  return (
    <div className={operatorInfoWrapperStyles}>
      <Avatar
        id={id}
        avatar={avatar}
        defaultAvatar={name.charAt(0)}
        userType="operator"
      />
      <div>
        <div className={nameStyle}>
          {name} ({type})
        </div>
        <div className={emailStyle}>{email}</div>
      </div>
    </div>
  )
}

export default OperatorInfo
