/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { MealType } from '../../../store/statsStore/stats.store.types'

export async function addFood(
  kitId: string,
  clientNumber: string,
  food: string,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/food', {
      json: {
        clientNumber,
        kitId,
        food,
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

export async function distinctFood(clientNumber: string): Promise<string[]> {
  return api.get(`stats/food/distinct/${clientNumber}`).json()
}

export async function getFood(clientNumber: string): Promise<MealType[]> {
  return api.get(`stats/food/${clientNumber}`).json()
}
