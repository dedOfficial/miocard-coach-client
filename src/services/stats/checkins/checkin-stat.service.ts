/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { CheckinType } from '../../../store/statsStore/stats.store.types'

export async function addCheckin(
  kitId: string,
  clientNumber: string,
  checkinCheckboxes: string[],
  day: string,
  time: string,
  chatId: string,
  additionally?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/checkin', {
      json: {
        clientNumber,
        kitId,
        checkinCheckboxes,
        day,
        time,
        chatId,
        additionally,
        checkin,
        isReceived: true,
      },
    })
    .json()
}

export async function distinctCheckin(clientNumber: string): Promise<string[]> {
  return api.get(`stats/checkin/distinct/${clientNumber}`).json()
}

export async function getCheckins(
  clientNumber: string
): Promise<CheckinType[]> {
  return api.get(`stats/checkin/${clientNumber}`).json()
}

export async function editCheckin(
  checkinCheckboxes: string[],
  additionally: string,
  id: string
): Promise<any> {
  return api
    .patch('stats/checkin', {
      json: {
        checkinCheckboxes,
        additionally,
        id,
      },
    })
    .json()
}
