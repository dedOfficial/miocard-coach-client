import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import AddObjective from '../../components/Objectives/Add'
import BoardTitleNew from '../../components/board/board-title-new'

const AddObjectivesRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Add objective" back />
      <AddObjective />
      <BoardFooter />
    </div>
  )
}

export default observer(AddObjectivesRoute)
