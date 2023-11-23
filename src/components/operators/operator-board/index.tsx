import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import BoardTitleNew from '../../board/board-title-new'
import FormControl from '../../controls/form-control'
import Loader from '../../loader/loader'
import operatorStore from '../../../store/operatorStore/operator.store'
import ActionButton from '../../controls/action-btn'
import AssignedList from './components/assigned-list'
import { OperatorWithAssignedType } from '../../../store/operatorStore/operator.store.types'

const OperatorBoard: React.FC = () => {
  const [currentOperator, setCurrentOperator] =
    useState<OperatorWithAssignedType>({
      _id: '',
      assignedChats: [],
      basicInfo: '',
      email: '',
      name: '',
      avatar: '',
      phoneNumber: '',
      type: '',
    })

  const {
    operatorWithAssign,
    requestInitialState: { loading },
  } = operatorStore

  const { id } = useParams<{ id: string }>()

  const getOperator = useCallback(async () => {
    await operatorStore.fetchOperatorWithAssign(id)
  }, [id])

  useEffect(() => {
    getOperator()
  }, [getOperator])

  useEffect(() => {
    setCurrentOperator({ ...operatorWithAssign })
  }, [operatorWithAssign])

  if (loading) return <Loader />

  return (
    <>
      <BoardTitleNew title={currentOperator.name} back />
      <Link to={`/operator/${id}/assign`}>
        <ActionButton label="Assign chats" action={() => {}} />
      </Link>
      <Link to={`/operator/${id}/dashboard`} className="ml-7">
        <ActionButton label="See dashboard" action={() => {}} white />
      </Link>
      <FormControl label="Email:">{currentOperator.email}</FormControl>
      <FormControl label="Phone:">{currentOperator.phoneNumber}</FormControl>
      <FormControl label="Basic info:">{currentOperator.basicInfo}</FormControl>
      <FormControl label="Assigned chats:">
        <AssignedList list={currentOperator.assignedChats} />
      </FormControl>
    </>
  )
}

export default observer(OperatorBoard)
