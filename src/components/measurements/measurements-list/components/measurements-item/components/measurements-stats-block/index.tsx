import React, { FC, useMemo } from 'react'

import { MeasurementsStatsType } from '../../../../../../../store/measurementsStore/measurements.store.types'

import {
  markLargerStyle,
  markLessStyle,
  statsBlockTitle,
  statsElementValueStyle,
  statsListStyle,
} from './styles'

interface ReturnStatsProps {
  title: string
  period: MeasurementsStatsType
}

interface StatsElementProps {
  title: string
  value: number
  status: 'less' | 'larger' | 'normal'
}

const StatsElement: FC<StatsElementProps> = ({ title, value, status }) => {
  const statusStyle = useMemo(() => {
    if (status === 'less') return markLessStyle
    if (status === 'larger') return markLargerStyle
    return ''
  }, [status])

  return (
    <li>
      <small>{title}</small>
      <mark className={`${statsElementValueStyle} ${statusStyle}`}>
        {value}
      </mark>
    </li>
  )
}

const MeasurementsStatsBlock: FC<ReturnStatsProps> = ({ title, period }) => {
  const status = useMemo(() => {
    if (period?.highlight === 'green') return 'larger'
    if (period?.highlight === 'red') return 'less'
    return 'normal'
  }, [period])

  return (
    <div>
      <span className={statsBlockTitle}>{title} (times)</span>
      <ul className={statsListStyle}>
        <StatsElement
          title={`This ${period.period}`}
          value={period.current}
          status={status}
        />
        <StatsElement
          title={`Previous ${period.period}`}
          value={period.previous}
          status="normal"
        />
        <StatsElement title="Min norm" value={period.minNorm} status="normal" />
      </ul>
    </div>
  )
}

export default MeasurementsStatsBlock
