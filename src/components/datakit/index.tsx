/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from 'store/accountStore/account.store'
import dataKitStore from '../../store/datakitStore/datakit.store'
import Dropdown from '../../assets/dropdownfill.svg'
import CustomSelect from '../customSelect/CustomSelect'
import BoardDatakitDuplicate from '../board/BoardDatakitDuplicate'
import DeleteModal from '../modals/delete-modal'
import AlertModal from '../modals/alert-modal'
import ListItem from '../ListItem'
import ActionButton from '../controls/action-btn'
import Loader from '../loader/loader'
import useCloseByClickOutside from '../../hooks/useCloseByClickOutside'
import { generateCopyName } from '../../helpers/data-kit/data-kit.helper'
import {
  KitChatType,
  KitCheckinType,
} from '../../store/datakitStore/datakit.store.types'
import { deleteKitDefaultState, newKitDefaultState } from './constants'

import { modalBackgroundStyle } from '../../routes/boardRoute/BoardRoute.styled'
import { listWrapper } from './styles'

const DataKit: React.FC = () => {
  const { currentDataKit } = dataKitStore

  const navigate = useHistory()
  const { id } = useParams<{ id: string }>()

  const [newDataKit, setNewDataKit] = useState(newKitDefaultState)
  const [deleteDataKit, setDeleteDataKit] = useState(deleteKitDefaultState)
  const [isMoreActionShow, setIsMoreActionShow] = useState(false)
  const [isDeleteDataKitModal, setIsDeleteDataKitModal] = useState(false)
  const [isDeleteAlertModal, setIsDeleteAlertModal] = useState(false)
  const [isDuplicateDataKitModal, setIsDuplicateDataKitModal] = useState(false)

  const openDeleteModal = () => setIsDeleteDataKitModal(true)
  const openDuplicateModal = () => setIsDuplicateDataKitModal(true)
  const closeDuplicateModal = () => setIsDuplicateDataKitModal(false)
  const closeDeleteModal = () => setIsDeleteDataKitModal(false)
  const openAlertModal = () => setIsDeleteAlertModal(true)
  const closeAlertModal = () => setIsDeleteAlertModal(false)
  const toggleShowMoreAction = () => setIsMoreActionShow((prev) => !prev)

  const moreActionRef = useRef<HTMLUListElement>(null)
  const btnMoreActionRef = useRef<HTMLButtonElement>(null)

  useCloseByClickOutside({
    mainRef: moreActionRef,
    handler: () => setIsMoreActionShow(false),
    dependentRefs: [btnMoreActionRef],
  })

  useEffect(() => {
    if (accountStore.userToken) {
      dataKitStore.fetchDataKitById(id)
    }
  }, [id])

  const duplicateDataKitHandler = useCallback(() => {
    dataKitStore.createNewDataKit(newDataKit)
    closeDuplicateModal()
  }, [newDataKit])

  const deleteDataKitHandler = useCallback(() => {
    if (deleteDataKit.id) {
      dataKitStore.removeDataKit(deleteDataKit.id)
      closeDeleteModal()
      navigate.push('/data-kits')
    }
  }, [deleteDataKit.id, navigate])

  const handleDuplicateInput = (value: string) => {
    setNewDataKit({
      ...newDataKit,
      name: value,
    })
  }

  const onEdit = () => {
    const { _id, name, checkins } = dataKitStore.currentDataKit
    dataKitStore.setEditedDataKit(_id, name, checkins)
    navigate.push(`/data-kit/${_id}/edit`)
  }

  const onDuplicate = () => {
    toggleShowMoreAction()
    const { name, checkins } = currentDataKit
    setNewDataKit({
      name: generateCopyName(name),
      checkins,
    })
    openDuplicateModal()
  }

  const isHasAssignedChats = !!currentDataKit.chats.length

  const onDelete = () => {
    toggleShowMoreAction()
    if (isHasAssignedChats) {
      openAlertModal()
    } else {
      setDeleteDataKit({
        name: currentDataKit.name,
        id: currentDataKit._id,
      })
      openDeleteModal()
    }
  }

  return (
    <>
      {isDeleteDataKitModal && !isHasAssignedChats && (
        <DeleteModal
          name={deleteDataKit.name}
          onClose={closeDeleteModal}
          onDelete={deleteDataKitHandler}
        />
      )}

      {isDeleteAlertModal && isHasAssignedChats && (
        <AlertModal onClose={closeAlertModal} />
      )}

      {isDuplicateDataKitModal && (
        <>
          <BoardDatakitDuplicate
            onClose={closeDuplicateModal}
            onSave={duplicateDataKitHandler}
            newDatakitNameState={newDataKit.name}
            onInputChange={handleDuplicateInput}
          />
          <div className={modalBackgroundStyle} />
        </>
      )}

      <>
        <div className="flex flex-row flex-wrap justify-start items-center my-3 gap-4">
          <Link to={`/data-kit/${id}/assign`}>
            <ActionButton label="Assign" />
          </Link>
          <ActionButton white action={onEdit} label="Edit" />
          <div className="relative">
            <button
              ref={btnMoreActionRef}
              className="flex flex-1 flex-row items-center my-3"
              onClick={toggleShowMoreAction}
              type="button">
              <span className="text-xl font-semibold text-blue-900 mr-2">
                More actions
              </span>
              <img src={Dropdown} alt="dropdown" width="20" />
            </button>
            {isMoreActionShow && (
              <CustomSelect
                ref={moreActionRef}
                isActiveState={isMoreActionShow}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
              />
            )}
          </div>
        </div>

        {dataKitStore.requestInitialState.loading && <Loader />}
        {!dataKitStore.requestInitialState.loading && (
          <>
            <section className="my-12">
              <span className="text-xl text-blue-900">Content</span>
              <div className="flex flex-row flex-wrap mt-6">
                {currentDataKit.checkins.map((checkIn: KitCheckinType) => (
                  <div
                    key={checkIn.name}
                    className="flex flex-auto flex-col gap-4">
                    <span className="text-lg font-medium">
                      {checkIn.name} check in:
                    </span>
                    {checkIn.options.map((option: string) => (
                      <span key={option}>{option}</span>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {isHasAssignedChats && (
              <section className="my-8">
                <span className="text-xl text-blue-900">
                  Assigned to chats:
                </span>
                <div className={listWrapper}>
                  {currentDataKit.chats.map((chat: KitChatType) => (
                    <ListItem key={chat.id}>
                      <div
                        key={chat.id}
                        className="flex flex-auto flex-row justify-between items-center">
                        <span>{chat.name}</span>
                        <div className="w-1/3 text-right">
                          <span className="text-gray-400">
                            Filling success (%):{' '}
                          </span>
                          <span className="font-semibold">
                            {chat.fillingSuccess}
                          </span>
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </>
    </>
  )
}

export default observer(DataKit)
