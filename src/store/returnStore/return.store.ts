import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { ReturnService } from '../../services/api.service'
import { ReturnType, ReturnCoachChatsType } from './return.store.types'

class ReturnStore {
  returnData: ReturnType = {
    coaches: [],
    minNorm: 0,
    percentage: true,
  }

  returnChats: ReturnCoachChatsType = {
    chats: [],
    minNorm: 0,
    percentage: true,
  }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'Return',
      properties: ['returnData', 'returnChats'],
      storage: window.localStorage,
    })
  }

  async fetchReturnedCoaches(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await ReturnService.getReturnedCoaches()

      runInAction(() => {
        this.returnData = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.returnData = {
        coaches: [],
        minNorm: 0,
        percentage: true,
      }
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async fetchReturnedCoachChats(operatorId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await ReturnService.getReturnedCoachChats(operatorId)

      runInAction(() => {
        this.returnChats = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.returnChats = {
        chats: [],
        minNorm: 0,
        percentage: true,
      }
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }
}

export default new ReturnStore()
