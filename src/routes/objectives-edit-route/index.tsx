import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import EditObjective from '../../components/Objectives/Edit'
import BoardTitleNew from '../../components/board/board-title-new'

const EditObjectivesRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Edit objective" back />
      <EditObjective />
      <BoardFooter />
    </div>
  )
}

export default observer(EditObjectivesRoute)
