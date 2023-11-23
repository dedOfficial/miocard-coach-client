import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { MeasurementsService } from '../../services/api.service'
import {
  MeasurementsCoachChatsType,
  MeasurementsType,
} from './measurements.store.types'

class MeasurementsStore {
  measurementsData: MeasurementsType = {
    coaches: [],
    minNorm: 0,
  }

  measurementsChats: MeasurementsCoachChatsType = {
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
      name: 'Measurements',
      properties: ['measurementsData', 'measurementsChats'],
      storage: window.localStorage,
    })
  }

  async fetchMeasurementsCoaches(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await MeasurementsService.getMeasurementsCoaches()

      runInAction(() => {
        this.measurementsData = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.measurementsData = {
        coaches: [],
        minNorm: 0,
      }
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async fetchMeasurementsCoachChats(operatorId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await MeasurementsService.getMeasurementsCoachChats(
        operatorId
      )

      runInAction(() => {
        this.measurementsChats = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.measurementsChats = {
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

export default new MeasurementsStore()
