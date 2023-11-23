/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from '../../../store/accountStore/account.store'
import operatorStore from '../../../store/operatorStore/operator.store'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardFooter from '../../../components/board/BoardFooter'
import BoardTitleNew from '../../../components/board/board-title-new'
import Loader from '../../../components/loader/loader'
import StatsList from '../../../components/operators/operator-dashboard/components/stats-list'

import { mainWrapperStyle } from '../../boardRoute/BoardRoute.styled'

const HabitsByChatRoute: React.FC = () => {
  const { habits } = operatorStore.dashboardStats

  const { operatorId } = useParams<{ operatorId: string }>()

  const { loading } = operatorStore.requestInitialState

  const isUser = !!accountStore.user.id.length

  useEffect(() => {
    if (isUser) {
      operatorStore.fetchDashboardStats(operatorId, 'habits')
    }
  }, [isUser, operatorId])

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
      <BoardTitleNew
        title={`Habits to change or reduce: ${operatorName}`}
        back
      />

      {habits.length > 0 ? (
        <StatsList stats={habits} />
      ) : (
        <div>No habits were added to operator's chats</div>
      )}

      <BoardFooter />
    </div>
  )
}

export default observer(HabitsByChatRoute)
