import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import Objectives from '../../components/Objectives'
import ObjectivesTitle from '../../components/Objectives/ObjectivesTitle'

const ObjectivesRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <ObjectivesTitle />
      <Objectives />
      <BoardFooter />
    </div>
  )
}

export default observer(ObjectivesRoute)
