/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import ReturnList from '../../components/patient-return/return-list'
import Loader from '../../components/loader/loader'
import accountStore from '../../store/accountStore/account.store'
import returnStore from '../../store/returnStore/return.store'
import operatorStore from '../../store/operatorStore/operator.store'
import BoardTitleNew from '../../components/board/board-title-new'
import NoAssignedChats from '../../components/no-assigned-chats'

import { mainWrapperStyle } from './BoardRoute.styled'

const BoardReturnChatsRoute: FC = () => {
  const {
    returnChats: { chats },
  } = returnStore

  const { loading } = returnStore.requestInitialState

  const { operatorId } = useParams<{ operatorId: string }>()

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/operator/chat/'

  useEffect(() => {
    if (isUser) {
      returnStore.fetchReturnedCoachChats(operatorId)
    }
  }, [operatorId, isUser])

  const operatorName =
    operatorStore.operators.find((operator) => operator._id === operatorId)
      ?.name ||
    operatorStore.assistants.find((assistant) => assistant._id === operatorId)
      ?.name ||
    ''

  if (loading) return <Loader />

  return (
    <section className={mainWrapperStyle}>
      <BoardHeader />

      <BoardTitleNew title={`Patient return: ${operatorName}`} back />

      {chats.length > 0 ? (
        <ReturnList allCoaches={chats} routeUrl={routeUrl} />
      ) : (
        <NoAssignedChats />
      )}

      <BoardFooter />
    </section>
  )
}

export default observer(BoardReturnChatsRoute)
