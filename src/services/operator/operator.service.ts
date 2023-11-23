/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import { NewOperatorDataType } from '../../routes/boardRoute/boardRoute.types'
import {
  DashboardTypes,
  FilteredChatsType,
  OperatorType,
  OperatorWithAssignedType,
} from '../../store/operatorStore/operator.store.types'

export async function addOperator(): Promise<void> {
  await api.post('operator')
}

export async function deleteOperator(email: string): Promise<void> {
  await api.delete('operator', {
    json: {
      email,
    },
  })
}

export async function changeOperator(
  id: string,
  email: string,
  name: string,
  phoneNumber: string,
  basicInfo: string,
  type: string
): Promise<void> {
  await api.patch('operator', {
    json: {
      email,
      name,
      id,
      phoneNumber,
      basicInfo,
      type,
    },
  })
}

export async function getOperators(): Promise<OperatorType[]> {
  return api.get('operator/coaches').json()
}

export async function getAssistants(): Promise<OperatorType[]> {
  return api.get('operator/assistants').json()
}

export async function getOperatorWithAssign(
  operatorId: string
): Promise<OperatorWithAssignedType> {
  return api.get(`chat/${operatorId}`).json()
}

export async function getFilteredChats(
  name: string,
  date: string
): Promise<FilteredChatsType[]> {
  return api.get(`chat/filter/?chat_name=${name}&date=${date}`).json()
}

export async function deleteAssignedOperatorChat(
  chatId: string,
  type: string
): Promise<void> {
  return api
    .delete('chat', {
      json: {
        chatId,
        type,
      },
    })
    .json()
}

export function updateAssignedOperatorChats(
  operatorId: string,
  chats: Array<string>
): Promise<any> {
  return api
    .patch('chat', {
      json: {
        operatorId,
        chats,
      },
    })
    .json()
}

export const newOperator = async ({
  name,
  email,
  phoneNumber,
  basicInfo,
  type,
}: NewOperatorDataType): Promise<OperatorType> =>
  api
    .post('operator/', {
      json: {
        name,
        email,
        phoneNumber,
        basicInfo,
        type,
      },
    })
    .json()

export async function resendSMS(
  chatId: string,
  templateId: string
): Promise<void> {
  await api.post('operator/sms', {
    json: {
      chatId,
      templateId,
    },
  })
}

export async function getOperatorDashboard(
  operatorId: string
): Promise<DashboardTypes[]> {
  return api.get(`dashboard/operator/${operatorId}`).json()
}

export async function getDashboardStats(
  operatorId: string,
  stats: string
): Promise<void> {
  return api.get(`dashboard/operator/${stats}/${operatorId}`).json()
}
