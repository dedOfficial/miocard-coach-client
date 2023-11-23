import React from 'react'

import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import BoardTitleNew from '../../components/board/board-title-new'
import AddDataKit from '../../components/datakit/Add'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const AddDataKitRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Add new kit" back />
      <AddDataKit />
      <BoardFooter />
    </div>
  )
}

export default AddDataKitRoute
