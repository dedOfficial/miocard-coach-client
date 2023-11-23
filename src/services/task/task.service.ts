/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import { OperatorTaskType } from '../../store/operatorStore/operator.store.types'
import {
  getOperatorTasks,
  newOperatorTask,
  deleteOperatorTask,
} from './operator/operator-task.service'

export async function getAllTasks(): Promise<OperatorTaskType[]> {
  return api.get('task').json()
}

export { getOperatorTasks, newOperatorTask, deleteOperatorTask }
