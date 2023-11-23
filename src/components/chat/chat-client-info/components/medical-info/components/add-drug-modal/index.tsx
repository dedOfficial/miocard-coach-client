import React, { useRef } from 'react'

import useCloseByClickOutside from '../../../../../../../hooks/useCloseByClickOutside'

import {
  overlayStyle,
  wrapperStyle,
  titleStyle,
  groupWrapperStyle,
  labelStyle,
  inputStyle,
  nameWrapperStyle,
  doseWrapperStyle,
  btnsWrapperStyle,
  addBtnStyle,
  cancelBtnStyle,
  errorStyle,
} from './styles'

interface DrugModalProps {
  groupValue: string
  nameValue: string
  doseValue: string
  timeValue: string
  groupOnChange: (e: any) => void
  nameOnChange: (e: any) => void
  doseOnChange: (e: any) => void
  timeOnChange: (e: any) => void
  onHandle: () => void
  onClose: () => void
  isError: boolean
}

const DrugModal: React.FC<DrugModalProps> = ({
  groupValue,
  nameValue,
  doseValue,
  timeValue,
  groupOnChange,
  nameOnChange,
  doseOnChange,
  timeOnChange,
  onHandle,
  onClose,
  isError,
}) => {
  const drugModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: drugModalRef,
    handler: () => onClose(),
  })

  return (
    <>
      <div className={overlayStyle} />
      <div className={wrapperStyle} ref={drugModalRef}>
        <div className={titleStyle}>Add new drug</div>
        <div className={groupWrapperStyle}>
          <div className={labelStyle}>Group*:</div>
          <input
            className={inputStyle}
            placeholder="Enter group"
            onChange={groupOnChange}
            value={groupValue}
          />
        </div>
        <div className="flex justify-between">
          <div className={nameWrapperStyle}>
            <div className={labelStyle}>Name*:</div>
            <input
              className={inputStyle}
              placeholder="Enter name"
              onChange={nameOnChange}
              value={nameValue}
            />
          </div>
          <div className={doseWrapperStyle}>
            <div className={labelStyle}>Dose*:</div>
            <input
              className={inputStyle}
              placeholder="Enter dose"
              onChange={doseOnChange}
              value={doseValue}
            />
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Time*:</div>
          <input
            className={inputStyle}
            placeholder="Enter time"
            onChange={timeOnChange}
            value={timeValue}
          />
        </div>

        {isError && (
          <div className={errorStyle}>
            You have not filled the required* fields
          </div>
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

export default DrugModal
