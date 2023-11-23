import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { TrackedParameterService } from '../../services/api.service'
import { TrackedParameterType } from './trackedParameter.types'

class TrackedParametersStore {
  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'Tracked Parameters',
      properties: [],
      storage: window.localStorage,
    })
  }

  async editTrackedParameters(
    parameter: TrackedParameterType,
    trackedParameter: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await TrackedParameterService.updateTrackedParameters(
        parameter,
        trackedParameter
      )

      runInAction(() => {
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }
}

export default new TrackedParametersStore()
