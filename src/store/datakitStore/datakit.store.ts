import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { DataKitService } from '../../services/api.service'
import {
  AssignedChatType,
  DataKitType,
  EditDataKitType,
  NewDataKitType,
} from './datakit.store.types'

class DataKitStore {
  dataKits: DataKitType[] = []

  checkinOptionsList: string[] = []

  editedDataKitId = ''

  editedDataKit: EditDataKitType = {
    _id: '',
    name: '',
    checkins: [],
  }

  assignedChats: AssignedChatType[] = []

  currentDataKit: DataKitType = {
    _id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '',
    checkins: [],
    chats: [],
    fillingSuccess: 0,
  }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'DataKit',
      properties: [
        'dataKits',
        'currentDataKit',
        'editedDataKit',
        'checkinOptionsList',
        'assignedChats',
      ],
      storage: window.localStorage,
    })
  }

  setEditedDataKitId = (id: string) => {
    this.editedDataKitId = id
  }

  setEditedDataKit = (id, name, checkins) => {
    runInAction(() => {
      this.editedDataKit = { _id: id, name, checkins }
    })
  }

  updateAssignedChats = (_id: string, name: string) => {
    const updatedChats = this.assignedChats
    const pos = updatedChats.findIndex((chat) => chat.id === _id)
    if (pos >= 0) {
      updatedChats.splice(pos, 1)
    } else {
      updatedChats.push({ id: _id, name })
    }
    this.assignedChats = updatedChats
  }

  resetAssignedChats = () => {
    this.assignedChats = []
  }

  resetCurrentDataKit = () => {
    this.currentDataKit = {
      _id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '',
      checkins: [],
      chats: [],
      fillingSuccess: 0,
    }
  }

  async createNewDataKit({ name, checkins }: NewDataKitType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const dataKit = await DataKitService.newDatakit({
        name,
        checkins,
      })

      runInAction(() => {
        this.dataKits.push(dataKit)
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

  async fetchAllDataKits(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const dataKits = await DataKitService.getAllDatakits()

      runInAction(() => {
        this.dataKits = dataKits
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

  async fetchDataKitById(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const dataKit = await DataKitService.getDatakitById(id)

      runInAction(() => {
        this.currentDataKit = dataKit
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

  async fetchCheckinOptionsList(): Promise<void> {
    try {
      const optionsList = await DataKitService.getCheckinOptionsList()

      runInAction(() => {
        this.checkinOptionsList = optionsList
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState.error = error.message
      })
    }
  }

  async removeDataKit(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await DataKitService.deleteDatakit(id)
      runInAction(() => {
        // eslint-disable-next-line no-underscore-dangle
        this.dataKits = this.dataKits.filter((dataKit) => dataKit._id !== id)
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

  async patchDataKit(data: EditDataKitType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, name, checkins } = data

      const updatedDataKit = await DataKitService.updateDatakit(_id, {
        name,
        checkins,
      })

      const newDataKits = this.dataKits.map((dataKit) =>
        // eslint-disable-next-line no-underscore-dangle
        dataKit._id === updatedDataKit._id ? updatedDataKit : dataKit
      )

      runInAction(() => {
        this.dataKits = newDataKits
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

  async assignChats(id: string, chats: AssignedChatType[]): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const updatedCurrentDataKit = await DataKitService.assignChats(id, chats)

      runInAction(() => {
        this.currentDataKit = updatedCurrentDataKit
        this.assignedChats = []
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

  fetchCurrentDataKit = (id: string): void => {
    // eslint-disable-next-line no-underscore-dangle
    const [dk] = this.dataKits.filter((dataKit) => dataKit._id === id)
    this.currentDataKit = dk
  }
}

export default new DataKitStore()
