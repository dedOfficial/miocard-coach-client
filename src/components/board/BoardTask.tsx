import React, { FC, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

import Trash from '../../assets/trash.svg'
import operatorStore from '../../store/operatorStore/operator.store'
import accountStore from '../../store/accountStore/account.store'

interface BoardTaskProps {
  id: string
  task: string
  remove: boolean
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
const buttonStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-xl',
  'border-blue-400',
  'border'
)

const BoardTask: FC<BoardTaskProps> = ({ id, task, remove }) => {
  const handleRemoveOperatorTask = useCallback(() => {
    operatorStore.removeTask(id)
  }, [id])

  return (
    <div className={operatorWrapperStyle}>
      <p className="w-10/12 break-words">{task}</p>
      {(!remove || accountStore.user.isSuperadmin) && (
        <button
          className={buttonStyle}
          type="button"
          onClick={handleRemoveOperatorTask}>
          <img src={Trash} alt="Trash" />
        </button>
      )}
    </div>
  )
}

export default observer(BoardTask)
