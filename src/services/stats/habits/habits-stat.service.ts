/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { HabitType } from '../../../store/statsStore/stats.store.types'

export async function addHabit(
  kitId: string,
  clientNumber: string,
  habitId: string,
  repeatability: number,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/habit', {
      json: {
        clientNumber,
        kitId,
        habitId,
        repeatability,
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

export async function distinctHabit(clientNumber: string): Promise<string[]> {
  return api.get(`stats/habit/distinct/${clientNumber}`).json()
}

export async function getHabits(clientNumber: string): Promise<HabitType[]> {
  return api.get(`stats/habit/${clientNumber}`).json()
}

export async function editHabit(
  repeatability: number,
  id: string,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch('stats/habit', {
      json: {
        repeatability,
        id,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}
