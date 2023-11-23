/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite'
import React, { FC, useState, useCallback, useEffect, useMemo } from 'react'

import chatStore from 'store/chatStore/chat.store'
import moment from 'moment'
import statsStore from '../../../store/statsStore/stats.store'
import CloseIcon from '../../../assets/close.svg'
import {
  SelectedHabitType,
  SelectedMedicationType,
  SelectedRecommendationType,
} from '../../../routes/stats-route/constants'
import useTimeout from '../../../hooks/useTimeout'
import SymptomsModal from './SymptomsModal'
import { ETimeOfDay } from '../../../store/statsStore/stats.store.types'

import {
  statsAddModalOverlay,
  statsAddModalWrapper,
  statsAddModalCloseBtnWrapper,
  statsAddModalAddBtn,
  statsAddModalSelect,
  statsAddModalSelectBg,
  statsAddModalInput,
  styledModalInputWrapper,
  styledModalInputLabel,
  styledModalInput,
  statsAddModalErrorStyle,
  smallInputStyle,
} from './StatsAddModal.styled'

export const sendValue = (
  title: string,
  date: string,
  checkin: string,
  kitId: string,
  value?: string,
  isReceived?: boolean,
  notReceivedReason?: string
): void => {
  if (title === 'Notes') {
    statsStore.addNotes(
      value || '',
      kitId,
      date,
      checkin,
      isReceived,
      notReceivedReason
    )
  } else if (title === 'Mood') {
    statsStore.addMood(
      value || '',
      kitId,
      date,
      checkin,
      isReceived,
      notReceivedReason
    )
  } else if (title === 'Meals') {
    if (
      (value &&
        value.toLowerCase() !== value.toUpperCase() &&
        value.length > 1) ||
      value === undefined
    ) {
      statsStore.addFood(
        value || '',
        kitId,
        date,
        checkin,
        isReceived,
        notReceivedReason
      )
    }
  } else if (title === 'Weight') {
    statsStore.addWeight(
      Number(value) || 0,
      kitId,
      date,
      checkin,
      isReceived,
      notReceivedReason
    )
  } else if (title === 'Walked Distance') {
    statsStore.addWalkedDistance(
      Number(value) || 0,
      kitId,
      date,
      checkin,
      isReceived,
      notReceivedReason
    )
  } else if (title === 'Symptoms') {
    statsStore.addSymptom(
      { cardiovascular: [], nonCardiovascular: '', isAbsent: false },
      kitId,
      date,
      checkin,
      isReceived,
      notReceivedReason
    )
  }
}

interface StatsAddModalProps {
  error: string
  isError: boolean
  setError: (value: string) => void
  isSetError: (value: boolean) => void
  addStatsModalRef
  handleAddModal: (isShow: boolean, value?: string, checkin?: string) => void
  selectedCheckin: string
  selectedValue: string
  selectedHabit: SelectedHabitType
  selectedRecommendation: SelectedRecommendationType
  selectedMedication: SelectedMedicationType
  currentDate: string
}

const StatsAddModal: FC<StatsAddModalProps> = ({
  error,
  setError,
  isSetError,
  isError,
  addStatsModalRef,
  handleAddModal,
  selectedCheckin,
  selectedValue,
  selectedHabit,
  selectedRecommendation,
  selectedMedication,
  currentDate,
}) => {
  const { id: kitId } = chatStore.currentChat.kit

  const [widgetValues, setWidgetsValue] = useState({
    value: '',
  })
  const [widgetPressurePulseValue, setWidgetPressurePulseValue] = useState<{
    bloodPressure: string
    pulse: string
    timeOfDay: ETimeOfDay | ''
  }>({
    bloodPressure: '',
    pulse: '',
    timeOfDay: '',
  })
  const theCurrentDate = useMemo(
    () => moment(currentDate, 'DD-MM-YYYY').format('MMMM Do'),
    [currentDate]
  )

  const runWithDelay = useTimeout(() => isSetError(false))

  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')

  const [newNonCardiovascularSymptom, setNewNonCardiovascularSymptom] =
    useState('')
  const [newCardiovascularSymptom, setNewCardiovascularSymptom] = useState('')
  const [cardiovascularSymptomsToAdd, setCardiovascularSymptomsToAdd] =
    useState<string[]>([])
  const [isSymptomsAbsent, setIsSymptomsAbsent] = useState(false)

  const title = useMemo(() => {
    if (selectedValue === 'Habits to change or reduce') {
      return selectedHabit.name
    }
    if (selectedValue === 'Recommendations to follow') {
      return selectedRecommendation.name
    }
    if (selectedValue === 'Medications') {
      return selectedMedication.name
    }
    return selectedValue
  }, [
    selectedHabit.name,
    selectedMedication.name,
    selectedRecommendation.name,
    selectedValue,
  ])

  const addValue = useCallback(
    (fieldName: string, value: string) => {
      if (selectedValue === 'Weight' || selectedValue === 'Walked Distance') {
        const regExp = /^[1-9][0-9]*$/
        if (regExp.test(value) && Number(value) > 0) {
          setWidgetsValue({
            ...widgetValues,
            [fieldName]: value,
          })
        }
      } else {
        setWidgetsValue({
          ...widgetValues,
          [fieldName]: value,
        })
      }
    },
    [selectedValue, widgetValues]
  )

  const handleChangePulse = (value) => {
    if (value === '') {
      setWidgetPressurePulseValue({
        ...widgetPressurePulseValue,
        pulse: value,
      })
    }
    if (/^[1-9]\d*$/gm.test(value)) {
      setWidgetPressurePulseValue({
        ...widgetPressurePulseValue,
        pulse: value,
      })
    }
  }

  const handleChangeDiastolic = (value) => {
    setDiastolic(value)
    setWidgetPressurePulseValue({
      ...widgetPressurePulseValue,
      bloodPressure: `${systolic}/${value}`,
    })
  }

  const handleChangeSystolic = (value) => {
    setSystolic(value)
    setWidgetPressurePulseValue({
      ...widgetPressurePulseValue,
      bloodPressure: `${value}/${diastolic}`,
    })
  }

  const sendValues = useCallback(
    async (currentValue: string) => {
      if (currentValue === 'Blood pressure and Pulse') {
        const copyPressure = JSON.parse(
          JSON.stringify(widgetPressurePulseValue.bloodPressure)
        )
          .split('/')
          .join('')

        if (
          widgetPressurePulseValue.bloodPressure.length > 4 &&
          widgetPressurePulseValue.pulse &&
          widgetPressurePulseValue.timeOfDay.length > 1 &&
          /^[0-9]+$/.test(copyPressure)
        ) {
          statsStore.addCardio(
            widgetPressurePulseValue.timeOfDay as ETimeOfDay,
            widgetPressurePulseValue.bloodPressure,
            Number(widgetPressurePulseValue.pulse),
            currentDate,
            true,
            kitId,
            selectedCheckin
          )
          handleAddModal(false, '', '')
          setWidgetPressurePulseValue({
            bloodPressure: '',
            pulse: '',
            timeOfDay: '',
          })
        } else {
          setError(
            'Fill in the required fields.\n' +
              'Also the pressure must be a number\n'
          )
          isSetError(true)
          runWithDelay()
        }
      } else if (
        currentValue === 'Habits to change or reduce' &&
        selectedHabit.id
      ) {
        const regCheckForNumbers = new RegExp(/^[0-9]+$/)
        if (regCheckForNumbers.test(widgetValues.value)) {
          statsStore.addHabit(
            selectedHabit.id,
            Number(widgetValues.value),
            currentDate,
            true,
            kitId,
            selectedCheckin
          )
          handleAddModal(false, '', '')
        } else {
          setError('the specified value must be a number')
          isSetError(true)
          runWithDelay()
        }
      } else if (
        currentValue === 'Recommendations to follow' &&
        selectedRecommendation.id
      ) {
        const regCheckForNumbers = new RegExp(/^[0-9]+$/)
        if (regCheckForNumbers.test(widgetValues.value)) {
          statsStore.addRecommendation(
            selectedRecommendation.id,
            Number(widgetValues.value),
            currentDate,
            true,
            kitId,
            selectedCheckin
          )
          handleAddModal(false, '', '')
        } else {
          setError('the specified value must be a number')
          isSetError(true)
          runWithDelay()
        }
      } else if (currentValue === 'Medications') {
        statsStore.addDrug(
          widgetValues.value,
          kitId,
          currentDate,
          selectedMedication.id,
          selectedCheckin,
          true
        )
        handleAddModal(false, '', '')
      } else if (
        currentValue === 'Symptoms' &&
        (cardiovascularSymptomsToAdd.length !== 0 ||
          !!newCardiovascularSymptom ||
          !!newNonCardiovascularSymptom ||
          isSymptomsAbsent)
      ) {
        const cardiovascularArray = newCardiovascularSymptom
          ? [...cardiovascularSymptomsToAdd, newCardiovascularSymptom]
          : [...cardiovascularSymptomsToAdd]
        statsStore.addSymptom(
          {
            cardiovascular: isSymptomsAbsent ? [] : [...cardiovascularArray],
            nonCardiovascular: isSymptomsAbsent
              ? ''
              : newNonCardiovascularSymptom,
            isAbsent: isSymptomsAbsent,
          },
          kitId,
          currentDate,
          selectedCheckin,
          true
        )
        handleAddModal(false, '', '')
      } else {
        sendValue(
          currentValue,
          currentDate,
          selectedCheckin,
          kitId,
          widgetValues.value
        )
        handleAddModal(false, '', '')
      }
    },
    [
      selectedHabit.id,
      selectedRecommendation.id,
      cardiovascularSymptomsToAdd,
      newCardiovascularSymptom,
      newNonCardiovascularSymptom,
      isSymptomsAbsent,
      widgetPressurePulseValue.bloodPressure,
      widgetPressurePulseValue.pulse,
      widgetPressurePulseValue.timeOfDay,
      currentDate,
      kitId,
      selectedCheckin,
      handleAddModal,
      setError,
      isSetError,
      runWithDelay,
      widgetValues.value,
      selectedMedication.id,
    ]
  )

  useEffect(() => {
    return () =>
      setWidgetsValue({
        value: '',
      })
  }, [])

  return (
    <>
      <div className={statsAddModalOverlay} />
      <div
        className={`transform ${statsAddModalWrapper}`}
        ref={addStatsModalRef}>
        <div className={statsAddModalCloseBtnWrapper}>
          <button type="button" onClick={() => handleAddModal(false, '', '')}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <div className="font-semibold text-lg">{title}</div>
        {selectedValue === 'Mood' ? (
          <select
            className={statsAddModalSelect}
            style={statsAddModalSelectBg}
            onChange={(e) => addValue('value', e.target.value)}>
            <option selected disabled>
              Choose mood
            </option>
            <option value="Good mood">{'\u{1F603}'} Good mood</option>
            <option value="Neutral mood">{'\u{1F612}'} Neutral mood</option>
            <option value="Bad mood">{'\u{1F641}'} Bad mood</option>
          </select>
        ) : null}

        {selectedValue === 'Blood pressure and Pulse' ? (
          <>
            <div className={styledModalInputWrapper}>
              <select
                className={statsAddModalSelect}
                style={statsAddModalSelectBg}
                name="timeOfDay"
                id="timeOfDay"
                defaultValue="default"
                onChange={(e) =>
                  setWidgetPressurePulseValue({
                    ...widgetPressurePulseValue,
                    timeOfDay: e.target.value as ETimeOfDay,
                  })
                }>
                <option value="default" disabled hidden>
                  Choose time of the day
                </option>
                <option value={ETimeOfDay.MORNING}>Morning</option>
                <option value={ETimeOfDay.AFTERNOON}>Afternoon</option>
                <option value={ETimeOfDay.EVENING}>Evening</option>
                <option value={ETimeOfDay.NIGHT}>Night</option>
              </select>
            </div>
            <div className={styledModalInputWrapper}>
              <div className={styledModalInputLabel}>Pressure</div>
              <div className="flex items-center w-2/3">
                <input
                  type="text"
                  className={`${smallInputStyle}`}
                  placeholder="Systolic"
                  value={systolic}
                  title="The Pressure should be in a similar format as 120/80."
                  onChange={(e) => handleChangeSystolic(e.target.value)}
                />
                <div className="text-center text-2xl pt-3 px-1">/</div>
                <input
                  type="text"
                  className={`${smallInputStyle}`}
                  placeholder="Diastolic"
                  value={diastolic}
                  title="The Pressure should be in a similar format as 120/80."
                  onChange={(e) => handleChangeDiastolic(e.target.value)}
                />
              </div>
            </div>
            <div className={styledModalInputWrapper}>
              <div className={styledModalInputLabel}>Pulse</div>
              <input
                type="text"
                className={styledModalInput}
                placeholder="Enter client pulse"
                value={widgetPressurePulseValue.pulse}
                onChange={(e) => handleChangePulse(e.target.value)}
              />
            </div>
          </>
        ) : null}

        {selectedValue === 'Medications' ? (
          <select
            className={statsAddModalSelect}
            style={statsAddModalSelectBg}
            onChange={(e) => addValue('value', e.target.value)}>
            <option selected disabled>
              Choose taken/not taken
            </option>
            <option value="Taken">Taken</option>
            <option value="Not taken">Not taken</option>
          </select>
        ) : null}

        {selectedValue === 'Symptoms' ? (
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

        {selectedValue === 'Weight' ||
        selectedValue === 'Meals' ||
        selectedValue === 'Notes' ||
        selectedValue === 'Walked Distance' ||
        selectedValue === 'Habits to change or reduce' ||
        selectedValue === 'Recommendations to follow' ? (
          <input
            type="text"
            placeholder="Enter client value"
            className={statsAddModalInput}
            onChange={(e) => addValue('value', e.target.value)}
            value={widgetValues.value}
          />
        ) : null}
        <input
          type="text"
          className={statsAddModalInput}
          value={theCurrentDate}
          readOnly
        />
        {isError && <p className={statsAddModalErrorStyle}>{error}</p>}
        <button
          className={statsAddModalAddBtn}
          type="button"
          onClick={() => sendValues(selectedValue)}>
          ADD
        </button>
      </div>
    </>
  )
}

export default observer(StatsAddModal)
