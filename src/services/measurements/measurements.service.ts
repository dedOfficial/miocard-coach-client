import { api } from '../api-client'

export async function getMeasurementsCoaches(): Promise<any> {
  return api.get('tracked_parameters/measurements/').json()
}

export async function getMeasurementsCoachChats(
  operatorId: string
): Promise<any> {
  return api.get(`tracked_parameters/measurements/${operatorId}`).json()
}

export default {}
