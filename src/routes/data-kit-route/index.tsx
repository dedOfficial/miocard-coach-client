import React from 'react'
import { observer } from 'mobx-react-lite'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import BoardHeader from '../../components/board/BoardHeader'
import dataKitStore from '../../store/datakitStore/datakit.store'
import BoardFooter from '../../components/board/BoardFooter'
import BoardTitleNew from '../../components/board/board-title-new'
import DataKit from '../../components/datakit'

const DataKitRoute: React.FC = () => {
  const { currentDataKit } = dataKitStore

  return (
    <>
      <div className={mainWrapperStyle}>
        <BoardHeader />
        <BoardTitleNew title={currentDataKit.name} back />
        <DataKit />
        <BoardFooter />
      </div>
    </>
  )
}

export default observer(DataKitRoute)
