import { api } from '../../api-client'
import { RecommendationType } from '../../../store/statsStore/stats.store.types'

export async function addRecommendation(
  kitId: string,
  clientNumber: string,
  recommendationId: string,
  repeatability: number,
  day: string,
  time: string,
  chatId: string,
  isReceived: boolean,
  notReceivedReason?: string,
  checkin?: string
): Promise<any> {
  return api
    .post('stats/recommendation', {
      json: {
        clientNumber,
        kitId,
        recommendationId,
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

export async function distinctRecommendation(
  clientNumber: string
): Promise<string[]> {
  return api.get(`stats/recommendation/distinct/${clientNumber}`).json()
}

export async function getRecommendations(
  clientNumber: string
): Promise<RecommendationType[]> {
  return api.get(`stats/recommendation/${clientNumber}`).json()
}

export async function editRecommendation(
  repeatability: number,
  id: string,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch('stats/recommendation', {
      json: {
        repeatability,
        id,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}
