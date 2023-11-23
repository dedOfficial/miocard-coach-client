import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useCloseByClickOutside from '../../../hooks/useCloseByClickOutside'
import ModalPopup from '../components/popup'
import ActionButton from '../../controls/action-btn'

import { modalOverlayStyle, warningWrapperStyle } from './styles'

interface AlertModalProps {
  onClose(): void
}

const AlertModal: React.FC<AlertModalProps> = ({
  onClose,
}: AlertModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: modalRef,
    handler: onClose,
  })

  return (
    <>
      <div className={modalOverlayStyle} />

      <ModalPopup ref={modalRef}>
        <div className={warningWrapperStyle}>
          This kit is assigned to some chats. <br />
          To delete it, first assign another kit to these chats.
        </div>

        <hr className="w-11/12" />

        <div className="my-6 flex flex-col w-80 items-stretch">
          <ActionButton label="OK" action={onClose} />
        </div>
      </ModalPopup>
    </>
  )
}

export default observer(AlertModal)
