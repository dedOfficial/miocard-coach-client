import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { MeasurementsStatsType } from '../../../../../store/measurementsStore/measurements.store.types'
import MeasurementsStatsBlock from './components/measurements-stats-block'

import {
  returnItemStyle,
  returnItemTitleStyle,
  returnStatsWrapperStyle,
} from './styles'

interface MeasurementsItemProps {
  title: string
  url: string
  statistics: MeasurementsStatsType[]
}

const MeasurementsItem: FC<MeasurementsItemProps> = ({
  title,
  url,
  statistics: [week, month],
}) => {
  return (
    <div className={returnItemStyle}>
      <h5 className={returnItemTitleStyle}>
        <Link to={url}>{title}</Link>
      </h5>
      <div className={returnStatsWrapperStyle}>
        <MeasurementsStatsBlock title="Weekly" period={week} />
        <MeasurementsStatsBlock title="Monthly" period={month} />
      </div>
    </div>
  )
}

export default MeasurementsItem
