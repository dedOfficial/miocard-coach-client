import React, { useRef } from 'react'

import useCloseByClickOutside from '../../../../../hooks/useCloseByClickOutside'

import {
  overlayStyle,
  wrapperStyle,
  titleStyle,
  textareaStyle,
  btnsWrapperStyle,
  addBtnStyle,
  cancelBtnStyle,
  errorStyle,
} from './styles'

interface OptionModalProps {
  value: string
  onChange: (e: any) => void
  onHandle: () => void
  onClose: () => void
  isError: boolean
}

const OptionModal: React.FC<OptionModalProps> = ({
  value,
  onChange,
  onHandle,
  onClose,
  isError,
}) => {
  const optionModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: optionModalRef,
    handler: () => onClose(),
  })

  return (
    <>
      <div className={overlayStyle} />
      <div className={wrapperStyle} ref={optionModalRef}>
        <div className={titleStyle}>Add another option</div>
        <textarea
          className={textareaStyle}
          placeholder="Enter new option"
          value={value}
          onChange={onChange}
        />

        {isError && (
          <div className={errorStyle}>You have not filled the new option</div>
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

export default OptionModal
