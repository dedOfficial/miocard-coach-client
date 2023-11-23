/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import MeasurementsList from 'components/measurements/measurements-list'
import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import Loader from '../../components/loader/loader'
import NoAssignedChats from '../../components/no-assigned-chats'
import accountStore from '../../store/accountStore/account.store'
import measurementsStore from '../../store/measurementsStore/measurements.store'
import operatorStore from '../../store/operatorStore/operator.store'
import BoardTitleNew from '../../components/board/board-title-new'

import { mainWrapperStyle } from './BoardRoute.styled'

const BoardReturnChatsRoute: FC = () => {
  const {
    measurementsChats: { chats },
  } = measurementsStore

  const { loading } = measurementsStore.requestInitialState

  const { operatorId } = useParams<{ operatorId: string }>()

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/operator/chat/'

  useEffect(() => {
    if (isUser) {
      measurementsStore.fetchMeasurementsCoachChats(operatorId)
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

      <BoardTitleNew title={`BP measurements control: ${operatorName}`} back />

      {chats.length > 0 ? (
        <MeasurementsList allCoaches={chats} routeUrl={routeUrl} />
      ) : (
        <NoAssignedChats />
      )}

      <BoardFooter />
    </section>
  )
}

export default observer(BoardReturnChatsRoute)
