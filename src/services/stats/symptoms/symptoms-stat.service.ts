/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { SymptomType } from '../../../store/statsStore/stats.store.types'

export async function addSymptom(
  kitId: string,
  clientNumber: string,
  symptom: {
    cardiovascular: string[]
    nonCardiovascular: string
    isAbsent: boolean
  },
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/symptom', {
      json: {
        clientNumber,
        kitId,
        symptom,
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

export async function editSymptom(
  symptom: {
    cardiovascular: string[]
    nonCardiovascular: string
    isAbsent: boolean
  },
  id: string,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch('stats/symptom', {
      json: {
        symptom,
        id,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}

export async function distinctSymptom(clientNumber: string): Promise<string[]> {
  return api.get(`stats/symptom/distinct/${clientNumber}`).json()
}

export async function getSymptoms(
  clientNumber: string
): Promise<SymptomType[]> {
  return api.get(`stats/symptom/${clientNumber}`).json()
}
