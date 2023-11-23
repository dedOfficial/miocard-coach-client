import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import ModalPopup from '../components/popup'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import useCloseByClickOutside from '../../../hooks/useCloseByClickOutside'

import { warningWrapperStyle, overlayStyle, errorStyle } from './styles'

interface DeleteModalProp {
  name: string
  onClose(): void
  onDelete(): void
  type?: string
  isDeleteOperator?: boolean
  isError?: boolean
}

const DeleteModal: React.FC<DeleteModalProp> = ({
  name,
  onClose,
  onDelete,
  type = 'coach',
  isDeleteOperator,
  isError,
}: DeleteModalProp) => {
  const deleteModalRef = useRef<HTMLDivElement>(null)

  const role: string = type[0].toUpperCase() + type.slice(1)

  useCloseByClickOutside({
    mainRef: deleteModalRef,
    handler: onClose,
  })

  return (
    <>
      <div className={overlayStyle} />

      <ModalPopup ref={deleteModalRef}>
        <div className={warningWrapperStyle}>
          {isDeleteOperator ? (
            <>
              <div>
                {role} <strong>{name}</strong> will be deleted from the
                platform.
                <br /> You will not be able to profile. Delete {type}{' '}
                <strong>{name}</strong>?
              </div>

              {isError && (
                <div className={errorStyle}>
                  {role} <strong>{name}</strong> has assigned chats. To remove
                  him reassign his chats to other {type}s.
                </div>
              )}
            </>
          ) : (
            <div>
              The <span className="font-bold contents">{name}</span> will be
              permanently deleted.
            </div>
          )}
        </div>

        <hr className="w-11/12" />

        <GroupButtons
          onSubmit={onDelete}
          onSubmitLabel="DELETE"
          onCancel={onClose}
          onCancelLabel="CANCEL"
        />
      </ModalPopup>
    </>
  )
}

export default observer(DeleteModal)
