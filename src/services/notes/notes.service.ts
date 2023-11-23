import { api } from '../api-client'

export async function getNotes(
  clientNumber: string,
  date: string
): Promise<any> {
  return api
    .get(`daily-notes/?clientNumber=${clientNumber}&date=${date}`)
    .json()
}

export async function createNote(
  clientNumber: string,
  type: string,
  message: string
): Promise<any> {
  return api
    .post('daily-notes', {
      json: {
        clientNumber,
        type,
        message,
      },
    })
    .json()
}

export default {}
