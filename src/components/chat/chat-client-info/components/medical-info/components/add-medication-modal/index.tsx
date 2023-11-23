/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'
import {
  addBtnStyle,
  btnsWrapperStyle,
  cancelBtnStyle,
  errorStyle,
  groupWrapperStyle,
  inputStyle,
  labelStyle,
  nameWrapperStyle,
  overlayStyle,
  titleStyle,
  wrapperStyle,
} from '../add-drug-modal/styles'
import { textareaStyle } from '../../../add-option-modal/styles'
import { checkboxStyle } from '../../styles'

interface MedicationModalProps {
  nameValue?: string
  dosageValue?: string
  indicationsValue?: string
  frequencyValue?: {
    value: string
    additional: string
  }
  regularityValue?: {
    value: string
    additional: string
  }
  typeValue: string
  onClose: () => void
  onHandle: () => void
  onNameChange: (e: any) => void
  onDosageChange: (e: any) => void
  onIndicationsChange: (e: any) => void
  onFrequencyChange: (e: any) => void
  onFrequencyCheckChange: (e: any) => void
  onRegularityChange: (e: any) => void
  onRegularityCheckChange: (e: any) => void
  onTypeChange: (e: any) => void
  isError: boolean
}

const MedicationModal: React.FC<MedicationModalProps> = ({
  onClose,
  onHandle,
  nameValue,
  dosageValue,
  indicationsValue,
  regularityValue,
  frequencyValue,
  typeValue,
  onNameChange,
  onDosageChange,
  onIndicationsChange,
  onRegularityChange,
  onFrequencyChange,
  onFrequencyCheckChange,
  onTypeChange,
  onRegularityCheckChange,
  isError,
}) => {
  const medicationModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: medicationModalRef,
    handler: () => onClose(),
  })

  return (
    <>
      <div className={overlayStyle} />
      <div className={`${wrapperStyle} w-max`} ref={medicationModalRef}>
        <div className={titleStyle}>Add new mediaction</div>
        <div className={groupWrapperStyle}>
          <div className={labelStyle}>Medication name:</div>
          <input
            className={inputStyle}
            placeholder="Enter medication name"
            onChange={onNameChange}
            value={nameValue}
          />
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col justify-between gap-2">
            <div className={nameWrapperStyle}>
              <div className={labelStyle}>Type:</div>
              <div className="flex justify-between gap-2">
                <div className="flex justify-between items-center p-2 border-2">
                  <input
                    type="checkbox"
                    checked={typeValue === 'Cardiovascular drugs'}
                    className={checkboxStyle}
                    value="Cardiovascular drugs"
                    onChange={onTypeChange}
                  />
                  <label className="text-sm">Cardiovascular drugs</label>
                </div>
                <div className="flex justify-between items-center p-2 border-2">
                  <input
                    type="checkbox"
                    checked={typeValue === 'Other'}
                    className={checkboxStyle}
                    value="Other"
                    onChange={onTypeChange}
                  />
                  <label className="text-sm">Other</label>
                </div>
              </div>
            </div>
            <div className={nameWrapperStyle}>
              <div className={labelStyle}>Dosage:</div>
              <input
                className={inputStyle}
                placeholder="Enter dosage"
                onChange={onDosageChange}
                value={dosageValue}
              />
            </div>
          </div>
          <div className={nameWrapperStyle}>
            <div className={labelStyle}>Regularity:</div>
            <div className="flex justify-between gap-2 pb-2">
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={regularityValue?.value === 'Regular basis'}
                  className={checkboxStyle}
                  value="Regular basis"
                  onChange={onRegularityCheckChange}
                />
                <label className="text-sm">Regular basis</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={regularityValue?.value === 'Periods'}
                  className={checkboxStyle}
                  value="Periods"
                  onChange={onRegularityCheckChange}
                />
                <label className="text-sm">Periods</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={regularityValue?.value === 'One-times'}
                  className={checkboxStyle}
                  value="One-times"
                  onChange={onRegularityCheckChange}
                />
                <label className="text-sm">One-times</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={regularityValue?.value === 'Other'}
                  className={checkboxStyle}
                  value="Other"
                  onChange={onRegularityCheckChange}
                />
                <label className="text-sm">Other</label>
              </div>
            </div>
            <textarea
              className={`${textareaStyle}`}
              placeholder="Additional information"
              onChange={onRegularityChange}
              value={regularityValue?.additional}
              disabled={regularityValue?.value !== 'Other'}
            />
          </div>
        </div>
        <div className="flex justify-between gap-2 flex-grow">
          <div className={`${nameWrapperStyle} w-1/2`}>
            <div className={labelStyle}>Indications:</div>
            <textarea
              className={textareaStyle}
              placeholder="Why the patient is taking these drugs"
              value={indicationsValue}
              onChange={onIndicationsChange}
            />
          </div>
          <div className={`${nameWrapperStyle} w-3/4`}>
            <div className={labelStyle}>Medication Frequency:</div>
            <div className="flex justify-between gap-2 pb-2">
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={frequencyValue?.value === 'Morning'}
                  className={checkboxStyle}
                  value="Morning"
                  onChange={onFrequencyCheckChange}
                />
                <label className="text-sm">Morning</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={frequencyValue?.value === 'Evening'}
                  className={checkboxStyle}
                  value="Evening"
                  onChange={onFrequencyCheckChange}
                />
                <label className="text-sm">Evening</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={frequencyValue?.value === 'Two times a day'}
                  className={checkboxStyle}
                  value="Two times a day"
                  onChange={onFrequencyCheckChange}
                />
                <label className="text-sm">Two times a day</label>
              </div>
              <div className="flex justify-between items-center p-2 border-2">
                <input
                  type="checkbox"
                  checked={frequencyValue?.value === 'Other'}
                  className={checkboxStyle}
                  value="Other"
                  onChange={onFrequencyCheckChange}
                />
                <label className="text-sm">Other</label>
              </div>
            </div>
            <textarea
              className={textareaStyle}
              placeholder="Additional information"
              value={frequencyValue?.additional}
              disabled={frequencyValue?.value !== 'Other'}
              onChange={onFrequencyChange}
            />
          </div>
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

export default MedicationModal
