/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from '../../../store/accountStore/account.store'
import operatorStore from '../../../store/operatorStore/operator.store'
import dataCollectionStore from '../../../store/data-collection-store/dataCollection.store'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardFooter from '../../../components/board/BoardFooter'
import BoardTitleNew from '../../../components/board/board-title-new'
import Loader from '../../../components/loader/loader'
import NoAssignedChats from '../../../components/no-assigned-chats'
import CollectionList from '../../../components/data-collection/components/collection-list'

import { mainWrapperStyle } from '../../boardRoute/BoardRoute.styled'

const CheckinProblemsByCoachRoute: React.FC = () => {
  const { chats } = dataCollectionStore.collectionCoachChats

  const { operatorId } = useParams<{ operatorId: string }>()

  const { loading } = dataCollectionStore.requestInitialState

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/operator/chat/'

  useEffect(() => {
    if (isUser) {
      dataCollectionStore.fetchCollectionCoachChats(operatorId)
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
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title={`Data collection: ${operatorName}`} back />

      {chats.length > 0 ? (
        <CollectionList coaches={chats} routeUrl={routeUrl} />
      ) : (
        <NoAssignedChats />
      )}

      <BoardFooter />
    </div>
  )
}

export default observer(CheckinProblemsByCoachRoute)
