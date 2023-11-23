import React, { FC } from 'react'

import AchievementsBlock from './achievements-block'

import { wrapperStyle, statsWrapperStyle, linkStyle } from './styles'

interface AchievementsItemProps {
  item
}

const AchievementsItem: FC<AchievementsItemProps> = ({ item }) => {
  return (
    <div>
      <div className={wrapperStyle}>
        <div className={linkStyle}>{item.name}</div>
        <div className={statsWrapperStyle}>
          <AchievementsBlock
            period={item.data.week}
            title="Weekly Achievement (%)"
          />
          <AchievementsBlock
            period={item.data.month}
            title="Monthly Achievement (%)"
          />
        </div>
      </div>
    </div>
  )
}

export default AchievementsItem
