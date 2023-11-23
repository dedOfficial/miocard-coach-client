import React, { ForwardRefExoticComponent } from 'react'

import { callSelectBtnPointStyle } from './customSelect.style'

type CallCustomSelectBtnProp = {
  ref: React.ForwardedRef<HTMLButtonElement>
  onClick: () => void
}

const CallCustomSelectBtn: ForwardRefExoticComponent<CallCustomSelectBtnProp> =
  React.forwardRef<HTMLButtonElement, CallCustomSelectBtnProp>(
    ({ onClick }, ref) => {
      return (
        <button
          ref={ref}
          type="button"
          id="custom-select"
          className="flex gap-1 justify-end"
          onClick={onClick}>
          <div className={callSelectBtnPointStyle} />
          <div className={callSelectBtnPointStyle} />
          <div className={callSelectBtnPointStyle} />
        </button>
      )
    }
  )

export default CallCustomSelectBtn
