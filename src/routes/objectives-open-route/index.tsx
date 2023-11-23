/* eslint-disable no-underscore-dangle */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import BoardHeader from '../../components/board/BoardHeader'
import BoardTitleNew from '../../components/board/board-title-new'
import BoardFooter from '../../components/board/BoardFooter'
import OpenObjective from '../../components/Objectives/open'
import ActionButton from '../../components/controls/action-btn'
import objectivesStore from '../../store/objectiveStore/objectives.store'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const OpenObjectivesRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const objectiveName =
    objectivesStore.objectives.find((obj) => obj._id === id)?.name || ''

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Objective:" subtitle={`${objectiveName}`} back />
      <Link to={`/tracked-parameter/objectives/${id}/edit`}>
        <ActionButton label="Edit objective" action={() => {}} />
      </Link>
      <OpenObjective objectiveId={id} />
      <BoardFooter />
    </div>
  )
}

export default observer(OpenObjectivesRoute)
