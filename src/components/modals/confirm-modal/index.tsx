import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useCloseByClickOutside from '../../../hooks/useCloseByClickOutside'
import ModalPopup from '../components/popup'
import GroupButtons from '../../controls/submitCancelGroupBtn'

import {
  modalOverlayStyle,
  warningWrapperStyle,
  listStyle,
  chatNameStyle,
  operatorNameStyle,
} from './styles'

interface ConfirmModalProps {
  onSave(): void
  onClose(): void
  chatNames: string[]
  operatorName: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  onSave,
  onClose,
  chatNames,
  operatorName,
}: ConfirmModalProps) => {
  const confirmModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: confirmModalRef,
    handler: onClose,
  })

  return (
    <>
      <div className={modalOverlayStyle} />

      <ModalPopup ref={confirmModalRef}>
        <div className={warningWrapperStyle}>
          {chatNames.length > 1 ? (
            <div>
              Chats:
              <ul className={listStyle}>
                {chatNames.map((chatName) => (
                  <li className={chatNameStyle} key={chatName}>
                    {chatName}
                  </li>
                ))}
              </ul>
              are already assigned to other coaches. <br /> <br />
              After saving the changes coach
              <span className={operatorNameStyle}>{operatorName}</span>will be
              assigned to these chats and previously assigned coaches will lose
              access to these chats.
            </div>
          ) : (
            <div>
              {chatNames.length !== 0 && (
                <>
                  <span className={chatNameStyle}>{chatNames[0]}</span>chat is
                  already assigned to other coach. <br /> <br />
                </>
              )}
              After saving the changes coach
              <span className={operatorNameStyle}>{operatorName}</span>will be
              assigned to this chat and previously assigned coach will lose
              access to this chat.
            </div>
          )}
        </div>

        <hr className="w-11/12" />

        <GroupButtons
          onSubmit={onSave}
          onSubmitLabel="SAVE CHANGES"
          onCancel={onClose}
          onCancelLabel="CANCEL"
        />
      </ModalPopup>
    </>
  )
}

export default observer(ConfirmModal)
