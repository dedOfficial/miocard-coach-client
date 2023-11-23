import { api } from '../api-client'

export async function getDataCollection(): Promise<any> {
  return api.get('tracked_parameters/data-collection/').json()
}

export async function getCollectionCoachChats(
  operatorId: string
): Promise<any> {
  return api.get(`tracked_parameters/data-collection/${operatorId}`).json()
}

export default {}
