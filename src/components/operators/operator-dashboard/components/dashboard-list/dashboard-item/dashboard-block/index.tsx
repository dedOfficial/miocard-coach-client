import React, { FC, useMemo } from 'react'

import {
  DashboardPeriodTypes,
  DashboardStatPeriodType,
  DashboardProblemsPeriodType,
  DashboardHabitsPeriodType,
} from '../../../../../../../store/operatorStore/operator.store.types'

import {
  markLargerStyle,
  markLessStyle,
  statsBlockTitle,
  elementWrapperStyle,
  elementTitleStyle,
  elementValueStyle,
  statsListStyle,
} from './styles'
import {
  EAllowedTitleOperatorDashboard,
  EDashboardSection,
} from '../../../../../constants'

interface DashboardBlockProps {
  title: string
  itemTitle: EAllowedTitleOperatorDashboard
  period: DashboardPeriodTypes
  block: 'firstBlock' | 'secondBlock'
  unitSymbol?: string
}

interface StatsElementProps {
  title: string
  value: string | number
  status: 'less' | 'larger' | 'normal'
}

const StatsElement: FC<StatsElementProps> = ({ title, value, status }) => {
  const statusStyle = useMemo(() => {
    if (status === 'less') return markLessStyle
    if (status === 'larger') return markLargerStyle
    return ''
  }, [status])

  return (
    <li className={elementWrapperStyle}>
      <small className={elementTitleStyle}>{title}</small>
      <mark className={`${elementValueStyle} ${statusStyle}`}>{value}</mark>
    </li>
  )
}

const DashboardBlock: FC<DashboardBlockProps> = ({
  title,
  itemTitle,
  period,
  block,
  unitSymbol,
}) => {
  const status = useMemo(() => {
    if (
      (period as DashboardStatPeriodType | DashboardProblemsPeriodType)
        .highlight === 'green'
    ) {
      return 'larger'
    }
    if (
      (period as DashboardStatPeriodType | DashboardProblemsPeriodType)
        .highlight === 'red'
    ) {
      return 'less'
    }
    return 'normal'
  }, [period])

  const isStatTitle =
    itemTitle === 'Data collection (average)' ||
    itemTitle === 'Patient return' ||
    itemTitle === 'BP measurements frequency'
  const isProblemsTitle = itemTitle === 'Check-in problems'

  const firstTitle = useMemo(() => {
    return EDashboardSection[itemTitle][block].firstTitle
  }, [block, itemTitle])

  const secondTitle = useMemo(() => {
    return EDashboardSection[itemTitle][block].secondTitle
  }, [block, itemTitle])

  const thirdTitle = useMemo(() => {
    return EDashboardSection[itemTitle][block].thirdTitle
  }, [block, itemTitle])

  const firstValue = useMemo(() => {
    if (isStatTitle) {
      return (period as DashboardStatPeriodType).current
    }
    if (isProblemsTitle) {
      return (period as DashboardProblemsPeriodType).problems
    }
    return (period as DashboardHabitsPeriodType).difference > 0
      ? `+${(period as DashboardHabitsPeriodType).difference}`
      : (period as DashboardHabitsPeriodType).difference
  }, [isProblemsTitle, isStatTitle, period])

  const secondValue = useMemo(() => {
    if (isStatTitle) {
      return (period as DashboardStatPeriodType).previous
    }
    if (isProblemsTitle) {
      return (period as DashboardProblemsPeriodType).completedSession
    }
    return ''
  }, [isProblemsTitle, isStatTitle, period])

  const thirdValue = useMemo(() => {
    if (isStatTitle) {
      return (period as DashboardStatPeriodType).minNorm
    }
    if (isProblemsTitle) {
      return (period as DashboardProblemsPeriodType).maxLimit
    }
    return ''
  }, [isProblemsTitle, isStatTitle, period])

  return (
    <div className="w-1/2">
      <span className={statsBlockTitle}>
        {title} {unitSymbol}
      </span>
      <ul className={statsListStyle}>
        <StatsElement title={firstTitle} value={firstValue} status={status} />
        <StatsElement title={secondTitle} value={secondValue} status="normal" />
        <StatsElement title={thirdTitle} value={thirdValue} status="normal" />
      </ul>
    </div>
  )
}

export default DashboardBlock
