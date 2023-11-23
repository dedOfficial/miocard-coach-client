import React, { FC, useMemo } from 'react'

import { ProblemsPeriodType } from '../../../../../../../store/checkinProblemsStore/checkinProblems.store.types'

import {
  markLargerStyle,
  markLessStyle,
  statsBlockTitle,
  statsElementValueStyle,
  statsListStyle,
} from './styles'

interface ProblemsStatsProps {
  title: string
  period: ProblemsPeriodType
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

const ProblemsStatsBlock: FC<ProblemsStatsProps> = ({ title, period }) => {
  const status = useMemo(() => {
    if (period?.highlight === 'green') return 'larger'
    if (period?.highlight === 'red') return 'less'
    return 'normal'
  }, [period])

  return (
    <div>
      <span className={statsBlockTitle}>{title}</span>
      <ul className={statsListStyle}>
        <StatsElement
          title="Problems"
          value={period.problems}
          status={status}
        />
        <StatsElement
          title="Completed session"
          value={period.completedSession}
          status="normal"
        />
        <StatsElement
          title="Max limit"
          value={period.maxLimit}
          status="normal"
        />
      </ul>
    </div>
  )
}

export default ProblemsStatsBlock
