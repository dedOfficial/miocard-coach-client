/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { DrugType } from '../../../store/statsStore/stats.store.types'

export async function addDrug(
  kitId: string,
  clientNumber: string,
  drug: string,
  day: string,
  time: string,
  chatId: string,
  drugId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/drug', {
      json: {
        clientNumber,
        kitId,
        drug,
        drugId,
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

export async function distinctDrug(clientNumber: string): Promise<string[]> {
  return api.get(`stats/drug/distinct/${clientNumber}`).json()
}

export async function getDrugs(clientNumber: string): Promise<DrugType[]> {
  return api.get(`stats/drug/${clientNumber}`).json()
}

export async function editDrug(
  drug: 'Taken' | 'Not taken' | '',
  id: string,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch('stats/drug', {
      json: {
        drug,
        id,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}
