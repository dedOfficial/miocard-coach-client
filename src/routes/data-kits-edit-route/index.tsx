import React from 'react'

import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import BoardTitleNew from '../../components/board/board-title-new'
import EditDataKit from '../../components/datakit/Edit'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const EditDataKitRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Edit kit" back />
      <EditDataKit />
      <BoardFooter />
    </div>
  )
}

export default EditDataKitRoute
