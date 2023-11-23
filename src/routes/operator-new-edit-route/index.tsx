import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import OperatorNewEdit from '../../components/operators/operator-new-edit'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const OperatorNewEditRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <OperatorNewEdit />
      <BoardFooter />
    </div>
  )
}

export default observer(OperatorNewEditRoute)
