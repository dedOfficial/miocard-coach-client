import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { DataCollectionService } from '../../services/api.service'
import {
  CollectionType,
  CollectionCoachChatsType,
} from './dataCollection.store.types'

class DataCollectionStore {
  collectionData: CollectionType = {
    wholeProject: { statistics: [] },
    coaches: [],
    minNorm: 0,
  }

  collectionCoachChats: CollectionCoachChatsType = {
    chats: [],
    minNorm: 0,
  }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'DataCollection',
      properties: ['collectionData', 'collectionCoachChats'],
      storage: window.localStorage,
    })
  }

  async fetchDataCollection(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await DataCollectionService.getDataCollection()

      runInAction(() => {
        this.collectionData = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.collectionData = {
        wholeProject: { statistics: [] },
        coaches: [],
        minNorm: 0,
      }
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async fetchCollectionCoachChats(operatorId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await DataCollectionService.getCollectionCoachChats(
        operatorId
      )

      runInAction(() => {
        this.collectionCoachChats = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.collectionCoachChats = {
        chats: [],
        minNorm: 0,
      }
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }
}

export default new DataCollectionStore()
