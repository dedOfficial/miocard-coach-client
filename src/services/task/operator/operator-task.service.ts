/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { NewOperatorTaskType } from '../../../routes/boardRoute/boardRoute.types'
import { OperatorTaskType } from '../../../store/operatorStore/operator.store.types'

export const newOperatorTask = async ({
  operatorId,
  task,
}: NewOperatorTaskType): Promise<OperatorTaskType> =>
  api
    .post('task/', {
      json: {
        operatorId,
        task,
      },
    })
    .json()

export async function getOperatorTasks(
  operatorId: string
): Promise<OperatorTaskType[]> {
  return api.get(`task/${operatorId}`).json()
}

export async function deleteOperatorTask(_id: string): Promise<void> {
  await api.delete('task', {
    json: {
      taskId: _id,
    },
  })
}
