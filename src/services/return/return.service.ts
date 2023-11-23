import { api } from '../api-client'

export async function getReturnedCoaches(): Promise<any> {
  return api.get('tracked_parameters/patient-return/').json()
}

export async function getReturnedCoachChats(operatorId: string): Promise<any> {
  return api.get(`tracked_parameters/patient-return/${operatorId}`).json()
}

export default {}
