import React, { MutableRefObject } from 'react'
import { API_URL } from '../../../config'

import {
  avatarImageStyles,
  noAvatarImageStyles,
  photoWrapperStyle,
} from './styles'

interface AvatarBigProps {
  avatar?: string
  defaultAvatar?: string
  id: string
  inputFile: MutableRefObject<HTMLInputElement>
  setSelectedFile
  preview
}

const AvatarBig: React.FC<AvatarBigProps> = ({
  avatar,
  defaultAvatar,
  id,
  inputFile,
  setSelectedFile,
  preview,
}) => {
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }
    setSelectedFile(e)
  }

  return (
    <div className={photoWrapperStyle}>
      {!avatar && preview && <img src={preview} alt="coach" />}
      {avatar && preview && <img src={preview} alt="coach" />}
      {avatar && !preview && (
        <img
          src={`${API_URL}static/${avatar}`}
          alt="coach"
          className={avatarImageStyles}
        />
      )}
      {!avatar && !preview && (
        <div className={noAvatarImageStyles}>{defaultAvatar}</div>
      )}
      <input
        id={id}
        type="file"
        className="hidden"
        onChange={onSelectFile}
        ref={inputFile}
      />
    </div>
  )
}

export default AvatarBig
