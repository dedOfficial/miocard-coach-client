/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'

import { buttonStyle } from '../../helpers/styles.helper'
import CloseIcon from '../../assets/close.svg'
import Dialog from '../dialog/Dialog'
import operatorStore from '../../store/operatorStore/operator.store'
import { defaultTemplateData } from '../../routes/boardRoute/BoardTemplatesRoute'
import { TemplateDataType } from '../../routes/boardRoute/boardRoute.types'
import {
  closeStyle,
  inputStyle,
} from '../../routes/boardRoute/BoardRoute.styled'

interface BoardTemplateEditModalProps {
  isTemplateEditModal: (value: boolean) => void
  newTemplateData: Omit<TemplateDataType, 'token'>
  setNewTemplateData: React.Dispatch<
    React.SetStateAction<Omit<TemplateDataType, 'token'>>
  >
}

const BoardTemplateEditModal: FC<BoardTemplateEditModalProps> = ({
  isTemplateEditModal,
  newTemplateData,
  setNewTemplateData,
}) => {
  const [newOperatorTemplates, setNewOperatorTemplates] = useState<
    Omit<TemplateDataType, 'token'>
  >({
    id: newTemplateData.id,
    name: newTemplateData.name,
    text: newTemplateData.text.replace('#htn_link', '').replace('#htn_id', ''),
  })
  const templateModalRef = useRef<HTMLDivElement>(null)

  const handleSetNewOperatorTemplate = useCallback(
    (value) => (e) => {
      setNewOperatorTemplates((prev) => ({ ...prev, [value]: e.target.value }))
    },
    [setNewOperatorTemplates]
  )

  const closeEditTemplateModal = useCallback(() => {
    setNewTemplateData(defaultTemplateData)
    isTemplateEditModal(false)
  }, [isTemplateEditModal, setNewTemplateData])

  const submitEditTemplate = useCallback(() => {
    operatorStore.editTemplate(newOperatorTemplates)
    closeEditTemplateModal()
  }, [closeEditTemplateModal, newOperatorTemplates])

  useCloseByClickOutside({
    mainRef: templateModalRef,
    handler: () => isTemplateEditModal(false),
  })

  return (
    <Dialog>
      <div ref={templateModalRef}>
        <div className={closeStyle}>
          <button type="button" onClick={() => isTemplateEditModal(false)}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Template's name"
          className={inputStyle}
          onChange={handleSetNewOperatorTemplate('name')}
          value={newOperatorTemplates.name}
        />
        <input
          type="text"
          placeholder="Template's text"
          className={inputStyle}
          onChange={handleSetNewOperatorTemplate('text')}
          value={newOperatorTemplates.text}
        />
        <button
          className={buttonStyle}
          onClick={submitEditTemplate}
          type="button">
          Save
        </button>
      </div>
    </Dialog>
  )
}

export default observer(BoardTemplateEditModal)
