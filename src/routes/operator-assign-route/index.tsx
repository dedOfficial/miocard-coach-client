import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import OperatorAssignChats from '../../components/operators/operator-assign-chats'

const OperatorRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <OperatorAssignChats />
      <BoardFooter />
    </div>
  )
}

export default observer(OperatorRoute)
