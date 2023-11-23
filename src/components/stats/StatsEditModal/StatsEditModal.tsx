/* eslint-disable no-underscore-dangle */
import React, { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import CloseIcon from '../../../assets/close.svg'
import statsStore from '../../../store/statsStore/stats.store'
import {
  ETimeOfDay,
  initialCardiovascularSymptoms,
} from '../../../store/statsStore/stats.store.types'
import SymptomsModal from '../StatsAddModal/SymptomsModal'

import {
  statsEditModalSaveBtn,
  statsEditModalOverlay,
  statsEditModalWrapper,
  statsEditModalCloseBtn,
  statsEditModalInput,
  statsEditModalTitle,
  statsEditModalInputWrapper,
  statsEditModalInputLabel,
  statsEditModalSmallInput,
} from './StatsEditModal.styled'
import {
  statsAddModalSelect,
  statsAddModalSelectBg,
} from '../StatsAddModal/StatsAddModal.styled'

interface StatsEditModalprops {
  editStatsModalRef
  handleEditModal
  editValue
  setEditValue
}

const StatsEditModal: FC<StatsEditModalprops> = ({
  editStatsModalRef,
  handleEditModal,
  editValue,
  setEditValue,
}) => {
  const [newNonCardiovascularSymptom, setNewNonCardiovascularSymptom] =
    useState<string>('')
  const [newCardiovascularSymptom, setNewCardiovascularSymptom] =
    useState<string>('')
  const [cardiovascularSymptomsToAdd, setCardiovascularSymptomsToAdd] =
    useState<string[]>([])
  const [isSymptomsAbsent, setIsSymptomsAbsent] = useState<boolean>(false)

  useEffect(() => {
    if (editValue.type === 'symptom') {
      setCardiovascularSymptomsToAdd(
        editValue.symptom.cardiovascular.filter((x) =>
          initialCardiovascularSymptoms.includes(x)
        )
      )
      setNewCardiovascularSymptom(
        editValue.symptom.cardiovascular
          .filter((x) => !initialCardiovascularSymptoms.includes(x))
          .join()
      )
      setNewNonCardiovascularSymptom(editValue.symptom.nonCardiovascular)
      setIsSymptomsAbsent(editValue.symptom.isAbsent)
    }
  }, [editValue])

  const submitStatsData = useCallback(() => {
    const value = editValue[editValue.type]
    const { storeStatsType, type } = editValue
    const id = editValue._id
    const pressureValue = editValue.pressure
    const pulseValue = editValue.pulse
    const timeOfDayValue = editValue.timeOfDay
    if (editValue.type === 'cardio') {
      statsStore.editCardio(pressureValue, pulseValue, id, timeOfDayValue, true)
    } else if (editValue.type === 'habit') {
      statsStore.editHabit(Number(editValue.repeatability), id, true)
    } else if (editValue.type === 'recommendation') {
      statsStore.editRecommendation(Number(editValue.repeatability), id, true)
    } else if (editValue.type === 'drug') {
      statsStore.editDrug(editValue.drug, id, true)
    } else if (editValue.type === 'symptom') {
      const cardiovascularArray = newCardiovascularSymptom
        ? [...cardiovascularSymptomsToAdd, newCardiovascularSymptom]
        : [...cardiovascularSymptomsToAdd]
      statsStore.editSymptom(
        {
          cardiovascular: isSymptomsAbsent ? [] : [...cardiovascularArray],
          nonCardiovascular: isSymptomsAbsent
            ? ''
            : newNonCardiovascularSymptom,
          isAbsent: isSymptomsAbsent,
        },
        id,
        true
      )
    } else if (value.length) {
      statsStore.editStat(
        editValue.type === 'weight' || editValue.type === 'walkedDistance'
          ? Number(value)
          : value,
        storeStatsType,
        type,
        id,
        true
      )
    }
    handleEditModal(false, undefined)
  }, [
    cardiovascularSymptomsToAdd,
    editValue,
    handleEditModal,
    isSymptomsAbsent,
    newCardiovascularSymptom,
    newNonCardiovascularSymptom,
  ])

  return (
    <>
      <div className={statsEditModalOverlay} />

      <div
        className={`transform ${statsEditModalWrapper}`}
        ref={editStatsModalRef}>
        <div className={statsEditModalCloseBtn}>
          <button
            type="button"
            onClick={() => handleEditModal(false, undefined)}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <div className={statsEditModalTitle}>{editValue?.title}</div>
        {editValue.type === 'cardio' ? (
          <>
            <div className={statsEditModalInputWrapper}>
              <select
                className={statsAddModalSelect}
                style={statsAddModalSelectBg}
                name="timeOfDay"
                id="timeOfDay"
                defaultValue={editValue.timeOfDay}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    timeOfDay: e.target.value as ETimeOfDay,
                  })
                }>
                <option value={ETimeOfDay.MORNING}>Morning</option>
                <option value={ETimeOfDay.AFTERNOON}>Afternoon</option>
                <option value={ETimeOfDay.EVENING}>Evening</option>
                <option value={ETimeOfDay.NIGHT}>Night</option>
              </select>
            </div>
            <div className={statsEditModalInputWrapper}>
              <div className={statsEditModalInputLabel}>Pulse</div>
              <input
                type="text"
                placeholder="Enter client value"
                className={statsEditModalSmallInput}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    pulse: e.target.value,
                  })
                }
                value={editValue.pulse}
              />
            </div>
            <div className={statsEditModalInputWrapper}>
              <div className={statsEditModalInputLabel}>Pressure</div>
              <input
                type="text"
                placeholder="Enter client value"
                className={statsEditModalSmallInput}
                onChange={(e) =>
                  setEditValue({
                    ...editValue,
                    pressure: e.target.value,
                  })
                }
                value={editValue.pressure}
              />
            </div>
          </>
        ) : null}

        {editValue.type === 'habit' || editValue.type === 'recommendation' ? (
          <input
            type="text"
            placeholder="Enter client value"
            className={statsEditModalInput}
            onChange={(e) =>
              setEditValue({
                ...editValue,
                repeatability: e.target.value,
              })
            }
            value={editValue.repeatability}
          />
        ) : null}

        {editValue.type === 'symptom' ? (
          <SymptomsModal
            cardiovascularSymptomsToAdd={cardiovascularSymptomsToAdd}
            setCardiovascularSymptomsToAdd={setCardiovascularSymptomsToAdd}
            setIsSymptomsAbsent={setIsSymptomsAbsent}
            isSymptomsAbsent={isSymptomsAbsent}
            setNewCardiovascularSymptom={setNewCardiovascularSymptom}
            newCardiovascularSymptom={newCardiovascularSymptom}
            setNewNonCardiovascularSymptom={setNewNonCardiovascularSymptom}
            newNonCardiovascularSymptom={newNonCardiovascularSymptom}
          />
        ) : null}

        {editValue.type === 'mood' && (
          <>
            <select
              className={statsAddModalSelect}
              style={statsAddModalSelectBg}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [editValue.type]: e.target.value,
                })
              }
              value={editValue[editValue.type]}>
              <option value="Good mood">{'\u{1F603}'} Good mood</option>
              <option value="Neutral mood">{'\u{1F612}'} Neutral mood</option>
              <option value="Bad mood">{'\u{1F641}'} Bad mood</option>
            </select>
          </>
        )}

        {editValue.type === 'drug' && (
          <>
            <select
              className={statsAddModalSelect}
              style={statsAddModalSelectBg}
              onChange={(e) =>
                setEditValue({
                  ...editValue,
                  [editValue.type]: e.target.value,
                })
              }
              value={editValue[editValue.type]}>
              <option value="Taken">Taken</option>
              <option value="Not taken">Not taken</option>
            </select>
          </>
        )}

        {editValue.type === 'weight' ||
        editValue.type === 'food' ||
        editValue.type === 'note' ||
        editValue.type === 'walkedDistance' ? (
          <input
            type="text"
            placeholder="Enter client value"
            className={statsEditModalInput}
            onChange={(e) =>
              setEditValue({
                ...editValue,
                [editValue.type]: e.target.value,
              })
            }
            value={editValue[editValue.type]}
          />
        ) : null}

        <button
          className={statsEditModalSaveBtn}
          type="button"
          onClick={submitStatsData}>
          SAVE
        </button>
      </div>
    </>
  )
}

export default observer(StatsEditModal)
