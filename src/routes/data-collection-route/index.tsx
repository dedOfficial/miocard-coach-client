import React from 'react'
import { observer } from 'mobx-react-lite'

import DataCollection from '../../components/data-collection'
import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'

const DataCollectionRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <DataCollection />
      <BoardFooter />
    </div>
  )
}

export default observer(DataCollectionRoute)
