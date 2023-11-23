import ky from 'ky'

import accountStore from 'store/accountStore/account.store'
import { API_URL } from '../../config'

export const publicApi = ky.create({
  prefixUrl: API_URL,
})

export const api = publicApi.extend({
  hooks: {
    beforeRequest: [
      (options) => {
        const token = accountStore.userToken

        if (token) {
          options.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          accountStore.removeUserToken()
          window.open('/')
        }
        return response
      },
    ],
  },
})
