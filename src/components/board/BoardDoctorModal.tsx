import React, { FC, useRef, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import InputMask from 'react-input-mask'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'
import Dialog from '../dialog/Dialog'
import doctorStore from '../../store/doctorStore/doctor.store'
import { buttonStyle } from '../../helpers/styles.helper'
import CloseIcon from '../../assets/close.svg'
import { NewDoctorDataType } from '../../routes/boardRoute/boardRoute.types'
import {
  closeStyle,
  inputStyle,
} from '../../routes/boardRoute/BoardRoute.styled'

interface BoardDoctorModalProps {
  isSetDoctorModal: (value: boolean) => void
  isEditDoctor: boolean
  setIsEditDoctor: (value: boolean) => void
  newDoctorData: NewDoctorDataType
  setNewDoctorData: React.Dispatch<React.SetStateAction<NewDoctorDataType>>
}

const defaultDoctorData = {
  name: '',
  email: '',
  number: '',
  id: '',
}

const BoardDoctorModal: FC<BoardDoctorModalProps> = ({
  isSetDoctorModal,
  isEditDoctor,
  setIsEditDoctor,
  newDoctorData,
  setNewDoctorData,
}) => {
  const doctorModalRef = useRef<HTMLDivElement>(null)

  const handleSetNewDoctorData = useCallback(
    (value) => (e) => {
      setNewDoctorData((prev) => ({ ...prev, [value]: e.target.value }))
    },
    [setNewDoctorData]
  )

  const submitNewDoctorData = useCallback(() => {
    const { name, email, number } = newDoctorData

    if (name.length || email.length || number.length) {
      if (!isEditDoctor) {
        doctorStore.createNewDoctor(newDoctorData)
        isSetDoctorModal(false)
      } else {
        doctorStore.editDoctor(newDoctorData)
        isSetDoctorModal(false)
      }
    }
  }, [isEditDoctor, isSetDoctorModal, newDoctorData])

  const closeDoctorModal = useCallback(() => {
    setNewDoctorData(defaultDoctorData)
    isSetDoctorModal(false)
    setIsEditDoctor(false)
  }, [isSetDoctorModal, setIsEditDoctor, setNewDoctorData])

  useCloseByClickOutside({
    mainRef: doctorModalRef,
    handler: () => isSetDoctorModal(false),
  })

  return (
    <Dialog>
      <div ref={doctorModalRef}>
        <div className={closeStyle}>
          <button type="button" onClick={closeDoctorModal}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Doctor's name"
          className={inputStyle}
          onChange={handleSetNewDoctorData('name')}
          value={newDoctorData.name}
        />
        <input
          type="text"
          placeholder="Doctor's email"
          className={inputStyle}
          onChange={handleSetNewDoctorData('email')}
          value={newDoctorData.email}
        />
        <InputMask
          mask="+99999999999"
          type="text"
          placeholder="Doctor's phone number"
          className={inputStyle}
          onChange={handleSetNewDoctorData('number')}
          value={newDoctorData.number}
        />
        <button
          className={buttonStyle}
          onClick={submitNewDoctorData}
          type="button">
          {isEditDoctor ? 'Edit' : 'Add'}
        </button>
      </div>
    </Dialog>
  )
}

export default observer(BoardDoctorModal)
