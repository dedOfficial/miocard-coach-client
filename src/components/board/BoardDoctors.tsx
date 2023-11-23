import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'
import { API_URL } from 'config'

import accountStore from '../../store/accountStore/account.store'
import { FileService } from '../../services/api.service'
import { NewDoctorDataType } from '../../routes/boardRoute/boardRoute.types'
import { DeleteDoctorType } from '../../store/doctorStore/doctor.store.types'
import Pen from '../../assets/pencil.svg'
import Trash from '../../assets/trash.svg'

interface BoardDoctorsProps {
  id: string
  name: string
  email: string
  number: string
  avatar?: string
  openModal: (data: NewDoctorDataType) => void
  toggleDeleteDoctor: () => void
  removeDoctor: (
    name: DeleteDoctorType['name'],
    id: DeleteDoctorType['id']
  ) => void
}

const doctorWrapperStyle = classnames(
  'py-3',
  'border-t-2',
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)
const nameStyle = classnames('text-lg', 'font-medium', 'text-blue-500')
const emailStyle = classnames('text-sm', 'text-gray-400')
const buttonEditStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border',
  'mr-1'
)
const buttonRemoveStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border'
)
const noAvatarStyle = classnames(
  'flex',
  'justify-center',
  'items-center',
  'bg-gradient-to-r',
  'to-blue-500',
  'from-green-400',
  'font-bold',
  'text-white',
  'ring-2',
  'ring-white',
  'rounded-full',
  'h-12',
  'w-12'
)
const avatarStyle = classnames(
  'h-full',
  'w-full',
  'object-cover',
  'rounded-full'
)

const { addAvatar } = FileService

const BoardDoctors: FC<BoardDoctorsProps> = ({
  id,
  name,
  email,
  number,
  avatar,
  openModal,
  toggleDeleteDoctor,
  removeDoctor,
}) => {
  const handleEditDoctor = useCallback(() => {
    openModal({ id, name, number, email })
  }, [email, id, name, number, openModal])

  return (
    <div className={doctorWrapperStyle} key={email}>
      <div className="flex flex-row justify-items-center items-center justify-center">
        <label
          htmlFor={id}
          className="hover:opacity-70 h-12 w-12 mr-2 cursor-cell">
          {avatar ? (
            <img
              src={`${API_URL}static/${avatar}`}
              alt=""
              className={avatarStyle}
            />
          ) : (
            <div className={noAvatarStyle}>{name?.charAt(0)}</div>
          )}
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={async (e) => {
              await addAvatar(id, e, 'doctor')
              window.location.reload()
            }}
          />
        </label>
        <div>
          <div className={nameStyle}>{name}</div>
          <div className={emailStyle}>
            {number} ({email})
          </div>
        </div>
      </div>
      {accountStore.user.isSuperadmin && (
        <div>
          <button
            className={buttonEditStyle}
            type="button"
            onClick={handleEditDoctor}>
            <img src={Pen} alt="Pen" />
          </button>
          <button
            className={buttonRemoveStyle}
            type="button"
            onClick={() => {
              toggleDeleteDoctor()
              removeDoctor(name, id)
            }}>
            <img src={Trash} alt="Trash" />
          </button>
        </div>
      )}
    </div>
  )
}

export default observer(BoardDoctors)
