/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

import chatStore from '../../../store/chatStore/chat.store'
import operatorStore from '../../../store/operatorStore/operator.store'
import accountStore from '../../../store/accountStore/account.store'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardFooter from '../../../components/board/BoardFooter'
import Loader from '../../../components/loader/loader'
import DeleteModal from '../../../components/modals/delete-modal'
import OperatorsList from '../../../components/operators/operators-list'
import BoardTitleNew from '../../../components/board/board-title-new'
import ActionButton from '../../../components/controls/action-btn'
import useTimeout from '../../../hooks/useTimeout'
import { initialDeleteOperatorData } from './constants'

import { mainWrapperStyle } from '../BoardRoute.styled'

const BoardOperatorsRoute: React.FC = () => {
  const { operators, assistants } = operatorStore

  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [currentTab, setCurrentTab] = useState('coaches')
  const [isError, setIsError] = useState(false)

  const [deleteOperatorData, setDeleteOperatorData] = useState(
    initialDeleteOperatorData
  )

  const { allChats } = chatStore

  useEffect(() => {
    if (accountStore.userToken) {
      accountStore.getUser()
    }
  }, [])

  const getOperators = async () => {
    await operatorStore.fetchOperators()
    await operatorStore.fetchAssistants()
  }

  useEffect(() => {
    if (accountStore.user.id.length) {
      getOperators()
    }
  }, [])

  const runWithDelay = useTimeout(() => setIsError(false), 8000)

  const handleDeleteOperatorByEmail = useCallback(() => {
    if (
      allChats.filter(
        (chat) =>
          chat.operatorId === deleteOperatorData._id ||
          chat.assistantId === deleteOperatorData._id
      ).length > 0
    ) {
      setIsError(true)
      runWithDelay()
    } else if (deleteOperatorData.email) {
      operatorStore.removeOperator(deleteOperatorData.email)
      setIsDeleteModal(false)
      getOperators()
    }
  }, [allChats, deleteOperatorData._id, deleteOperatorData.email, runWithDelay])

  return (
    <>
      {isDeleteModal && (
        <DeleteModal
          name={deleteOperatorData.name}
          type={deleteOperatorData.type}
          isError={isError}
          onClose={() => setIsDeleteModal(false)}
          onDelete={handleDeleteOperatorByEmail}
          isDeleteOperator
        />
      )}

      <div className={mainWrapperStyle}>
        <BoardHeader />
        <BoardTitleNew
          title="Operators"
          addControl={
            <Link to="/operator/new">
              <ActionButton label="Add new operator" />
            </Link>
          }
        />
        <div className="flex justify-evenly mt-10 p-3 bg-gray-200 rounded-lg">
          <button
            type="button"
            className="text-gray-700 font-medium focus:text-blue-700"
            onClick={() => {
              setCurrentTab('coaches')
            }}>
            Coaches
          </button>
          <button
            type="button"
            className="text-gray-700 font-medium focus:text-blue-700"
            onClick={() => {
              setCurrentTab('assistants')
            }}>
            Assistants
          </button>
        </div>
        {operatorStore.requestInitialState.loading && <Loader />}
        {!operatorStore.requestInitialState.loading && (
          <>
            {currentTab === 'coaches' && (
              <OperatorsList
                operators={operators}
                setDeleteModal={setIsDeleteModal}
                setDeleteData={setDeleteOperatorData}
              />
            )}
            {currentTab === 'assistants' && (
              <OperatorsList
                operators={assistants}
                setDeleteModal={setIsDeleteModal}
                setDeleteData={setDeleteOperatorData}
              />
            )}
          </>
        )}
        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardOperatorsRoute)
