/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import StatsElement from './stats-element'

import { statsBlockTitle, statsListStyle } from './styles'

interface AchievementsBlockProps {
  title: string
  period?
  unitSymbol?: string
}

const AchievementsBlock: React.FC<AchievementsBlockProps> = ({
  title,
  period,
  unitSymbol,
}) => {
  return (
    <div className="w-1/2">
      <span className={statsBlockTitle}>
        {title} {unitSymbol}
      </span>
      <ul className={statsListStyle}>
        <StatsElement title="This week" value={2} />
        <StatsElement title="Previous week" value={4} />
      </ul>
    </div>
  )
}

export default AchievementsBlock
