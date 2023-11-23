import React, { FC, useMemo } from 'react'

import ResultsBlock from '../../results-list/results-item/results-block'
import { EKeyResultsType, EAllowedBlockTitle } from '../../../../constants'
import { DataByOperatorType } from '../../../../../../store/objectiveStore/objectives.store.types'

import { wrapperStyle, statsWrapperStyle, linkStyle } from './styles'

interface ResultsItemProps {
  item: DataByOperatorType
  type: string
}

const ResultsItem: FC<ResultsItemProps> = ({ item, type }) => {
  const operatorName = item?.name
  const isSelfEfficacy = type === EKeyResultsType.SELF_EFFICACY

  const titleForWeek = useMemo(() => {
    switch (type) {
      case EKeyResultsType.BLOOD_PRESSURE:
        return EAllowedBlockTitle.THIS_WEEK_MMHG
        break
      case EKeyResultsType.HABITS:
      case EKeyResultsType.RECOMMENDATIONS:
        return EAllowedBlockTitle.WEEKLY_REPETITIONS_PERCENTAGE
        break
      case EKeyResultsType.CHECKIN_PROBLEMS:
        return EAllowedBlockTitle.THIS_WEEK_TIMES
        break
      default:
        return EAllowedBlockTitle.THIS_WEEK_PERCENTAGE
        break
    }
  }, [type])

  const titleForMonth = useMemo(() => {
    switch (type) {
      case EKeyResultsType.BLOOD_PRESSURE:
        return EAllowedBlockTitle.THIS_MONTH_MMHG
        break
      case EKeyResultsType.HABITS:
      case EKeyResultsType.RECOMMENDATIONS:
        return EAllowedBlockTitle.MONTLY_REPETITIONS_PERCENTAGE
        break
      case EKeyResultsType.CHECKIN_PROBLEMS:
        return EAllowedBlockTitle.THIS_MONTH_TIMES
        break
      default:
        return EAllowedBlockTitle.THIS_MONTH_PERCENTAGE
        break
    }
  }, [type])

  return (
    <div className={wrapperStyle}>
      <div className={linkStyle}>{operatorName}</div>
      <div className={statsWrapperStyle}>
        {!isSelfEfficacy && (
          <ResultsBlock period={item.week} title={titleForWeek} type={type} />
        )}
        <ResultsBlock period={item.month} title={titleForMonth} type={type} />
      </div>
    </div>
  )
}

export default ResultsItem
