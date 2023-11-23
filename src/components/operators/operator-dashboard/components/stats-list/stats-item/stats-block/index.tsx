import React, { FC, useMemo } from 'react'

import {
  DrugsStatsPeriodType,
  DashboardStatsPeriodTypes,
  HabitsStatsPeriodType,
  RecommendationsStatsPeriodType,
} from '../../../../../../../store/operatorStore/operator.store.types'

import {
  elementTitleStyle,
  elementWrapperStyle,
  markLargerStyle,
  markLessStyle,
  statsBlockTitle,
  statsElementValueStyle,
  statsListStyle,
} from './styles'

interface StatsBlockProps {
  title: string
  period: DashboardStatsPeriodTypes
  unitSymbol?: string
}

interface StatsElementProps {
  title: string
  value: number | string
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
      <mark className={`${statsElementValueStyle} ${statusStyle}`}>
        {value}
      </mark>
    </li>
  )
}

const StatsBlock: FC<StatsBlockProps> = ({ title, period, unitSymbol }) => {
  const status = useMemo(() => {
    if (period?.highlight === 'green') return 'larger'
    if (period?.highlight === 'red') return 'less'
    return 'normal'
  }, [period])

  const isDrugs = (item: DashboardStatsPeriodTypes) => {
    return (item as DrugsStatsPeriodType).current !== undefined
  }

  const isHabits = (item: DashboardStatsPeriodTypes) => {
    return (item as HabitsStatsPeriodType).current !== undefined
  }

  const isRecommendations = (item: DashboardStatsPeriodTypes) => {
    return (item as RecommendationsStatsPeriodType).current !== undefined
  }

  const thirdElementTitle = useMemo(() => {
    if (isDrugs(period)) {
      return ''
    }
    if (isHabits(period)) {
      return 'Max limit'
    }
    if (isRecommendations(period)) {
      return 'Min norm'
    }
    return ''
  }, [period])

  const thirdElementValue = useMemo(() => {
    if (isDrugs(period)) {
      return ''
    }
    if (isHabits(period)) {
      return (period as HabitsStatsPeriodType).maxLimit
    }
    if (isRecommendations(period)) {
      return (period as RecommendationsStatsPeriodType).minNorm
    }
    return ''
  }, [period])

  return (
    <div className="w-1/2">
      <span className={statsBlockTitle}>
        {title} {unitSymbol}
      </span>
      <ul className={statsListStyle}>
        <StatsElement
          title={`This ${period.period}`}
          value={period.current}
          status={status}
        />
        <StatsElement
          title={`Previous ${period.period}`}
          value={period.previous}
          status={status}
        />
        <StatsElement
          title={thirdElementTitle}
          value={thirdElementValue}
          status="normal"
        />
      </ul>
    </div>
  )
}

export default StatsBlock
