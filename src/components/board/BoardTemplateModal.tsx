/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { buttonStyle } from '../../helpers/styles.helper'
import CloseIcon from '../../assets/close.svg'
import Dialog from '../dialog/Dialog'
import operatorStore from '../../store/operatorStore/operator.store'
import { NewOperatorTemplateType } from '../../routes/boardRoute/boardRoute.types'
import {
  closeStyle,
  inputStyle,
} from '../../routes/boardRoute/BoardRoute.styled'

interface BoardTemplateModalProps {
  isSetTemplateModal: (value: boolean) => void
}

const BoardTemplateModal: FC<BoardTemplateModalProps> = ({
  isSetTemplateModal,
}) => {
  const [newOperatorTemplates, setNewOperatorTemplates] = useState<
    Omit<NewOperatorTemplateType, 'token'>
  >({
    name: '',
    text: '',
  })

  const handleSetNewOperatorTemplate = useCallback(
    (value) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setNewOperatorTemplates((prev) => ({ ...prev, [value]: e.target.value }))
    },
    []
  )

  const handleCreateNewTemplate = useCallback(async () => {
    if (newOperatorTemplates.name.trim() && newOperatorTemplates.text.trim()) {
      const newTemplateWithLink = {
        ...newOperatorTemplates,
        text: `${newOperatorTemplates.text}`,
      }

      await operatorStore.createNewTemplate(newTemplateWithLink)
      isSetTemplateModal(false)
      setNewOperatorTemplates({
        name: '',
        text: '',
      })
    }
  }, [isSetTemplateModal, newOperatorTemplates])

  return (
    <Dialog>
      <div>
        <div className={closeStyle}>
          <button type="button" onClick={() => isSetTemplateModal(false)}>
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
        <p className="text-sm text-gray-700 pt-2">
          <span className="font-medium bg-gray-700 text-white p-1 rounded-lg">
            #htn_link
          </span>{' '}
          download app link{' '}
          <span className="font-medium bg-gray-700 text-white p-1 rounded-lg">
            #htn_id
          </span>{' '}
          chat ID
        </p>
        <button
          className={buttonStyle}
          onClick={handleCreateNewTemplate}
          type="button">
          Add
        </button>
      </div>
    </Dialog>
  )
}

export default observer(BoardTemplateModal)
