import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ReturnStatsType } from '../../../../../store/returnStore/return.store.types'
import ReturnStatsBlock from './components/return-stats-block'
import {
  returnItemStyle,
  returnItemTitleStyle,
  returnStatsWrapperStyle,
} from './styles'

interface ReturnItemProps {
  title: string
  url: string
  statistics: ReturnStatsType[]
}

const ReturnItem: FC<ReturnItemProps> = ({
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
        <ReturnStatsBlock title="Weekly" period={week} />
        <ReturnStatsBlock title="Monthly" period={month} />
      </div>
    </div>
  )
}

export default ReturnItem
