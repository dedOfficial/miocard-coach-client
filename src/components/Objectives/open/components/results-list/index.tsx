import React, { FC } from 'react'

import { ResultsAchievementType } from '../../../../../store/objectiveStore/objectives.store.types'
import ResultsItem from './results-item'

import { listWrapperStyle, titleStyle } from './styles'

interface ResultsListProps {
  results: ResultsAchievementType[]
  objectiveId?: string
}

const ResultsList: FC<ResultsListProps> = ({ results, objectiveId }) => {
  return (
    <>
      {results.length > 0 && (
        <>
          <div className={titleStyle}>Key results achievement</div>
          <div className={listWrapperStyle}>
            {results.map((item) => (
              <ResultsItem
                item={item}
                key={item.type}
                objectiveId={objectiveId}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default ResultsList
