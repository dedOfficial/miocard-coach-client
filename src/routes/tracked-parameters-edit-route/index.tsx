import React, { FC } from 'react'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import EditTrackedParameters from '../../components/TrakedParameters/Edit'
import BoardTitleNew from '../../components/board/board-title-new'

const EditTrackedParametersRoute: FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Edit tracked parameter" />
      <EditTrackedParameters />
      <BoardFooter />
    </div>
  )
}

export default EditTrackedParametersRoute
