/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import { NewDoctorDataType } from '../../routes/boardRoute/boardRoute.types'
import { OperatorService } from '../../services/api.service'
import {
  addDoctor,
  deleteDoctor,
  listDoctors,
  callDoc,
  changeDoctor,
} from '../../services/doctor/doctor.service'
import chatStore from '../chatStore/chat.store'
import { DoctorType } from './doctor.store.types'

const { resendSMS } = OperatorService

class DoctorStore {
  doctors: Array<DoctorType> = []

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'DoctorStore',
      properties: ['doctors', 'requestInitialState'],
      storage: window.localStorage,
    })
  }

  async fetchDoctors(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const doctors = await listDoctors()
      runInAction(() => {
        this.doctors = doctors
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

  async createNewDoctor(newDoctorData: NewDoctorDataType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const doctor = await addDoctor(
        newDoctorData.name,
        newDoctorData.number,
        newDoctorData.email
      )
      runInAction(() => {
        this.doctors.push(doctor)
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

  async removeDoctor(id: DoctorType['_id']): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await deleteDoctor(id)
      runInAction(() => {
        // eslint-disable-next-line no-underscore-dangle
        this.doctors = this.doctors.filter((doctor) => doctor._id !== id)
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

  async callTheDoctor(chatId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await callDoc(chatId, chatStore.currentChat.doctorId)

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

  async resendSMS(templateId, chatId: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await resendSMS(chatId, templateId)

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

  async editDoctor({
    name,
    email,
    number,
    id = '',
  }: Omit<NewDoctorDataType, 'token'>): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await changeDoctor(id, email, name, number)
      runInAction(() => {
        this.doctors.find((doctor) => doctor._id === id)!.email = email
        this.doctors.find((doctor) => doctor._id === id)!.name = name
        this.doctors.find((doctor) => doctor._id === id)!.number = number

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

export default new DoctorStore()
