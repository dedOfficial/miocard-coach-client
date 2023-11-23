/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { MoodType } from '../../../store/statsStore/stats.store.types'

export async function addMood(
  kitId: string,
  clientNumber: string,
  mood: string,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/mood', {
      json: {
        clientNumber,
        kitId,
        mood,
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

export async function distinctMood(clientNumber: string): Promise<string[]> {
  return api.get(`stats/mood/distinct/${clientNumber}`).json()
}

export async function getMood(clientNumber: string): Promise<MoodType[]> {
  return api.get(`stats/mood/${clientNumber}`).json()
}
