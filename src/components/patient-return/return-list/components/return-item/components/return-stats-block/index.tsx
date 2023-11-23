import React, { FC, useCallback, useMemo } from 'react'

import {
  EPeriod,
  ReturnStatsType,
} from '../../../../../../../store/returnStore/return.store.types'

import {
  markLargerStyle,
  markLessStyle,
  statsBlockTitle,
  statsElementValueStyle,
  statsListStyle,
} from './styles'

interface ReturnStatsProps {
  title: string
  period: ReturnStatsType
  unitSymbol?: string
}

interface StatsElementProps {
  title: string
  value: number | null
  status: 'less' | 'larger' | 'normal'
}

const StatsElement: FC<StatsElementProps> = ({ title, value, status }) => {
  const statusStyle = useMemo(() => {
    if (status === 'less') return markLessStyle
    if (status === 'larger') return markLargerStyle
    return ''
  }, [status])

  const nullCheck = useCallback(
    (checkValue: number | null) => (checkValue !== null ? checkValue : 'N/A'),
    []
  )

  return (
    <li>
      <small>{title}</small>
      <mark className={`${statsElementValueStyle} ${statusStyle}`}>
        {nullCheck(value)}
      </mark>
    </li>
  )
}

const ReturnStatsBlock: FC<ReturnStatsProps> = ({
  title,
  period,
  unitSymbol = '%',
}) => {
  const status = useMemo(() => {
    if (period?.highlight === 'green') return 'larger'
    if (period?.highlight === 'red') return 'less'
    return 'normal'
  }, [period])

  return (
    <div>
      <span className={statsBlockTitle}>
        {title} ({unitSymbol})
      </span>
      <ul className={statsListStyle}>
        <StatsElement
          title={
            period.period === EPeriod.MONTH
              ? 'Current 4 weeks'
              : `This ${period.period}`
          }
          value={period.current}
          status={status}
        />
        <StatsElement
          title={`Previous ${
            period.period === EPeriod.MONTH ? '4 weeks' : period.period
          }`}
          value={period.previous}
          status="normal"
        />
        <StatsElement title="Min norm" value={period.minNorm} status="normal" />
      </ul>
    </div>
  )
}

export default ReturnStatsBlock
