import React, { FC, useMemo } from 'react'

import StatsBlock from './stats-block'
import {
  DashboardStatsDataType,
  DashboardStatsTypes,
  DrugsStatsType,
} from '../../../../../../store/operatorStore/operator.store.types'

import {
  wrapperStyle,
  statsWrapperStyle,
  itemTitleStyle,
  statTitleStyle,
} from './styles'

interface StatsItemProps {
  item: DashboardStatsTypes
}

const StatsItem: FC<StatsItemProps> = ({ item }) => {
  const chatTitle = item.chatName

  const isDrugs = (stat: DashboardStatsTypes) => {
    return (stat as DrugsStatsType).data !== undefined
  }

  const blockTitleWeek = useMemo(() => {
    if (isDrugs(item)) {
      return 'Weekly intake (days)'
    }
    return 'Weekly (times)'
  }, [item])

  const blockTitleMonth = useMemo(() => {
    if (isDrugs(item)) {
      return 'Monthly intake (days)'
    }
    return 'Monthly (times)'
  }, [item])

  return (
    <div>
      <div className={itemTitleStyle}>{chatTitle}</div>
      {item.data.map((data: DashboardStatsDataType) => (
        <div className={wrapperStyle} key={data.name}>
          <h5 className={statTitleStyle}>{data.name}</h5>
          <div className={statsWrapperStyle}>
            <StatsBlock title={blockTitleWeek} period={data.statistics[0]} />
            <StatsBlock title={blockTitleMonth} period={data.statistics[1]} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsItem
