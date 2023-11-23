/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import operatorStore from '../../store/operatorStore/operator.store'
import { OperatorType } from '../../store/operatorStore/operator.store.types'
import { buttonStyle } from '../../helpers/styles.helper'
import CloseIcon from '../../assets/close.svg'
import Dialog from '../dialog/Dialog'
import { NewOperatorTaskType } from '../../routes/boardRoute/boardRoute.types'
import {
  closeStyle,
  textareaStyle,
  selectBgStyle,
  selectStyle,
} from '../../routes/boardRoute/BoardRoute.styled'

interface BoardTaskModalProps {
  isSetTaskModal: (value: boolean) => void
}

const BoardTaskModal: FC<BoardTaskModalProps> = ({ isSetTaskModal }) => {
  const [newOperatorTasks, setNewOperatorTasks] = useState<
    Omit<NewOperatorTaskType, 'token'>
  >({
    operatorId: operatorStore.operators[0]._id,
    task: '',
  })

  const handleSetNewOperatorTask = useCallback(
    (value) => (e) => {
      setNewOperatorTasks((prev) => ({ ...prev, [value]: e.target.value }))
    },
    []
  )

  const handleCreateNewTask = useCallback(async () => {
    if (
      newOperatorTasks.operatorId.trim() &&
      newOperatorTasks.task.trim() &&
      /.{2,}/.test(newOperatorTasks.task)
    ) {
      await operatorStore.createNewTask(newOperatorTasks)
      isSetTaskModal(false)
      setNewOperatorTasks({
        operatorId: '',
        task: '',
      })
    }
  }, [isSetTaskModal, newOperatorTasks])

  return (
    <Dialog>
      <div>
        <div className={closeStyle}>
          <button type="button" onClick={() => isSetTaskModal(false)}>
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <select
          className={selectStyle}
          defaultValue={newOperatorTasks.operatorId}
          style={selectBgStyle}
          onChange={handleSetNewOperatorTask('operatorId')}>
          {operatorStore.operators.map(({ _id, name }: OperatorType) => (
            <option value={_id} key={_id}>
              {name}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Operator task"
          className={textareaStyle}
          onChange={handleSetNewOperatorTask('task')}
          value={newOperatorTasks.task}
        />
        <button
          className={buttonStyle}
          onClick={handleCreateNewTask}
          type="button">
          Add
        </button>
      </div>
    </Dialog>
  )
}

export default observer(BoardTaskModal)
