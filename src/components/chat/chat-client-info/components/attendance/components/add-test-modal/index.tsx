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

interface TestModalProps {
  nameValue: string
  nameOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onHandle: () => void
  onClose: () => void
  isError: boolean
}

const TestModal: React.FC<TestModalProps> = ({
  nameValue,
  nameOnChange,
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
        <div className={titleStyle}>Add new test result</div>
        <div className="flex flex-col mt-3">
          <div className={labelStyle}>Test name*:</div>
          <input
            type="text"
            className={inputStyle}
            placeholder="Enter test name"
            onChange={nameOnChange}
            value={nameValue}
          />
        </div>

        {isError && (
          <div className={errorStyle}>You have not filled the test name</div>
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

export default TestModal
