/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import DashboardList from './components/dashboard-list'
import DashboardBrief from './components/dashboard-brief'
import BoardTitleNew from '../../board/board-title-new'
import Loader from '../../loader/loader'
import operatorStore from '../../../store/operatorStore/operator.store'

const OperatorDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const { dashboard } = operatorStore

  const { loading } = operatorStore.requestInitialState

  const operatorName =
    operatorStore.operators.find((operator) => operator._id === id)?.name ||
    operatorStore.assistants.find((assistant) => assistant._id === id)?.name ||
    ''

  const getDashboard = useCallback(async () => {
    await operatorStore.fetchDashboard(id)
  }, [id])

  useEffect(() => {
    getDashboard()
  }, [getDashboard])

  if (loading) return <Loader />

  return (
    <>
      <BoardTitleNew
        title={`${operatorName} dashboard: General overview`}
        back
      />
      {dashboard.length > 0 ? (
        <DashboardList list={dashboard} />
      ) : (
        <DashboardBrief />
      )}
    </>
  )
}

export default observer(OperatorDashboard)
