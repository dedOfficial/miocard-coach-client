/* eslint-disable no-underscore-dangle */
import React from 'react'
import moment from 'moment'

import { ProblemsByChat } from '../../../store/checkinProblemsStore/checkinProblems.store.types'
import { CheckinCheckboxes } from './constants'

import {
  dateStyle,
  checkinStyle,
  redStyle,
  wrapperStyle,
  listWrapperStyle,
  checkinWrapperStyle,
} from './styles'

interface ProblemsByChatListProps {
  problems: ProblemsByChat[]
}

const CheckinsList = ({ checkinList }) => {
  return (
    <div className={listWrapperStyle}>
      {checkinList.map((checkin) => (
        <div key={checkin._id} className={checkinWrapperStyle}>
          <div className={checkinStyle}>
            {checkin.checkin === 'first' ? 'First check-in' : 'Second check-in'}
          </div>
          <div>
            {checkin.checkinCheckboxes.map((checkbox) => (
              <div key={checkbox} className={redStyle}>
                {CheckinCheckboxes[checkbox]}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const ProblemsByChatList: React.FC<ProblemsByChatListProps> = ({
  problems,
}) => {
  return (
    <section className={wrapperStyle}>
      {problems.map((problem) => (
        <div key={problem._id}>
          <h1 className={dateStyle}>{moment(problem._id).format('MMMM D')}</h1>
          {problem.checkinsList.first && (
            <CheckinsList checkinList={problem.checkinsList.first} />
          )}
          {problem.checkinsList.second && (
            <CheckinsList checkinList={problem.checkinsList.second} />
          )}
        </div>
      ))}
    </section>
  )
}

export default ProblemsByChatList
