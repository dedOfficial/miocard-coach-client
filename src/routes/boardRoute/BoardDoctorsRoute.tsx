/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardTitle from '../../components/board/BoardTitle'
import BoardFooter from '../../components/board/BoardFooter'
import BoardDoctorModal from '../../components/board/BoardDoctorModal'
import Loader from '../../components/loader/loader'
import doctorStore from '../../store/doctorStore/doctor.store'
import accountStore from '../../store/accountStore/account.store'
import {
  DeleteDoctorType,
  DoctorType,
} from '../../store/doctorStore/doctor.store.types'
import BoardDoctors from '../../components/board/BoardDoctors'
import DeleteModal from '../../components/modals/delete-modal'
import { NewDoctorDataType } from './boardRoute.types'
import {
  mainWrapperStyle,
  modalBackgroundStyle,
  doctorWrapperStyle,
} from './BoardRoute.styled'

const defaultDoctorData = {
  name: '',
  email: '',
  number: '',
  id: '',
}

const BoardDoctorsRoute: FC = () => {
  const [isDoctorModal, isSetDoctorModal] = useState<boolean>(false)
  const [isEditDoctor, setIsEditDoctor] = useState<boolean>(false)
  const [isDeleteDoctorModal, isSetDeleteDoctorModal] = useState<boolean>(false)
  const [deleteDoctorData, setDeleteDoctorData] = useState<DeleteDoctorType>({
    id: '',
    name: '',
  })
  const [newDoctorData, setNewDoctorData] =
    useState<NewDoctorDataType>(defaultDoctorData)
  const isUser = !!accountStore.user.id.length

  const getDoctors = useCallback(async () => {
    await doctorStore.fetchDoctors()
  }, [])

  const openDoctorModalToEdit = useCallback((data) => {
    setNewDoctorData(data)
    isSetDoctorModal(true)
    setIsEditDoctor(true)
  }, [])

  const handleDeleteDoctor = useCallback((name, id) => {
    setDeleteDoctorData({
      id,
      name,
    })
  }, [])

  const handeDeleteDoctorById = useCallback(() => {
    if (deleteDoctorData.id !== '') {
      doctorStore.removeDoctor(deleteDoctorData.id)
      isSetDeleteDoctorModal(false)
    }
  }, [deleteDoctorData.id])

  const toggleDeleteModal = useCallback(() => {
    isSetDeleteDoctorModal(!isDeleteDoctorModal)
  }, [isDeleteDoctorModal])

  useEffect(() => {
    if (accountStore.userToken) {
      accountStore.getUser()
    }
  }, [])

  useEffect(() => {
    if (isUser) {
      getDoctors()
    }
  }, [getDoctors, isUser])

  return (
    <>
      {isDoctorModal && (
        <BoardDoctorModal
          isSetDoctorModal={isSetDoctorModal}
          isEditDoctor={isEditDoctor}
          setIsEditDoctor={setIsEditDoctor}
          newDoctorData={newDoctorData}
          setNewDoctorData={setNewDoctorData}
        />
      )}
      {isDeleteDoctorModal && (
        <DeleteModal
          name={deleteDoctorData.name}
          onClose={() => isSetDeleteDoctorModal(false)}
          onDelete={handeDeleteDoctorById}
        />
      )}

      {(isDoctorModal || isDeleteDoctorModal) && (
        <div className={modalBackgroundStyle} />
      )}

      <div className={mainWrapperStyle}>
        <BoardHeader />
        {doctorStore.requestInitialState.loading && <Loader />}
        {!doctorStore.requestInitialState.loading && (
          <>
            <BoardTitle
              title="Doctors"
              buttonAction={() => isSetDoctorModal(true)}
            />
            <div className={doctorWrapperStyle}>
              {doctorStore.doctors.map(
                ({ _id, email, name, number, avatar }: DoctorType) => (
                  <BoardDoctors
                    email={email}
                    name={name}
                    id={_id}
                    number={number}
                    key={email}
                    avatar={avatar}
                    openModal={openDoctorModalToEdit}
                    toggleDeleteDoctor={toggleDeleteModal}
                    removeDoctor={handleDeleteDoctor}
                  />
                )
              )}
            </div>
          </>
        )}
        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardDoctorsRoute)
