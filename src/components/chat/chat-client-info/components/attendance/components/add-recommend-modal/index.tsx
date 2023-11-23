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

interface RecommendModalProps {
  nameValue: string
  nameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  minValue: number | string
  minOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onHandle: () => void
  onClose: () => void
  isError: boolean
}

const RecommendModal: React.FC<RecommendModalProps> = ({
  nameValue,
  nameOnChange,
  minValue,
  minOnChange,
  onHandle,
  onClose,
  isError,
}) => {
  const testModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: testModalRef,
    handler: () => onClose(),
  })

  return (
    <>
      <div className={overlayStyle} />
      <div className={wrapperStyle} ref={testModalRef}>
        <div className={titleStyle}>Add new recommendation</div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Recommendation name*:</div>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter recommendation name"
            onChange={nameOnChange}
            value={nameValue}
          />
        </div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Min norm:</div>
          <div className="flex items-center w-full">
            <input
              type="number"
              className={`${inputStyle} w-28`}
              placeholder="Value"
              onChange={minOnChange}
              value={minValue}
              min={0}
            />
            <div className="text-sm ml-2.5">repeats per month</div>
          </div>
        </div>

        {isError && (
          <div className={errorStyle}>
            You have not filled the recommendation name
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

export default RecommendModal
