/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import {
  CardioType,
  ETimeOfDay,
} from '../../../store/statsStore/stats.store.types'

export async function addCardio(
  kitId: string,
  clientNumber: string,
  timeOfDay: string,
  pressure: string,
  pulse: number,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/cardio', {
      json: {
        clientNumber,
        kitId,
        timeOfDay,
        pressure,
        pulse,
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

export async function distinctCardio(clientNumber: string): Promise<string[]> {
  return api.get(`stats/cardio/distinct/${clientNumber}`).json()
}

export async function getCardio(clientNumber: string): Promise<CardioType[]> {
  return api.get(`stats/cardio/${clientNumber}`).json()
}

export async function editCardio(
  pressureValue: string,
  pulseValue: string,
  id: string,
  timeOfDay: ETimeOfDay,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch('stats/cardio', {
      json: {
        pressure: pressureValue,
        pulse: Number(pulseValue),
        id,
        timeOfDay,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}
