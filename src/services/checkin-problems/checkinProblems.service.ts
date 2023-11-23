import { api } from '../api-client'

export async function getProblemsCoaches(): Promise<any> {
  return api.get('tracked_parameters/checkin-problems/').json()
}

export async function getChatsByCoach(operatorId: string): Promise<any> {
  return api.get(`tracked_parameters/checkin-problems/${operatorId}`).json()
}

export async function getProblemsByChat(chatId: string): Promise<any> {
  return api.get(`tracked_parameters/checkin-problems/info/${chatId}`).json()
}

export default {}
