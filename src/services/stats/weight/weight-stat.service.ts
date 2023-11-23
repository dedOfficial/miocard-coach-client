/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { WeightType } from '../../../store/statsStore/stats.store.types'

export async function addWeight(
  kitId: string,
  clientNumber: string,
  weight: number,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/weight', {
      json: {
        clientNumber,
        kitId,
        weight,
        day,
        time,
        chatId,
        checkin,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}

export async function distinctWeight(clientNumber: string): Promise<string[]> {
  return api.get(`stats/weight/distinct/${clientNumber}`).json()
}

export async function getWeight(clientNumber: string): Promise<WeightType[]> {
  return api.get(`stats/weight/${clientNumber}`).json()
}
