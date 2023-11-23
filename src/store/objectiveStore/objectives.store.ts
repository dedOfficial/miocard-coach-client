/* eslint-disable no-underscore-dangle */
import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import {
  ResultsByOperatorsType,
  NewObjectiveType,
  ObjectivesListType,
  ObjectiveType,
  ResultsAchievementType,
} from './objectives.store.types'
import { ObjectivesService } from '../../services/api.service'

class ObjectivesStore {
  objectives: ObjectivesListType[] = []

  currentObjective: ObjectiveType = { _id: '', name: '', keyResults: [] }

  achievementsByCoaches = []

  resultsAchievement: ResultsAchievementType[] = []

  resultsByOperators: ResultsByOperatorsType = { type: '', data: [] }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'Objectives',
      properties: [
        'objectives',
        'currentObjective',
        'achievementsByCoaches',
        'resultsAchievement',
        'resultsByOperators',
      ],
      storage: window.localStorage,
    })
  }

  async fetchObjectiveById(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const objective = await ObjectivesService.getObjectiveById(id)

      runInAction(() => {
        this.currentObjective = objective
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async fetchAllObjectives(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const objectives = await ObjectivesService.getAllObjectives()

      runInAction(() => {
        this.objectives = objectives
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async fetchResultsAchievement(objectiveId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const results = await ObjectivesService.getResultsAchievement(objectiveId)

      runInAction(() => {
        this.resultsAchievement = results
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.resultsAchievement = []
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async fetchKeyResult(
    objectiveId: string,
    keyResultName: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const results = await ObjectivesService.getKeyResult(
        objectiveId,
        keyResultName
      )

      runInAction(() => {
        this.resultsByOperators = results
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.resultsByOperators = { type: '', data: [] }
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async createNewObjective(newObjective: NewObjectiveType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await ObjectivesService.addObjective(newObjective)

      runInAction(() => {
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async patchObjective(data: ObjectiveType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, name, keyResults } = data

      await ObjectivesService.updateObjective({
        _id,
        name,
        keyResults,
      })

      runInAction(() => {
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async removeObjective(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await ObjectivesService.deleteObjective(id)
      runInAction(() => {
        this.objectives = this.objectives.filter(
          (objective) => objective._id !== id
        )
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }
}

export default new ObjectivesStore()
