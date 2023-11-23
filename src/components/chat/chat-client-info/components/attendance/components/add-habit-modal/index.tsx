import React, { useRef } from 'react'

import useCloseByClickOutside from '../../../../../../../hooks/useCloseByClickOutside'

import {
  overlayStyle,
  wrapperStyle,
  titleStyle,
  labelStyle,
  btnsWrapperStyle,
  addBtnStyle,
  cancelBtnStyle,
  inputStyle,
  errorStyle,
} from './styles'

interface HabitModalProps {
  nameValue: string
  repeatValue: number | string
  limitValue: number | string
  nameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  repeatOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  limitOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onHandle: () => void
  onClose: () => void
  isError: boolean
}

const HabitModal: React.FC<HabitModalProps> = ({
  nameValue,
  repeatValue,
  limitValue,
  nameOnChange,
  repeatOnChange,
  limitOnChange,
  onHandle,
  onClose,
  isError,
}) => {
  const habitModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: habitModalRef,
    handler: () => onClose(),
  })

  return (
    <>
      <div className={overlayStyle} />
      <div className={wrapperStyle} ref={habitModalRef}>
        <div className={titleStyle}>Add new habit</div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Habit name*:</div>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter habit name"
            onChange={nameOnChange}
            value={nameValue}
          />
        </div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Repeatability:</div>
          <div className="flex items-center w-full">
            <input
              type="number"
              className={`${inputStyle} w-28`}
              placeholder="Value"
              onChange={repeatOnChange}
              value={repeatValue}
              min={0}
            />
            <div className="text-sm ml-2.5">times per month</div>
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Max limit:</div>
          <div className="flex items-center w-full">
            <input
              type="number"
              className={`${inputStyle} w-28`}
              placeholder="Value"
              onChange={limitOnChange}
              value={limitValue}
              min={0}
            />
            <div className="text-sm ml-2.5">times per month</div>
          </div>
        </div>

        {isError && (
          <div className={errorStyle}>You have not filled the habit name</div>
        )}

        <div className={btnsWrapperStyle}>
          <button className={addBtnStyle} type="button" onClick={onHandle}>
            ADD
          </button>
          <button className={cancelBtnStyle} type="button" onClick={onClose}>
            CANCEL
          </button>
        </div>
      </div>
    </>
  )
}

export default HabitModal
