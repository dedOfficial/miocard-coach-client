import React, { FC } from 'react'

import DashboardItem from './dashboard-item'
import { DashboardTypes } from '../../../../../store/operatorStore/operator.store.types'

import { wrapperStyle } from './styles'

interface DashboardListProps {
  list: DashboardTypes[]
}

const DashboardList: FC<DashboardListProps> = ({ list }) => {
  return (
    <div className={wrapperStyle}>
      {list.map((item) => (
        <DashboardItem item={item} key={item.title} />
      ))}
    </div>
  )
}

export default DashboardList
