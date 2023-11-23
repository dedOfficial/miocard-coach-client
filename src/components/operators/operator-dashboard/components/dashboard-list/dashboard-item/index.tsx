import React, { FC, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import DashboardBlock from './dashboard-block'
import {
  DashboardTypes,
  DashboardMeasurementsType,
  DashboardProblemsType,
} from '../../../../../../store/operatorStore/operator.store.types'

import {
  wrapperStyle,
  titleStyle,
  statsWrapperStyle,
  linkStyle,
} from './styles'
import {
  EAllowedTitleOperatorDashboard,
  EDashboardSection,
} from '../../../../constants'

interface DashboardItemProps {
  item: DashboardTypes
}

const DashboardItem: FC<DashboardItemProps> = ({ item }) => {
  const { id } = useParams<{ id: string }>()

  const weekPeriod = useMemo(() => {
    if (item.title === EAllowedTitleOperatorDashboard.CHECKIN_PROBLEMS)
      return (item as DashboardProblemsType).data.week
    return (item as DashboardMeasurementsType).data.statistics[0]
  }, [item])

  const monthPeriod = useMemo(() => {
    if (item.title === EAllowedTitleOperatorDashboard.CHECKIN_PROBLEMS)
      return (item as DashboardProblemsType).data.month
    return (item as DashboardMeasurementsType).data.statistics[1]
  }, [item])

  const url = useMemo(() => {
    return `/tracked-parameter/${EDashboardSection[item.title].path}/${id}`
  }, [id, item.title])

  return (
    <div>
      <div className={titleStyle}>{item.title}</div>
      <div className={wrapperStyle}>
        <h5 className={linkStyle}>
          <Link to={url}>See by patients</Link>
        </h5>
        <div className={statsWrapperStyle}>
          <DashboardBlock
            title={EDashboardSection[item.title].firstBlock.generalTitle}
            period={weekPeriod}
            itemTitle={item.title}
            block="firstBlock"
          />
          <DashboardBlock
            title={EDashboardSection[item.title].secondBlock.generalTitle}
            period={monthPeriod}
            itemTitle={item.title}
            block="secondBlock"
          />
        </div>
      </div>
    </div>
  )
}

export default DashboardItem
