/* eslint-disable import/prefer-default-export */
import { publicApi } from '../api-client'

interface AuthResponse {
  token: string
}

export async function debugLogin(): Promise<AuthResponse> {
  const response = await publicApi.get('auth/debug').json<AuthResponse>()
  return response
}
