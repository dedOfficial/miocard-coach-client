import React, { useState, useCallback, useMemo } from 'react'
import { isEmpty, omit, some } from 'lodash-es'

import Basket from '../../../../../assets/trash.svg'
import useTimeout from '../../../../../hooks/useTimeout'
import HabitModal from './components/add-habit-modal'
import TestModal from './components/add-test-modal'
import RecommendModal from './components/add-recommend-modal'
import {
  initialNewHabit,
  initialTestResults,
  initialNewRecommend,
} from './constants'
import { ClientInfoType } from '../../constants'
import { generateId } from '../../../../../helpers/chat/chat.helper'

import {
  itemStyle,
  labelStyle,
  smInputWrapperStyle,
  smInputStyle,
  smInputTextStyle,
  addBtnStyle,
  removeBtnStyle,
  habitTitleWrapperStyle,
  textareaStyle,
  saveBtnStyle,
  titleStyle,
} from './styles'

interface AttendanceProps {
  clientInfo: ClientInfoType
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfoType>>
  setHasUnsaved: React.Dispatch<React.SetStateAction<boolean>>
  handleAdditionalInfo: (e: any) => void
  handleSave: () => void
}

const Attendance: React.FC<AttendanceProps> = ({
  clientInfo,
  setClientInfo,
  setHasUnsaved,
  handleAdditionalInfo,
  handleSave,
}) => {
  const [isHabit, setIsHabit] = useState(false)
  const [newHabit, setNewHabit] = useState(initialNewHabit)
  const [isError, setIsError] = useState(false)
  const [isTestResults, setIsTestResults] = useState(false)
  const [newTestResults, setNewTestResults] = useState(initialTestResults)
  const [isRecommend, setIsRecommend] = useState(false)
  const [newRecommend, setNewRecommend] = useState({
    ...initialNewRecommend,
    id: generateId(),
  })

  const newHabitValidation = useMemo(
    () => !some(omit(newHabit, ['id', 'repeatability', 'limit']), isEmpty),
    [newHabit]
  )

  const runWithDelay = useTimeout(() => setIsError(false))

  const handleNewHabit = useCallback(() => {
    if (newHabitValidation) {
      setClientInfo({
        ...clientInfo,
        habits: [
          ...(clientInfo?.habits || []),
          {
            ...newHabit,
            repeatability: Number(newHabit.repeatability),
            limit: Number(newHabit.limit),
          },
        ],
      })
      setNewHabit({ ...initialNewHabit, id: generateId() })
      setIsHabit(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newHabit,
    newHabitValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleDeleteHabit = useCallback(
    (id) => {
      let newHabits = [...(clientInfo.habits || [])]
      newHabits = newHabits.filter((habit) => habit.id !== id)
      setClientInfo({ ...clientInfo, habits: newHabits })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const newTestResultsValidation = useMemo(
    () => some(omit(newHabit, ['id', 'text']), isEmpty),
    [newHabit]
  )

  const handleNewTestResults = useCallback(() => {
    if (newTestResultsValidation) {
      setClientInfo({
        ...clientInfo,
        testResults: [...(clientInfo?.testResults || []), newTestResults],
      })
      setNewTestResults({ ...initialTestResults, id: generateId() })
      setIsTestResults(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newTestResults,
    newTestResultsValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleDeleteTestResults = useCallback(
    (id) => {
      let newResults = [...(clientInfo.testResults || [])]
      newResults = newResults.filter((testResults) => testResults.id !== id)
      setClientInfo({ ...clientInfo, testResults: newResults })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleTestResultsText = useCallback(
    (id) => (e) => {
      const newResults = [...(clientInfo.testResults || [])]
      const resultsToChange = newResults.find(
        (testResults) => testResults.id === id
      )
      if (resultsToChange) resultsToChange.text = e.target.value
      setClientInfo({ ...clientInfo, testResults: newResults })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const newRecommendValidation = useMemo(
    () => !some(omit(newRecommend, ['id', 'min']), isEmpty),
    [newRecommend]
  )

  const handleNewRecommend = useCallback(() => {
    if (newRecommendValidation) {
      setClientInfo({
        ...clientInfo,
        recommendations: [
          ...(clientInfo?.recommendations || []),
          {
            ...newRecommend,
            min: Number(newRecommend.min),
          },
        ],
      })
      setNewRecommend({ ...initialNewRecommend, id: generateId() })
      setIsRecommend(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newRecommend,
    newRecommendValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleDeleteRecommend = useCallback(
    (id) => {
      let newRecommends = [...(clientInfo.recommendations || [])]
      newRecommends = newRecommends.filter((recommend) => recommend.id !== id)
      setClientInfo({ ...clientInfo, recommendations: newRecommends })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  return (
    <div className="w-11/12 text-lg">
      <div className={titleStyle}>Planned check-ins</div>
      <div className="flex flex-row justify-between w-full gap-2">
        <div className={itemStyle}>
          <div className={labelStyle}>
            Planned weekly number of check-ins with coaches:
          </div>
          <div className="mb-1 text-base">Check-ins</div>
          <div className={smInputWrapperStyle}>
            <input
              type="number"
              className={smInputStyle}
              value={clientInfo?.checkinsPerWeek}
              min={0}
              onChange={(e) =>
                setClientInfo({
                  ...clientInfo,
                  checkinsPerWeek: e.target.value,
                })
              }
            />
            <div className={smInputTextStyle}>per week</div>
          </div>
        </div>
        <div className={itemStyle}>
          <div className={labelStyle}>
            Planned weekly number of check-ins with assistants:
          </div>
          <div className="mb-1 text-base">Check-ins</div>
          <div className={smInputWrapperStyle}>
            <input
              type="number"
              className={smInputStyle}
              value={clientInfo?.assistantCheckinsPerWeek}
              min={0}
              onChange={(e) =>
                setClientInfo({
                  ...clientInfo,
                  assistantCheckinsPerWeek: e.target.value,
                })
              }
            />
            <div className={smInputTextStyle}>per week</div>
          </div>
        </div>
      </div>

      <div className={titleStyle}>Test results</div>
      <div className={itemStyle}>
        {isTestResults && (
          <TestModal
            nameValue={newTestResults.name}
            nameOnChange={(e) =>
              setNewTestResults({ ...newTestResults, name: e.target.value })
            }
            onHandle={handleNewTestResults}
            onClose={() => setIsTestResults(false)}
            isError={isError}
          />
        )}
        <div className={labelStyle}>Current self-efficacy test result:</div>
        <div className="flex justify-between">
          <div>
            <div className="mb-1 text-base">Current result</div>
            <div className={smInputWrapperStyle}>
              <input
                type="number"
                className={smInputStyle}
                min={0}
                value={clientInfo?.selfEfficacy?.current}
                onChange={(e) =>
                  setClientInfo({
                    ...clientInfo,
                    selfEfficacy: {
                      ...clientInfo.selfEfficacy,
                      current: e.target.value,
                    },
                  })
                }
              />
              <div className={smInputTextStyle}>points</div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-base">Desired norm </div>
            <div className={smInputWrapperStyle}>
              <input
                type="number"
                className={smInputStyle}
                min={0}
                value={clientInfo?.selfEfficacy?.norm}
                onChange={(e) =>
                  setClientInfo({
                    ...clientInfo,
                    selfEfficacy: {
                      ...clientInfo.selfEfficacy,
                      norm: e.target.value,
                    },
                  })
                }
              />
              <div className={smInputTextStyle}>points</div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-base">Previous result</div>
            <div className={smInputWrapperStyle}>
              <input
                type="number"
                className={smInputStyle}
                value={clientInfo?.selfEfficacy?.previous}
                disabled
              />
              <div className={smInputTextStyle}>points</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {clientInfo.testResults &&
            clientInfo.testResults.map((testResults) => {
              return (
                <div key={testResults.id}>
                  <div className={habitTitleWrapperStyle}>
                    <div className="font-semibold">{testResults.name}</div>
                    <div>
                      <button
                        type="button"
                        className={removeBtnStyle}
                        onClick={() => handleDeleteTestResults(testResults.id)}>
                        <img src={Basket} alt="Basket" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-base">Current result</div>
                    <textarea
                      value={testResults.text}
                      onChange={handleTestResultsText(testResults.id)}
                      className={textareaStyle}
                    />
                  </div>
                </div>
              )
            })}
        </div>

        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsTestResults(true)}>
          Add new test
        </button>
      </div>

      <div className={`${itemStyle} mt-10`}>
        {isHabit && (
          <HabitModal
            nameValue={newHabit.name}
            repeatValue={newHabit.repeatability}
            limitValue={newHabit.limit}
            nameOnChange={(e) =>
              setNewHabit({ ...newHabit, name: e.target.value })
            }
            repeatOnChange={(e) =>
              setNewHabit({
                ...newHabit,
                repeatability: e.target.value,
              })
            }
            limitOnChange={(e) =>
              setNewHabit({ ...newHabit, limit: e.target.value })
            }
            onHandle={handleNewHabit}
            onClose={() => setIsHabit(false)}
            isError={isError}
          />
        )}
        <div className={`${labelStyle} text-xl`}>
          Habits to change or reduce:
        </div>
        <div className="flex flex-col gap-4">
          {clientInfo.habits &&
            clientInfo.habits.map((habit) => {
              return (
                <div key={habit.id}>
                  <div className={habitTitleWrapperStyle}>
                    <div className="font-semibold">{habit.name}</div>
                    <div>
                      <button
                        type="button"
                        className={removeBtnStyle}
                        onClick={() => handleDeleteHabit(habit.id)}>
                        <img src={Basket} alt="Basket" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-12">
                    <div>
                      <div className="mb-1 text-base">
                        Current repeatability
                      </div>
                      <div className={smInputWrapperStyle}>
                        <div className={smInputStyle}>
                          {habit.repeatability}
                        </div>
                        <div className={smInputTextStyle}>times per month</div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-base">Max limit</div>
                      <div className={smInputWrapperStyle}>
                        <div className={smInputStyle}>{habit.limit}</div>
                        <div className={smInputTextStyle}>times per month</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsHabit(true)}>
          Add new habit
        </button>
      </div>

      <div className={`${itemStyle} mt-10`}>
        {isRecommend && (
          <RecommendModal
            nameValue={newRecommend.name}
            minValue={newRecommend.min}
            nameOnChange={(e) =>
              setNewRecommend({ ...newRecommend, name: e.target.value })
            }
            minOnChange={(e) =>
              setNewRecommend({ ...newRecommend, min: e.target.value })
            }
            onHandle={handleNewRecommend}
            onClose={() => setIsRecommend(false)}
            isError={isError}
          />
        )}

        <div className={`${labelStyle} text-xl`}>
          Recommendations to follow:
        </div>

        <div className="flex flex-col gap-4">
          {clientInfo.recommendations &&
            clientInfo.recommendations.map((recommend) => {
              return (
                <div key={recommend.id}>
                  <div className={habitTitleWrapperStyle}>
                    <div className="font-semibold">{recommend.name}</div>
                    <div>
                      <button
                        type="button"
                        className={removeBtnStyle}
                        onClick={() => handleDeleteRecommend(recommend.id)}>
                        <img src={Basket} alt="Basket" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-base">Min norm</div>
                    <div className={smInputWrapperStyle}>
                      <div className={smInputStyle}>{recommend.min}</div>
                      <div className={smInputTextStyle}>repeats per month</div>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsRecommend(true)}>
          Add new recommendation
        </button>
      </div>

      <div className={`${itemStyle} mt-10`}>
        <div className={labelStyle}>Additional information:</div>
        <textarea
          className={`${textareaStyle} h-44`}
          placeholder="Additional information about the patient"
          value={clientInfo?.additionalInformation}
          onChange={handleAdditionalInfo}
        />
      </div>

      <div className={itemStyle}>
        <button type="submit" className={saveBtnStyle} onClick={handleSave}>
          SAVE
        </button>
      </div>
    </div>
  )
}

export default Attendance
