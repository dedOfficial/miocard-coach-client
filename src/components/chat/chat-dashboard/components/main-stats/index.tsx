import React from 'react'

import MainStat from './components/main-stat'

import { wrapperStyle } from './styles'
import { TChatDashboard } from '../../../../../store/chatStore/chat.store.types'

interface MainStatsProps {
  mainStats?: TChatDashboard[]
}

const MainStats: React.FC<MainStatsProps> = ({ mainStats }) => {
  return (
    <div className={wrapperStyle}>
      {mainStats?.length &&
        mainStats.map((stat) => <MainStat stat={stat} key={stat.title} />)}
    </div>
  )
}

export default MainStats
