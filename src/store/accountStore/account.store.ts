import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { AuthService } from '../../services/api.service'
import { User, UserToken, UserOptions } from './account.store.types'

const { login, getUser, loginWithEmail } = AuthService

class AccountStore {
  userToken: UserToken = ''

  user: User = {
    id: '',
    name: '',
    email: '',
    type: '',
    doctor: false,
    isSuperadmin: false,
  }

  userOptions: UserOptions = {
    currentChatPage: 1,
    viewAllChats: false,
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'AccountStore',
      properties: ['userToken', 'user', 'userOptions'],
      storage: window.localStorage,
    })
  }

  setUserToken(token: string): void {
    if (token) this.userToken = token
  }

  removeUserToken(): void {
    this.userToken = ''
    localStorage.removeItem('token')
  }

  setCurrentChatPage(currentPage: number): void {
    this.userOptions.currentChatPage = currentPage
  }

  setViewAllChats(viewAll: boolean): void {
    this.userOptions.viewAllChats = viewAll
  }

  async getUser(): Promise<void> {
    try {
      const user = await getUser()

      runInAction(() => {
        this.user = user
      })
    } catch (error: ApiError) {
      localStorage.removeItem('token')
      this.removeUserToken()
    }
  }

  async login(fbToken): Promise<void> {
    try {
      const userToken = await login(fbToken)
      localStorage.setItem('token', userToken)

      runInAction(() => {
        this.userToken = userToken
      })
    } catch (error: ApiError) {
      // eslint-disable-next-line no-console
      console.error('Facebook login error:', error.message)
    }
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    const userToken = await loginWithEmail(email, password)
    localStorage.setItem('token', userToken)

    runInAction(() => {
      this.userToken = userToken
    })
  }
}

export default new AccountStore()
