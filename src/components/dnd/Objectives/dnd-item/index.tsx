/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from 'react'

import { KeyResultForSelectType } from '../../../../store/objectiveStore/objectives.store.types'
import Trash from '../../../../assets/trash.svg'

import {
  buttonStyle,
  checkinWrapperStyle,
  cursorPointerStyle,
  dragBtnPointStyle,
  dragBtnWrapperStyle,
  grayTextStyle,
  inputGroupWrapperStyle,
  inputStyle,
  labelStyle,
  radioWrapperStyle,
  selectBgStyle,
  selectStyle,
} from './styles'

type DraggableCheckinProp = {
  current: KeyResultForSelectType
  dragStartHandler: any
  dropHandler: any
  dragOverHandler?: any
  onDelete?: () => void
  optionsList: Array<string>
  allItems: Array<KeyResultForSelectType>
  setAllItems: (value: Array<KeyResultForSelectType>) => void
  itemId: string
}

const DndItem: React.FC<DraggableCheckinProp> = ({
  current,
  dragStartHandler,
  dropHandler,
  dragOverHandler,
  onDelete,
  optionsList,
  allItems,
  setAllItems,
  itemId,
}) => {
  const [isDragged, setIsDragged] = useState(false)

  const isBloodPressure = current.trackingParameter === 'Blood pressure'
  const isCheckinProblems = current.trackingParameter === 'Check-in problems'
  const isPatientReturn = current.trackingParameter === 'Patient return'
  const isHabits = current.trackingParameter === 'Repeatability of the habits'
  const isRecommendations =
    current.trackingParameter === 'Recommendations to follow'
  const isProblemsOrReturn = isCheckinProblems || isPatientReturn
  const isHabitsOrRecommendations = isHabits || isRecommendations

  const changed = allItems.find(
    (item) => JSON.stringify(item) === JSON.stringify(current)
  )

  const setKeyResults = () => {
    if (changed) {
      setAllItems([
        ...allItems.slice(0, current.order),
        changed,
        ...allItems.slice(current.order + 1),
      ])
    }
  }

  const selectChangeHandler = (e) => {
    const trackingParameter = e.target.value
    if (changed) {
      changed.trackingParameter = trackingParameter
      setKeyResults()
    }
  }

  const nameChangeHandler = (e) => {
    const name = e.target.value
    const re = /^[A-Za-z0-9 ]+$/
    if ((name === '' || re.test(name)) && changed) {
      changed.name = name
      setKeyResults()
    }
  }

  const valueChangeHandler = (e) => {
    if (changed) {
      changed.firstNormValue.value = e.target.value
      setKeyResults()
    }
  }

  const secondValueChangeHandler = (e) => {
    if (changed) {
      changed.secondNormValue = {
        value: e.target.value,
        percentage: current.secondNormValue?.percentage || false,
      }
      setKeyResults()
    }
  }

  const unitsChangeHandler = (e) => {
    const percentage = e.target.value === 'percentage'
    if (changed) {
      changed.firstNormValue.percentage = percentage
      setKeyResults()
    }
  }

  const secondUnitsChangeHandler = (e) => {
    const percentage = e.target.value === 'percentage'
    if (changed) {
      changed.secondNormValue = {
        value: current.secondNormValue?.value || 0,
        percentage,
      }
      setKeyResults()
    }
  }

  const onDragStart = () => {
    dragStartHandler(current)
    setIsDragged(true)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dragOverHandler) {
      dragOverHandler()
      setIsDragged(false)
    }
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropHandler(current)
    setIsDragged(false)
  }

  const draggedClassName = useMemo(
    () => (isDragged ? 'shadow-md' : ''),
    [isDragged]
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`${checkinWrapperStyle} ${draggedClassName}`}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable>
      <div className={dragBtnWrapperStyle}>
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
      </div>

      <div className="mt-2">
        <small className={grayTextStyle}>Key result name</small>
        <div className="flex justify-between items-center">
          <input
            className={`${inputStyle} font-medium px-2`}
            onChange={nameChangeHandler}
            value={current.name}
          />
          {onDelete && (
            <button className={buttonStyle} onClick={onDelete} type="button">
              <img src={Trash} alt="Trash" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <small className={grayTextStyle}>Tracking parameter</small>
        <select
          className={selectStyle}
          onChange={selectChangeHandler}
          style={selectBgStyle}
          value={current.trackingParameter}>
          {optionsList.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex mt-4">
        <div className="w-1/2 flex flex-col">
          <small className={grayTextStyle}>
            {isBloodPressure
              ? 'Monthly norm value (systolic)'
              : 'Monthly norm value'}
          </small>

          <div
            className={
              !isHabitsOrRecommendations && !isProblemsOrReturn
                ? inputGroupWrapperStyle
                : 'flex items-center mt-2 gap-4'
            }>
            <input
              type="number"
              value={current.firstNormValue.value}
              className={`${inputStyle} font-medium w-1/5 px-2`}
              onChange={valueChangeHandler}
            />

            {!isHabitsOrRecommendations && (
              <div className={radioWrapperStyle}>
                <input
                  type="radio"
                  checked={
                    isProblemsOrReturn
                      ? true
                      : !current.firstNormValue.percentage
                  }
                  onChange={unitsChangeHandler}
                  value="absolute"
                  className={cursorPointerStyle}
                  id={`${itemId}-absolute`}
                />
                <label htmlFor={`${itemId}-absolute`} className={labelStyle}>
                  Absolute values
                </label>
              </div>
            )}

            {!isProblemsOrReturn && (
              <div className={`${radioWrapperStyle} mr-4`}>
                <input
                  type="radio"
                  checked={
                    isHabitsOrRecommendations
                      ? true
                      : current.firstNormValue.percentage
                  }
                  onChange={unitsChangeHandler}
                  value="percentage"
                  id={`${itemId}-percentage`}
                  className={cursorPointerStyle}
                />
                <label htmlFor={`${itemId}-percentage`} className={labelStyle}>
                  Percentage
                </label>
              </div>
            )}
          </div>
        </div>

        {isBloodPressure && (
          <div className="w-1/2 flex flex-col">
            <small className={grayTextStyle}>
              Monthly norm value (diastolic)
            </small>

            <div className={inputGroupWrapperStyle}>
              <input
                type="number"
                value={current.secondNormValue?.value}
                className={`${inputStyle} font-medium w-1/5 px-2`}
                onChange={secondValueChangeHandler}
              />

              <div className={radioWrapperStyle}>
                <input
                  type="radio"
                  className={cursorPointerStyle}
                  checked={!current.secondNormValue?.percentage}
                  onChange={secondUnitsChangeHandler}
                  value="absolute"
                  id={`${itemId}-absolute-second`}
                />
                <label
                  htmlFor={`${itemId}-absolute-second`}
                  className={labelStyle}>
                  Absolute values
                </label>
              </div>

              <div className={`${radioWrapperStyle} mr-4`}>
                <input
                  type="radio"
                  className={cursorPointerStyle}
                  checked={current.secondNormValue?.percentage}
                  onChange={secondUnitsChangeHandler}
                  value="percentage"
                  id={`${itemId}-percentage-second`}
                />
                <label
                  htmlFor={`${itemId}-percentage-second`}
                  className={labelStyle}>
                  Percentage
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DndItem
