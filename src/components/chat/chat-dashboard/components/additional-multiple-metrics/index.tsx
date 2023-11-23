import React from 'react'

import AdditionalStat from '../additional-metrics/components/additional-stat'
import { TChatCombineDashboard } from '../../../../../store/chatStore/chat.store.types'

import { titleStyle } from '../additional-metrics/components/additional-stat/styles'
import { wrapperBlockStyle, wrapperStyle } from './styles'

interface AdditionalMultipleMetricsProps {
  additionalMultipleMetrics?: TChatCombineDashboard[]
}

const AdditionalMultipleMetrics: React.FC<AdditionalMultipleMetricsProps> = ({
  additionalMultipleMetrics,
}) => {
  return (
    <div className={wrapperStyle}>
      {additionalMultipleMetrics?.length &&
        additionalMultipleMetrics.map((stats) => {
          return (
            stats.blocks?.length > 0 && (
              <div key={stats.title}>
                <div className={titleStyle}>{stats.title}</div>
                <div className={wrapperBlockStyle}>
                  {stats.blocks.map((stat) => (
                    <AdditionalStat stat={stat} key={stat.title} smallTitle />
                  ))}
                </div>
              </div>
            )
          )
        })}
    </div>
  )
}

export default AdditionalMultipleMetrics
