import { api } from '../api-client'
import {
  AssignedChatType,
  DataKitType,
  NewDataKitType,
  UpdateDataKitType,
} from '../../store/datakitStore/datakit.store.types'

export async function getAllDatakits(): Promise<DataKitType[]> {
  return api.get('kits/').json()
}

export function getDatakitById(id: string): Promise<DataKitType> {
  return api.get(`kits/${id}`).json()
}

export function newDatakit({
  name,
  checkins,
}: NewDataKitType): Promise<DataKitType> {
  return api
    .post('kits/', {
      json: {
        name,
        checkins,
      },
    })
    .json()
}

export function deleteDatakit(id: string): Promise<any> {
  return api.delete(`kits/${id}`).json()
}

export function updateDatakit(
  id: string,
  { name, checkins }: UpdateDataKitType
): Promise<DataKitType> {
  return api
    .patch(`kits/${id}`, {
      json: {
        name,
        checkins,
      },
    })
    .json()
}

export function assignChats(
  id: string,
  chats: AssignedChatType[]
): Promise<DataKitType> {
  return api
    .patch(`kits/assign/${id}`, {
      json: {
        chats,
      },
    })
    .json()
}

export async function getCheckinOptionsList(): Promise<string[]> {
  return api.get('stats/types').json()
}
