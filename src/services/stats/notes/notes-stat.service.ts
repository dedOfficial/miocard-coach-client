/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { NotesType } from '../../../store/statsStore/stats.store.types'

export async function addNotes(
  kitId: string,
  clientNumber: string,
  notes: string,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  checkin?: string,
  notReceivedReason?: string
): Promise<any> {
  return api
    .post('stats/notes', {
      json: {
        clientNumber,
        kitId,
        notes,
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

export async function distinctNotes(clientNumber: string): Promise<string[]> {
  return api.get(`stats/notes/distinct/${clientNumber}`).json()
}

export async function getNotes(clientNumber: string): Promise<NotesType[]> {
  return api.get(`stats/notes/${clientNumber}`).json()
}
