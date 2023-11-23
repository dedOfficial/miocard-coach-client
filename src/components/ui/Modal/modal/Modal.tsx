/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import {
  closeStyles,
  modalBackgroundStyle,
  popupCloseStyles,
  popupWrapperStyle,
} from './Modal.styled'
import { ModalProps } from './Modal.types'

const Modal: FC<ModalProps> = ({ toggleModal }) => (
  <div className={modalBackgroundStyle} onClick={toggleModal(false)}>
    <div className={popupWrapperStyle}>
      <div className={popupCloseStyles}>
        <button
          type="submit"
          className={closeStyles}
          onClick={toggleModal(false)}>
          Close
        </button>
      </div>
    </div>
  </div>
)

export default observer(Modal)
