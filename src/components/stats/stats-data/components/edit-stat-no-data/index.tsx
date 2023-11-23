/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from '../../../../../store/chatStore/chat.store'
import {
  CardioType,
  DrugType,
  HabitType,
  RecommendationType,
  MealType,
  MoodType,
  NotesType,
  SymptomType,
  WalkedDistanceType,
  WeightType,
  ETimeOfDay,
} from '../../../../../store/statsStore/stats.store.types'
import AddBtn from '../stat-no-data/components/add-btn'
import statsStore from '../../../../../store/statsStore/stats.store'

import {
  inputStyle,
  inputWrapperStyle,
  titleStyle,
  wrapperStyle,
} from '../../styles'

interface EditStatNoDataProps {
  id: string
  element:
    | CardioType
    | WeightType
    | MealType
    | HabitType
    | RecommendationType
    | DrugType
    | SymptomType
    | MoodType
    | NotesType
    | WalkedDistanceType
  type: string
  storeStatsType: string
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

const EditStatNoData: React.FC<EditStatNoDataProps> = ({
  id,
  element,
  type,
  storeStatsType,
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
  const { id: kitId } = chatStore.currentChat.kit
  const { clientNumber } = chatStore.currentChat
  const [isMarkNoData, setIsMarkNoData] = useState(false)

  useEffect(() => {
    if (element.notReceivedReason) {
      setIsMarkNoData(true)
    }
  }, [element.notReceivedReason])

  const isRadioSelected = (value: string) => element.notReceivedReason === value

  const removeStatsData = async (idStat) => {
    await statsStore.deleteStat(
      idStat,
      kitId,
      clientNumber,
      storeStatsType,
      element.day,
      type,
      element.checkin
    )
  }

  const handleNoData = async (e) => {
    if (selectedValue === 'Blood pressure and Pulse') {
      await statsStore.editCardio(
        '120/80',
        '0',
        id,
        ETimeOfDay.AFTERNOON,
        false,
        e.target.value
      )
    }
    if (selectedValue === 'Habits to change or reduce') {
      await statsStore.editHabit(0, id, false, e.target.value)
    }
    if (selectedValue === 'Recommendations to follow') {
      await statsStore.editRecommendation(0, id, false, e.target.value)
    }
    if (selectedValue === 'Medications') {
      await statsStore.editDrug('', id, false, e.target.value)
    }
    if (
      selectedValue === 'Notes' ||
      selectedValue === 'Mood' ||
      selectedValue === 'Meals' ||
      selectedValue === 'Weight' ||
      selectedValue === 'Walked Distance'
    ) {
      await statsStore.editStat(
        selectedValue === 'Weight' || selectedValue === 'Walked Distance'
          ? 0
          : '',
        storeStatsType,
        type,
        id,
        false,
        e.target.value
      )
    }
    if (selectedValue === 'Symptoms') {
      await statsStore.editSymptom(
        { cardiovascular: [], nonCardiovascular: '', isAbsent: false },
        id,
        false,
        e.target.value
      )
    }
  }

  return (
    <div className="mt-2">
      {isMarkNoData ? (
        <div className={wrapperStyle}>
          <div className={inputWrapperStyle}>
            <input
              type="radio"
              className={inputStyle}
              value="Skipped coaching"
              onChange={handleNoData}
              checked={isRadioSelected('Skipped coaching')}
            />
            <div>Skipped coaching</div>
          </div>

          <div className={inputWrapperStyle}>
            <input
              type="radio"
              className={inputStyle}
              value="Missed measurements"
              onChange={handleNoData}
              checked={isRadioSelected('Missed measurements')}
            />
            <div>Missed measurements</div>
          </div>
          {selectedValue === 'Blood pressure and Pulse' ||
          selectedValue === 'Weight' ? (
            <div className={inputWrapperStyle}>
              <input
                type="radio"
                className={inputStyle}
                value="Problems with devices"
                onChange={handleNoData}
                checked={isRadioSelected('Problems with devices')}
              />
              <div>Problems with devices</div>
            </div>
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
            id={id}
            type="checkbox"
            className={`${inputStyle} cursor-pointer`}
            onClick={isMarkNoData ? () => removeStatsData(id) : () => null}
            onChange={() => setIsMarkNoData(!isMarkNoData)}
            checked={isMarkNoData}
          />
          <label htmlFor={id} className="cursor-pointer">
            Mark as not received
          </label>
        </div>
      </div>
    </div>
  )
}

export default observer(EditStatNoData)
