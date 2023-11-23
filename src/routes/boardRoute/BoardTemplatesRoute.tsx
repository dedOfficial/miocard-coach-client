/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
// TODO: fix import cycling error if '../../components/board/BoardTemplateEditModal'
import BoardTemplateEditModal from 'components/board/BoardTemplateEditModal'
import BoardHeader from '../../components/board/BoardHeader'
import BoardTitle from '../../components/board/BoardTitle'
import BoardFooter from '../../components/board/BoardFooter'
import Loader from '../../components/loader/loader'
import BoardTemplateModal from '../../components/board/BoardTemplateModal'
import BoardTemplate from '../../components/board/BoardTemplate'
import DeleteModal from '../../components/modals/delete-modal'
import operatorStore from '../../store/operatorStore/operator.store'
import accountStore from '../../store/accountStore/account.store'
import {
  DeleteTemplateType,
  OperatorTemplateType,
} from '../../store/operatorStore/operator.store.types'
import {
  mainWrapperStyle,
  modalBackgroundStyle,
  operatorWrapperStyle,
} from './BoardRoute.styled'
import { TemplateDataType } from './boardRoute.types'

export const defaultTemplateData = {
  name: '',
  text: '',
  id: '',
}

const BoardTemplatesRoute: FC = () => {
  const [isTemplateModal, isSetTemplateModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [isDeleteTemplateModal, setIsDeleteTemplateModal] =
    useState<boolean>(false)
  const [deleteTemplateData, setDeleteTemplateData] =
    useState<DeleteTemplateType>({
      templateName: '',
      id: '',
    })

  const [newTemplateData, setNewTemplateData] =
    useState<Omit<TemplateDataType, 'token'>>(defaultTemplateData)

  const getOperatorTemplates = useCallback(async () => {
    await operatorStore.fetchAllTemplates()
  }, [])

  const toggleDeleteModal = useCallback(() => {
    setIsDeleteTemplateModal(!isDeleteTemplateModal)
  }, [isDeleteTemplateModal])

  const handleRemoveOperatorTemplate = useCallback(async () => {
    if (deleteTemplateData.id !== '') {
      await operatorStore.removeTemplate(deleteTemplateData.id)
      setIsDeleteTemplateModal(false)
    }
  }, [deleteTemplateData.id])

  const handleDeleteTemplate = useCallback((templateName, id) => {
    setDeleteTemplateData({
      templateName,
      id,
    })
  }, [])

  const openTemplateModalToEdit = useCallback((data) => {
    setNewTemplateData(data)
    setIsEdit(true)
  }, [])

  useEffect(() => {
    if (accountStore.userToken) {
      accountStore.getUser()
      getOperatorTemplates()
    }
  }, [getOperatorTemplates])

  return (
    <>
      {isTemplateModal && (
        <BoardTemplateModal isSetTemplateModal={isSetTemplateModal} />
      )}
      {isEdit && (
        <BoardTemplateEditModal
          isTemplateEditModal={setIsEdit}
          newTemplateData={newTemplateData}
          setNewTemplateData={setNewTemplateData}
        />
      )}
      {isDeleteTemplateModal && (
        <DeleteModal
          name={deleteTemplateData.templateName}
          onClose={() => setIsDeleteTemplateModal(false)}
          onDelete={handleRemoveOperatorTemplate}
        />
      )}
      {(isTemplateModal || isEdit || isDeleteTemplateModal) && (
        <div className={modalBackgroundStyle} />
      )}

      <div className={mainWrapperStyle}>
        <BoardHeader />
        {operatorStore.requestInitialState.loading && <Loader />}
        {!operatorStore.requestInitialState.loading && (
          <>
            <BoardTitle
              title="SMS templates"
              buttonAction={() => isSetTemplateModal(true)}
            />
            <div className={operatorWrapperStyle}>
              <div>
                {operatorStore.operatorTemplates
                  // eslint-disable-next-line @typescript-eslint/no-shadow
                  .map(({ name, text, _id }: OperatorTemplateType) => (
                    <BoardTemplate
                      id={_id}
                      name={name}
                      text={text}
                      key={_id}
                      openModal={openTemplateModalToEdit}
                      toggleDeleteTemplate={toggleDeleteModal}
                      removeTemplate={handleDeleteTemplate}
                    />
                  ))}
              </div>
            </div>
          </>
        )}

        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardTemplatesRoute)
