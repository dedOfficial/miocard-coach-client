/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardTitle from '../../components/board/BoardTitle'
import BoardFooter from '../../components/board/BoardFooter'
import BoardTaskModal from '../../components/board/BoardTaskModal'
import BoardTask from '../../components/board/BoardTask'
import Loader from '../../components/loader/loader'
import operatorStore from '../../store/operatorStore/operator.store'
import accountStore from '../../store/accountStore/account.store'
import {
  OperatorTaskType,
  OperatorType,
} from '../../store/operatorStore/operator.store.types'
import ToggleTasks from '../../components/board/ToggleTasks'
import {
  mainWrapperStyle,
  modalBackgroundStyle,
  operatorWrapperStyle,
} from './BoardRoute.styled'

const BoardTasksRoute: FC = () => {
  const [isTaskModal, isSetTaskModal] = useState<boolean>(false)
  const [toggleTasks, setToggleTasks] = useState<boolean>(false)

  const getOperatorTasks = useCallback(async () => {
    await operatorStore.fetchAllTasks()
  }, [])

  useEffect(() => {
    if (accountStore.userToken) {
      accountStore.getUser()
      getOperatorTasks()
    }
  }, [getOperatorTasks])

  return (
    <>
      {isTaskModal && <BoardTaskModal isSetTaskModal={isSetTaskModal} />}

      {isTaskModal && <div className={modalBackgroundStyle} />}

      <div className={mainWrapperStyle}>
        <BoardHeader />
        {operatorStore.requestInitialState.loading && <Loader />}
        {!operatorStore.requestInitialState.loading && (
          <>
            <BoardTitle
              title={!toggleTasks ? 'Tasks for me' : 'Tasks for operators'}
              buttonAction={() => isSetTaskModal(true)}
            />
            <div className={operatorWrapperStyle}>
              {toggleTasks ? (
                <>
                  {operatorStore.operators.map(
                    ({ name, _id }: OperatorType) => (
                      <div key={_id}>
                        <p className="py-3 text-lg font-medium text-blue-500">
                          {name}
                        </p>
                        {operatorStore.operatorTasks
                          .filter((task) => task.operatorId === _id)
                          // eslint-disable-next-line @typescript-eslint/no-shadow
                          .map(({ task, _id }: OperatorTaskType) => (
                            <BoardTask
                              id={_id}
                              task={task}
                              remove={toggleTasks}
                              key={_id}
                            />
                          ))}
                      </div>
                    )
                  )}
                </>
              ) : (
                <>
                  {operatorStore.operators
                    .filter((operator) => operator._id === accountStore.user.id)
                    .map(({ _id }: OperatorType) => (
                      <div key={_id}>
                        {operatorStore.operatorTasks
                          .filter((task) => task.operatorId === _id)
                          // eslint-disable-next-line @typescript-eslint/no-shadow
                          .map(({ task, _id }: OperatorTaskType) => (
                            <BoardTask
                              id={_id}
                              task={task}
                              remove={toggleTasks}
                              key={_id}
                            />
                          ))}
                      </div>
                    ))}
                </>
              )}
            </div>
            <ToggleTasks
              title="View all tasks"
              setToggleTasks={setToggleTasks}
              toggleTasks={toggleTasks}
            />
          </>
        )}

        <BoardFooter />
      </div>
    </>
  )
}

export default observer(BoardTasksRoute)
