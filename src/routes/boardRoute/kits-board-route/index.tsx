/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import BoardDatakitDuplicate from '../../../components/board/BoardDatakitDuplicate'
import BoardDatakits from '../../../components/board/BoardDatakits'
import BoardFooter from '../../../components/board/BoardFooter'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardTitleNew from '../../../components/board/board-title-new'
import DeleteModal from '../../../components/modals/delete-modal'
import AlertModal from '../../../components/modals/alert-modal'
import Loader from '../../../components/loader/loader'
import ActionButton from '../../../components/controls/action-btn'
import accountStore from '../../../store/accountStore/account.store'
import datakitStore from '../../../store/datakitStore/datakit.store'
import { generateCopyName } from '../../../helpers/data-kit/data-kit.helper'
import { newKitDefaultState, defaultDeleteKitState } from './constants'

import { mainWrapperStyle, modalBackgroundStyle } from '../BoardRoute.styled'
import { listWrapper } from '../../../components/datakit/styles'

const BoardDatakitsRoute: React.FC = () => {
  const {
    requestInitialState: { loading },
    dataKits,
  } = datakitStore

  const [newDatakit, setNewDatakit] = useState(newKitDefaultState)
  const [deleteDataKit, setDeleteDataKit] = useState(defaultDeleteKitState)
  const [isDeleteDatakitModal, setIsDeleteDatakitModal] = useState(false)
  const [isDuplicateDatakitModal, setIsDuplicateDatakitModal] = useState(false)
  const [isDeleteAlertModal, setIsDeleteAlertModal] = useState(false)

  const openDeleteModal = () => setIsDeleteDatakitModal(true)
  const closeDeleteModal = () => setIsDeleteDatakitModal(false)
  const openDuplicateModal = () => setIsDuplicateDatakitModal(true)
  const closeDuplicateModal = () => setIsDuplicateDatakitModal(false)
  const openAlertModal = () => setIsDeleteAlertModal(true)
  const closeAlertModal = () => setIsDeleteAlertModal(false)

  useEffect(() => {
    if (accountStore.user.id.length) {
      const getDataKits = async () => {
        await datakitStore.fetchAllDataKits()
      }
      getDataKits()
    }
    datakitStore.resetCurrentDataKit()
  }, [])

  const onClickDelete =
    ({ name, id }) =>
    () => {
      const isHasAssignedChats = !!datakitStore.dataKits.find(
        (kit) => kit._id === id
      )?.chats.length

      if (isHasAssignedChats) {
        openAlertModal()
      } else {
        setDeleteDataKit({ name, id })
        openDeleteModal()
      }
    }

  const onClickDuplicate =
    ({ name, checkins }) =>
    () => {
      setNewDatakit({
        name,
        checkins,
      })
      openDuplicateModal()
    }

  const duplicateDataKitHandler = useCallback(() => {
    datakitStore.createNewDataKit(newDatakit)
    closeDuplicateModal()
  }, [newDatakit])

  const deleteDataKitHandler = useCallback(() => {
    if (deleteDataKit.id) {
      datakitStore.removeDataKit(deleteDataKit.id)
      closeDeleteModal()
    }
  }, [deleteDataKit.id])

  const handleDuplicateInput = useCallback(
    (value: string) => {
      setNewDatakit({
        ...newDatakit,
        name: value,
      })
    },
    [newDatakit]
  )

  return (
    <>
      {isDeleteDatakitModal && (
        <DeleteModal
          name={deleteDataKit.name}
          onClose={closeDeleteModal}
          onDelete={deleteDataKitHandler}
        />
      )}

      {isDeleteAlertModal && <AlertModal onClose={closeAlertModal} />}

      {isDuplicateDatakitModal && (
        <>
          <BoardDatakitDuplicate
            onClose={closeDuplicateModal}
            onSave={duplicateDataKitHandler}
            newDatakitNameState={newDatakit.name}
            onInputChange={handleDuplicateInput}
          />
          <div className={modalBackgroundStyle} />
        </>
      )}

      <div className={mainWrapperStyle}>
        <BoardHeader />

        {loading ? (
          <Loader />
        ) : (
          <>
            <BoardTitleNew
              title="Data collection kits"
              addControl={
                <Link to="/new-data-kit">
                  <ActionButton label="Add kit" />
                </Link>
              }
            />

            <div className={listWrapper}>
              {!dataKits.length ? (
                <span className="text-gray-500">
                  No data collection kits yet.
                </span>
              ) : (
                dataKits.map(({ name, fillingSuccess, _id, checkins }) => (
                  <BoardDatakits
                    name={name}
                    dataKitId={_id}
                    fillingRating={fillingSuccess}
                    onDelete={onClickDelete({ name, id: _id })}
                    checkins={checkins}
                    onDuplicate={onClickDuplicate({
                      name: generateCopyName(name),
                      checkins,
                    })}
                    key={_id}
                  />
                ))
              )}
            </div>
          </>
        )}

        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardDatakitsRoute)
