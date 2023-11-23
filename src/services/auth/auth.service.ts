/* eslint-disable import/prefer-default-export */
import { api, publicApi } from '../api-client'
import { User } from '../../store/accountStore/account.store.types'

export async function getUser(): Promise<User> {
  const response = await api.get('auth/me').json<any>()
  return response
}

export async function login(fbToken: string): Promise<string> {
  const response = await publicApi
    .get('auth/facebook', {
      headers: {
        Authorization: `Bearer ${fbToken}`,
      },
    })
    .json<{ token: string }>()
  return response.token
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<string> {
  const response = await publicApi
    .post('auth/login', {
      json: {
        email,
        password,
      },
    })
    .json<{ token: string }>()
  return response.token
}
