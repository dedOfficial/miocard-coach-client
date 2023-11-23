import React from 'react'
import { observer } from 'mobx-react-lite'
import 'react-datepicker/dist/react-datepicker.css'

import dataKitStore from '../../store/datakitStore/datakit.store'
import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import BoardTitleNew from '../../components/board/board-title-new'
import AssignDataKit from '../../components/datakit/Assign'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const AssignDataKitRoute: React.FC = () => {
  const { currentDataKit } = dataKitStore

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Assign:" subtitle={currentDataKit.name} back />
      <AssignDataKit />
      <BoardFooter />
    </div>
  )
}

export default observer(AssignDataKitRoute)
