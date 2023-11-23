/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from 'store/chatStore/chat.store'
import statsStore from '../../../../../store/statsStore/stats.store'

import AddBtn from './components/add-btn'

import { sendValue } from '../../../StatsAddModal/StatsAddModal'
import { ETimeOfDay } from '../../../../../store/statsStore/stats.store.types'
import {
  inputStyle,
  inputWrapperStyle,
  titleStyle,
  wrapperStyle,
} from '../../styles'

interface StatNoDataProps {
  currentDate: string
  checkin: string
  selectedValue: string
  habitName?: string
  habitId?: string
  recommendationName?: string
  recommendationId?: string
  medicationName?: string
  medicationId?: string
  handleAddModal: (
    isShow: boolean,
    value: string,
    checkin: string,
    habitName?: string,
    habitId?: string,
    recommendationName?: string,
    recommendationId?: string,
    medicationName?: string,
    medicationId?: string
  ) => void
}

const StatNoData: React.FC<StatNoDataProps> = ({
  currentDate,
  checkin,
  selectedValue,
  habitName,
  habitId,
  recommendationName,
  recommendationId,
  medicationName,
  medicationId,
  handleAddModal,
}) => {
  const [isMarkNoData, setIsMarkNoData] = useState(false)

  const { id: kitId } = chatStore.currentChat.kit

  const handleNoData = (e) => {
    if (selectedValue === 'Blood pressure and Pulse') {
      statsStore.addCardio(
        ETimeOfDay.AFTERNOON,
        '120/80',
        0,
        currentDate,
        false,
        kitId,
        checkin,
        e.target.value
      )
      setIsMarkNoData(false)
    }

    if (selectedValue === 'Habits to change or reduce' && habitId) {
      statsStore.addHabit(
        habitId,
        0,
        currentDate,
        false,
        kitId,
        checkin,
        e.target.value
      )
      setIsMarkNoData(false)
    }

    if (selectedValue === 'Recommendations to follow' && recommendationId) {
      statsStore.addRecommendation(
        recommendationId,
        0,
        currentDate,
        false,
        kitId,
        checkin,
        e.target.value
      )
      setIsMarkNoData(false)
    }
    if (selectedValue === 'Medications' && medicationId) {
      statsStore.addDrug(
        '',
        kitId,
        currentDate,
        medicationId,
        checkin,
        false,
        e.target.value
      )
      setIsMarkNoData(false)
    } else {
      sendValue(
        selectedValue,
        currentDate,
        checkin,
        kitId,
        undefined,
        false,
        e.target.value
      )
      setIsMarkNoData(false)
    }
  }

  return (
    <div className="mt-2">
      {isMarkNoData ? (
        <div className={wrapperStyle}>
          <div className={inputWrapperStyle}>
            <input
              type="radio"
              name="radio-btn"
              className={inputStyle}
              value="Skipped coaching"
              onChange={handleNoData}
            />
            <div>Skipped coaching</div>
          </div>
          <div className={inputWrapperStyle}>
            <input
              type="radio"
              name="radio-btn"
              className={inputStyle}
              value="Missed measurements"
              onChange={handleNoData}
            />
            <div>Missed measurements</div>
          </div>
          {selectedValue === 'Blood pressure and Pulse' ||
          selectedValue === 'Weight' ? (
            <>
              <div className={inputWrapperStyle}>
                <input
                  type="radio"
                  name="radio-btn"
                  className={inputStyle}
                  value="Problems with devices"
                  onChange={handleNoData}
                />
                <div>Problems with devices</div>
              </div>
            </>
          ) : null}
        </div>
      ) : (
        <AddBtn
          handleAddModal={() =>
            handleAddModal(
              true,
              selectedValue,
              checkin,
              habitName,
              habitId,
              recommendationName,
              recommendationId,
              medicationName,
              medicationId
            )
          }
        />
      )}

      <div className={titleStyle}>
        <div className={inputWrapperStyle}>
          <input
            type="checkbox"
            className={`${inputStyle} cursor-pointer`}
            onChange={() => setIsMarkNoData(!isMarkNoData)}
            checked={isMarkNoData}
            id={
              (habitId && `${habitId}-${checkin}`) ||
              (recommendationId && `${recommendationId}-${checkin}`) ||
              (medicationId && `${medicationId}-${checkin}`) ||
              `${selectedValue}-${checkin}`
            }
          />
          <label
            htmlFor={
              (habitId && `${habitId}-${checkin}`) ||
              (recommendationId && `${recommendationId}-${checkin}`) ||
              (medicationId && `${medicationId}-${checkin}`) ||
              `${selectedValue}-${checkin}`
            }
            className="cursor-pointer">
            Mark as not received
          </label>
        </div>
      </div>
    </div>
  )
}

export default observer(StatNoData)
