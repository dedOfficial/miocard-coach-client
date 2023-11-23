import React from 'react'

import AdditionalStat from './components/additional-stat'

import { wrapperStyle } from './styles'
import { TChatDashboard } from '../../../../../store/chatStore/chat.store.types'

interface AdditionalMetricsProps {
  additionalMetrics?: TChatDashboard[]
}

const AdditionalMetrics: React.FC<AdditionalMetricsProps> = ({
  additionalMetrics,
}) => {
  return (
    <div className={wrapperStyle}>
      {additionalMetrics?.length &&
        additionalMetrics.map((stat) => (
          <AdditionalStat stat={stat} key={stat.title} />
        ))}
    </div>
  )
}

export default AdditionalMetrics
