/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from '../../../store/accountStore/account.store'
import operatorStore from '../../../store/operatorStore/operator.store'
import checkinProblemsStore from '../../../store/checkinProblemsStore/checkinProblems.store'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardFooter from '../../../components/board/BoardFooter'
import BoardTitleNew from '../../../components/board/board-title-new'
import Loader from '../../../components/loader/loader'
import NoAssignedChats from '../../../components/no-assigned-chats'
import ProblemsList from '../../../components/checkin-problems/problems-list'

import { mainWrapperStyle } from '../../boardRoute/BoardRoute.styled'

const CheckinProblemsByCoachRoute: React.FC = () => {
  const { chatsByCoach } = checkinProblemsStore

  const { loading } = checkinProblemsStore.requestInitialState

  const { operatorId } = useParams<{ operatorId: string }>()

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/tracked-parameter/checkin-problems/info/'

  useEffect(() => {
    if (isUser) {
      checkinProblemsStore.fetchChatsByCoach(operatorId)
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
      <BoardTitleNew title={`Check-in problems: ${operatorName}`} back />

      {chatsByCoach.length > 0 ? (
        <ProblemsList allCoaches={chatsByCoach} routeUrl={routeUrl} />
      ) : (
        <NoAssignedChats />
      )}

      <BoardFooter />
    </div>
  )
}

export default observer(CheckinProblemsByCoachRoute)
