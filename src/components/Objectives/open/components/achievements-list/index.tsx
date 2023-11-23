import React, { FC } from 'react'

import AchievementsItem from './achievements-item'

import { titleStyle, wrapperStyle } from './styles'

interface AchievementsListProps {
  achievements
}

const AchievementsList: FC<AchievementsListProps> = ({ achievements }) => {
  return (
    <>
      <div className={titleStyle}>Objective achievement by coaches</div>
      <div className={wrapperStyle}>
        {achievements.map((item) => (
          <AchievementsItem item={item} key={item.type} />
        ))}
      </div>
    </>
  )
}

export default AchievementsList
