import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { StatisticsType } from '../../../../../../store/data-collection-store/dataCollection.store.types'
import CollectionStatsBlock from './components/collection-stats-block'

import { itemStyle, itemTitleStyle, statsWrapperStyle } from './styles'

interface CollectionItemProps {
  title: string
  url?: string
  statistics: StatisticsType[]
}

const CollectionItem: FC<CollectionItemProps> = ({
  title,
  url,
  statistics: [week, month],
}) => {
  return (
    <div className={itemStyle}>
      <h5 className={itemTitleStyle}>
        {url ? (
          <Link to={url}>{title}</Link>
        ) : (
          <div className="text-black">{title}</div>
        )}
      </h5>
      <div className={statsWrapperStyle}>
        <CollectionStatsBlock title="Weekly" period={week} />
        <CollectionStatsBlock title="Monthly" period={month} />
      </div>
    </div>
  )
}

export default CollectionItem
