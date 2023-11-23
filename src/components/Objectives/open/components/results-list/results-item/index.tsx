import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { ResultsAchievementType } from '../../../../../../store/objectiveStore/objectives.store.types'
import { EKeyResultsType, EAllowedBlockTitle } from '../../../../constants'
import ResultsBlock from './results-block'

import { wrapperStyle, statsWrapperStyle, linkStyle } from './styles'

interface ResultsItemProps {
  item: ResultsAchievementType
  objectiveId?: string
}

const ResultsItem: FC<ResultsItemProps> = ({ item, objectiveId }) => {
  const keyResultName = item?.name
  const { type } = item
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
      <Link
        className={linkStyle}
        to={`/tracked-parameter/objectives/${objectiveId}/${keyResultName}`}>
        {keyResultName}
      </Link>

      <div className={statsWrapperStyle}>
        {!isSelfEfficacy && (
          <ResultsBlock
            period={item.data.week}
            title={titleForWeek}
            type={type}
          />
        )}
        <ResultsBlock
          period={item.data.month}
          title={titleForMonth}
          type={type}
        />
      </div>
    </div>
  )
}

export default ResultsItem
