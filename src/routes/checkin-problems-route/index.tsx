import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import NoTrackedParameter from '../../components/no-tracked-parameter'
import accountStore from '../../store/accountStore/account.store'
import checkinProblemsStore from '../../store/checkinProblemsStore/checkinProblems.store'
import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import BoardTitleNew from '../../components/board/board-title-new'
import Loader from '../../components/loader/loader'
import ProblemsList from '../../components/checkin-problems/problems-list'
import ActionButton from '../../components/controls/action-btn'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const CheckinProblemsRoute: React.FC = () => {
  const { coaches } = checkinProblemsStore
  const { loading } = checkinProblemsStore.requestInitialState

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/tracked-parameter/checkin-problems/'

  useEffect(() => {
    if (isUser) {
      checkinProblemsStore.fetchProblemsCoaches()
    }
  }, [isUser])

  if (loading) return <Loader />

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Check-in problems" back />
      <Link to="/tracked-parameter/edit/checkin-problems">
        <ActionButton label="Edit tracked parameters" />
      </Link>

      {coaches.length > 0 ? (
        <ProblemsList allCoaches={coaches} routeUrl={routeUrl} />
      ) : (
        <NoTrackedParameter />
      )}

      <BoardFooter />
    </div>
  )
}

export default observer(CheckinProblemsRoute)
