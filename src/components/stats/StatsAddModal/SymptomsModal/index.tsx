/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react'
import {
  statsAddModalCheckbox,
  statsAddModalCheckboxWrapper,
  statsAddModalNewCardiovascularInput,
  statsAddModalNewCardiovascularInputWrapper,
} from './styles'
import { initialCardiovascularSymptoms } from '../../../../store/statsStore/stats.store.types'

interface SymptomsModalProps {
  cardiovascularSymptomsToAdd: string[]
  setCardiovascularSymptomsToAdd: React.Dispatch<string[]>
  setNewCardiovascularSymptom: React.Dispatch<string>
  newCardiovascularSymptom: string
  setNewNonCardiovascularSymptom: React.Dispatch<string>
  newNonCardiovascularSymptom: string
  setIsSymptomsAbsent: React.Dispatch<(prev: boolean) => boolean>
  isSymptomsAbsent: boolean
}

const SymptomsModal: React.FC<SymptomsModalProps> = ({
  cardiovascularSymptomsToAdd,
  setCardiovascularSymptomsToAdd,
  setNewCardiovascularSymptom,
  newCardiovascularSymptom,
  setNewNonCardiovascularSymptom,
  newNonCardiovascularSymptom,
  setIsSymptomsAbsent,
  isSymptomsAbsent,
}) => {
  const [isShowCardiovascularSymptoms, setIsShowCardioVascularSymptoms] =
    useState<boolean>(false)
  const [isShowNonCardiovascularSymptoms, setIsShowNonCardiovascularSymptoms] =
    useState<boolean>(false)

  const handleAddCardiovascularSymptom = useCallback(
    (e) => {
      let newSymptoms = [...cardiovascularSymptomsToAdd, e.target.value]
      if (cardiovascularSymptomsToAdd.includes(e.target.value)) {
        newSymptoms = newSymptoms.filter(
          (symptom) => symptom !== e.target.value
        )
      }
      if (isSymptomsAbsent) {
        newSymptoms = []
      }
      setCardiovascularSymptomsToAdd(newSymptoms)
    },
    [
      cardiovascularSymptomsToAdd,
      isSymptomsAbsent,
      setCardiovascularSymptomsToAdd,
    ]
  )

  const handleAbsentSymptoms = useCallback(() => {
    setIsSymptomsAbsent((prev: boolean) => !prev)
    setCardiovascularSymptomsToAdd([])
  }, [setCardiovascularSymptomsToAdd, setIsSymptomsAbsent])

  useEffect(() => {
    if (cardiovascularSymptomsToAdd.length)
      setIsShowCardioVascularSymptoms(true)
    if (newNonCardiovascularSymptom !== '')
      setIsShowNonCardiovascularSymptoms(true)
  }, [cardiovascularSymptomsToAdd, newNonCardiovascularSymptom])

  const checked = useCallback(
    (symptom) => {
      return cardiovascularSymptomsToAdd.includes(symptom)
    },
    [cardiovascularSymptomsToAdd]
  )

  return (
    <div className="flex flex-col">
      <div className={statsAddModalCheckboxWrapper}>
        <input
          id="cardiovascular"
          type="checkbox"
          className={statsAddModalCheckbox}
          checked={isShowCardiovascularSymptoms}
          onChange={() =>
            setIsShowCardioVascularSymptoms(!isShowCardiovascularSymptoms)
          }
        />
        <label htmlFor="cardiovascular">Cardiovascular symptoms</label>
      </div>
      {isShowCardiovascularSymptoms ? (
        <>
          <div className="grid grid-cols-2 mt-1 mx-2 gap-x-2">
            {initialCardiovascularSymptoms.map((symptom) => (
              <div className={`${statsAddModalCheckboxWrapper}`} key={symptom}>
                <input
                  type="checkbox"
                  id={symptom}
                  className={statsAddModalCheckbox}
                  value={symptom}
                  checked={checked(symptom)}
                  onChange={handleAddCardiovascularSymptom}
                />
                <label htmlFor={symptom}>{symptom}</label>
              </div>
            ))}
          </div>
          <div className={statsAddModalNewCardiovascularInputWrapper}>
            <input
              type="text"
              placeholder="Additional symptom(s)"
              className={statsAddModalNewCardiovascularInput}
              value={newCardiovascularSymptom}
              onChange={(e) => setNewCardiovascularSymptom(e.target.value)}
            />
          </div>
        </>
      ) : null}
      <div className={statsAddModalCheckboxWrapper}>
        <input
          id="non-cardiovascular"
          type="checkbox"
          className={statsAddModalCheckbox}
          checked={isShowNonCardiovascularSymptoms}
          onChange={() =>
            setIsShowNonCardiovascularSymptoms(!isShowNonCardiovascularSymptoms)
          }
        />
        <label htmlFor="non-cardiovascular">Non-cardiovascular symptoms</label>
      </div>
      {isShowNonCardiovascularSymptoms ? (
        <div className={statsAddModalNewCardiovascularInputWrapper}>
          <input
            type="text"
            placeholder="Patient's symptom(s)"
            className={statsAddModalNewCardiovascularInput}
            value={newNonCardiovascularSymptom}
            onChange={(e) => setNewNonCardiovascularSymptom(e.target.value)}
          />
        </div>
      ) : null}
      <div className={statsAddModalCheckboxWrapper}>
        <input
          id="absent"
          type="checkbox"
          className={statsAddModalCheckbox}
          value="Symptoms are absent"
          checked={isSymptomsAbsent}
          onChange={handleAbsentSymptoms}
        />
        <label htmlFor="absent">Symptoms are absent</label>
      </div>
    </div>
  )
}

export default SymptomsModal
