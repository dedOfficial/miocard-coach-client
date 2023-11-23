/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react'

import StatsElement from './stats-element'
import {
  EAllowedElementTitle,
  EHighlightedColor,
  EKeyResultsType,
} from '../../../../../constants'
import {
  ResultsPeriodType,
  PressureWeekType,
  PressureMonthType,
  ProblemsPeriodType,
  HabitsMonthType,
  StatPeriodType,
  StatPeriodMonthType,
} from '../../../../../../../store/objectiveStore/objectives.store.types'

import { statsBlockTitle, statsListStyle } from './styles'

interface ResultsBlockProps {
  period: ResultsPeriodType
  title: string
  type?: string
}

const ResultsBlock: React.FC<ResultsBlockProps> = ({ period, title, type }) => {
  const isBloodPressure =
    (period as PressureWeekType)?.[0]?.systolic !== undefined
  const isCheckinProblems =
    (period as ProblemsPeriodType)?.[0]?.['max limit'] !== undefined
  const isHabits = (period as HabitsMonthType)?.[0]?.norm !== undefined
  const isOtherStat = (period as StatPeriodType)?.[0]?.actual !== undefined
  const isPatientReturn = type === EKeyResultsType.PATIENT_RETURN
  const isSelfEfficacy = type === EKeyResultsType.SELF_EFFICACY
  const isPlusMarkedValue =
    !isCheckinProblems && !isPatientReturn && !isSelfEfficacy

  const firstTitle = useMemo(() => {
    if (isBloodPressure) return EAllowedElementTitle.SYSTOLIC
    if (isOtherStat) return EAllowedElementTitle.ACTUAL
    return ''
  }, [isBloodPressure, isOtherStat])

  const secondTitle = useMemo(() => {
    if (isBloodPressure) return EAllowedElementTitle.DIASTOLIC
    if (isHabits) return EAllowedElementTitle.NORM
    if (isCheckinProblems) return EAllowedElementTitle.MAX_LIMIT
    return ''
  }, [isBloodPressure, isCheckinProblems, isHabits])

  const firstValue = useMemo(() => {
    const systolic = (period as PressureWeekType)?.[0]?.systolic
    const actual = (period as StatPeriodType)?.[0]?.actual
    if (isBloodPressure) return systolic === 0 ? 'N/A' : systolic
    if (isOtherStat) return actual === 0 ? 'N/A' : actual
    return ''
  }, [isBloodPressure, isOtherStat, period])

  const secondValue = useMemo(() => {
    if (isBloodPressure && period.length > 0) {
      const diastolic = (period as PressureWeekType)?.[1]?.diastolic
      return diastolic === 0 ? 'N/A' : diastolic
    }
    if (isHabits) return (period as HabitsMonthType)?.[0]?.norm
    if (isCheckinProblems)
      return (period as ProblemsPeriodType)?.[0]?.['max limit']
    return ''
  }, [isBloodPressure, isCheckinProblems, isHabits, period])

  const firstNormValue = useMemo(() => {
    if (isBloodPressure) return (period as PressureMonthType)?.[0]?.norm
    return ''
  }, [isBloodPressure, period])

  const secondNormValue = useMemo(() => {
    if (isBloodPressure && period.length > 0)
      return (period as PressureMonthType)?.[1]?.norm
    return ''
  }, [isBloodPressure, period])

  const firstHighlightedColor = useMemo(() => {
    if (firstValue === 'N/A') return EHighlightedColor.BLACK
    return (
      (period as StatPeriodMonthType)?.[0]?.highlighted ||
      EHighlightedColor.BLACK
    )
  }, [firstValue, period])

  const secondHighlightedColor = useMemo(() => {
    if (secondValue === 'N/A') return EHighlightedColor.BLACK
    if (isBloodPressure && period.length > 0)
      return (period as PressureMonthType)?.[1].highlighted
    return EHighlightedColor.BLACK
  }, [isBloodPressure, period, secondValue])

  return (
    <div className="w-1/2">
      <span className={statsBlockTitle}>{title}</span>

      <ul className={statsListStyle}>
        <StatsElement
          title={firstTitle}
          value={
            firstValue > 0 && isPlusMarkedValue ? `+${firstValue}` : firstValue
          }
          highlightedColor={firstHighlightedColor}
        />

        {isBloodPressure && (
          <StatsElement
            title={firstNormValue ? EAllowedElementTitle.NORM : ''}
            value={firstNormValue > 0 ? `+${firstNormValue}` : firstNormValue}
            highlightedColor={EHighlightedColor.BLACK}
          />
        )}

        <StatsElement
          title={secondTitle}
          value={
            secondValue > 0 && isPlusMarkedValue
              ? `+${secondValue}`
              : secondValue
          }
          highlightedColor={secondHighlightedColor}
        />

        {isBloodPressure && (
          <StatsElement
            title={secondNormValue ? EAllowedElementTitle.NORM : ''}
            value={
              secondNormValue > 0 ? `+${secondNormValue}` : secondNormValue
            }
            highlightedColor={EHighlightedColor.BLACK}
          />
        )}
      </ul>
    </div>
  )
}

export default ResultsBlock
