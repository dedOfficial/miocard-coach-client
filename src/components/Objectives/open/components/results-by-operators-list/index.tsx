import React, { FC } from 'react'

import {
  DataByOperatorType,
  ResultsByOperatorsType,
} from '../../../../../store/objectiveStore/objectives.store.types'
import { EKeyResultsType } from '../../../constants'
import ResultsItem from './results-item'

import { wrapperStyle, titleStyle } from './styles'

interface ResultsByOperatorsProps {
  results: ResultsByOperatorsType
}

const ResultsByOperators: FC<ResultsByOperatorsProps> = ({ results }) => {
  const type = results?.type
  const isPatientReturn = type === EKeyResultsType.PATIENT_RETURN
  const isCheckinProblems = type === EKeyResultsType.CHECKIN_PROBLEMS

  return (
    <>
      {results.data.length > 0 && (
        <>
          <div className={titleStyle}>Results by operators</div>
          <div className={wrapperStyle}>
            {results.data.map((item) => {
              return !isPatientReturn && !isCheckinProblems ? (
                <ResultsItem
                  item={item}
                  type={type}
                  key={item?.operatorId || item?.assistantId}
                />
              ) : (
                <>
                  {item.map((el: DataByOperatorType) => (
                    <ResultsItem
                      item={el}
                      type={type}
                      key={el?.operatorId || el?.assistantId}
                    />
                  ))}
                </>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

export default ResultsByOperators
