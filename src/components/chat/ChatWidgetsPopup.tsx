import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

interface WidgetsPopupProps {
  showWidgetModal: () => void
}

const popupWrapperStyle = classnames(
  'fixed',
  'flex',
  'flex-col',
  'h-screen',
  'w-full',
  'z-50',
  'items-center',
  'justify-center'
)
const popupStyle = classnames('p-5', 'bg-white', 'rounded-xl', 'mx-10')
const popupCloseStyles = classnames(
  'p-5',
  'bg-white',
  'rounded-xl',
  'mx-10',
  'mt-3'
)
const closeStyles = classnames(
  'bg-white',
  'text-blue-800',
  'rounded-xl',
  'text-lg',
  'w-80'
)

const WidgetsPopup: FC<WidgetsPopupProps> = ({ children, showWidgetModal }) => {
  return (
    <>
      <div className={popupWrapperStyle}>
        <div className={popupStyle}>{children}</div>
        <div className={popupCloseStyles}>
          <button
            type="submit"
            className={closeStyles}
            onClick={showWidgetModal}>
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(WidgetsPopup)
