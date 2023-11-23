import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import OperatorDashboard from '../../components/operators/operator-dashboard'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const OperatorDashboardRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <OperatorDashboard />
      <BoardFooter />
    </div>
  )
}

export default observer(OperatorDashboardRoute)
