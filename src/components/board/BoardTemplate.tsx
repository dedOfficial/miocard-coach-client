import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

import Pen from '../../assets/pencil.svg'
import Trash from '../../assets/trash.svg'
import accountStore from '../../store/accountStore/account.store'
import { TemplateDataType } from '../../routes/boardRoute/boardRoute.types'
import { DeleteTemplateType } from '../../store/operatorStore/operator.store.types'

interface BoardTemplateProps {
  id: string
  name: string
  text: string
  openModal: (data: Omit<TemplateDataType, 'token'>) => void
  toggleDeleteTemplate(): void
  removeTemplate(
    templateName: DeleteTemplateType['templateName'],
    id: DeleteTemplateType['id']
  ): void
}

const operatorWrapperStyle = classnames(
  'py-3',
  'border-t-2',
  'flex',
  'flex-row',
  'justify-between',
  'items-center',
  'gap-1'
)

const buttonsWrapStyle = classnames('flex', 'flex-wrap', 'gap-1', 'justify-end')

const buttonStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border'
)
const buttonEditStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border'
)

const BoardTemplate: FC<BoardTemplateProps> = ({
  id,
  name,
  text,
  openModal,
  toggleDeleteTemplate,
  removeTemplate,
}) => {
  const handleEditTemplate = useCallback(() => {
    openModal({ id, name, text })
  }, [id, name, openModal, text])

  return (
    <div className={operatorWrapperStyle}>
      <div className="w-10/12">
        <p className="font-medium break-words">{name}</p>
        <p className="text-gray-700 break-words">{text}</p>
      </div>
      {accountStore.user.isSuperadmin && (
        <div className={buttonsWrapStyle}>
          <button
            className={buttonEditStyle}
            type="button"
            onClick={handleEditTemplate}>
            <img src={Pen} alt="Pen" />
          </button>
          <button
            className={buttonStyle}
            type="button"
            onClick={() => {
              toggleDeleteTemplate()
              removeTemplate(name, id)
            }}>
            <img src={Trash} alt="Trash" />
          </button>
        </div>
      )}
    </div>
  )
}

export default observer(BoardTemplate)
