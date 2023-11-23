/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { WalkedDistanceType } from '../../../store/statsStore/stats.store.types'

export async function addWalkedDistance(
  kitId: string,
  clientNumber: string,
  walkedDistance = 0,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/walkedDistance', {
      json: {
        clientNumber,
        kitId,
        walkedDistance,
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

export async function distinctWalkedDistance(
  clientNumber: string
): Promise<string[]> {
  return api.get(`stats/walkedDistance/distinct/${clientNumber}`).json()
}

export async function getWalkedDistances(
  clientNumber: string
): Promise<WalkedDistanceType[]> {
  return api.get(`stats/walkedDistance/${clientNumber}`).json()
}
