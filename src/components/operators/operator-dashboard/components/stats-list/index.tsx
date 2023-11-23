import React, { FC } from 'react'

import StatsItem from './stats-item'
import { DashboardStatsTypes } from '../../../../../store/operatorStore/operator.store.types'

import { wrapperStyle } from './styles'

interface StatsListProps {
  stats: Array<DashboardStatsTypes>
}

const StatsList: FC<StatsListProps> = ({ stats }) => {
  return (
    <div className={wrapperStyle}>
      {stats.map((item) => (
        <StatsItem item={item} key={item.chatName} />
      ))}
    </div>
  )
}

export default StatsList
