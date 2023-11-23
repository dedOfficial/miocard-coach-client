import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { CheckinProblemsService } from '../../services/api.service'
import { ProblemsType, ProblemsByChat } from './checkinProblems.store.types'

class CheckinProblemsStore {
  coaches: ProblemsType[] = []

  chatsByCoach: ProblemsType[] = []

  problemsByChat: ProblemsByChat[] = []

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'CheckinProblemsStore',
      properties: ['coaches', 'chatsByCoach', 'problemsByChat'],
      storage: window.localStorage,
    })
  }

  async fetchProblemsCoaches(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await CheckinProblemsService.getProblemsCoaches()

      runInAction(() => {
        this.coaches = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.coaches = []
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async fetchChatsByCoach(operatorId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await CheckinProblemsService.getChatsByCoach(operatorId)

      runInAction(() => {
        this.chatsByCoach = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.chatsByCoach = []
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async fetchProblemsByChat(operatorId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await CheckinProblemsService.getProblemsByChat(operatorId)

      runInAction(() => {
        this.problemsByChat = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.problemsByChat = []
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }
}

export default new CheckinProblemsStore()
