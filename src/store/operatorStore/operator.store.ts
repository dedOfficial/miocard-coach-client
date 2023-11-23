/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import omit from 'lodash-es/omit'
import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import moment from 'moment'

import {
  NewOperatorDataType,
  NewOperatorTaskType,
  NewOperatorTemplateType,
  TemplateDataType,
} from '../../routes/boardRoute/boardRoute.types'
import {
  OperatorService,
  CheckinService,
  TaskService,
  TemplateService,
} from '../../services/api.service'
import accountStore from '../accountStore/account.store'
import chatStore from '../chatStore/chat.store'
import {
  OperatorType,
  OperatorTaskType,
  OperatorTemplateType,
  OperatorCheckinType,
  CurrentCheckinsType,
  OperatorWithAssignedType,
  FilteredChatsType,
  OperatorForChat,
  DashboardTypes,
  DashboardStatsType,
} from './operator.store.types'
import { deleteAssignedOperatorChat } from '../../services/operator/operator.service'

const {
  getOperators,
  getAssistants,
  deleteOperator,
  newOperator,
  changeOperator,
  getOperatorWithAssign,
  updateAssignedOperatorChats,
  getFilteredChats,
  getOperatorDashboard,
  getDashboardStats,
} = OperatorService

const { addCheckin, getOperatorCheckins, updateCheckin } = CheckinService

const { deleteOperatorTask, getOperatorTasks, getAllTasks, newOperatorTask } =
  TaskService

const {
  newOperatorTemplate,
  deleteOperatorTemplate,
  changeTemplate,
  getAllTemplates,
} = TemplateService
class OperatorStore {
  operators: Array<OperatorType> = []

  assistants: Array<OperatorType> = []

  operatorWithAssign: OperatorWithAssignedType = {
    _id: '',
    assignedChats: [],
    name: '',
    email: '',
    basicInfo: '',
    avatar: '',
    phoneNumber: '',
    type: '',
  }

  dashboard: DashboardTypes[] = []

  dashboardStats: DashboardStatsType = {
    habits: [],
    recommendations: [],
    drugs: [],
  }

  filteredChats: Array<FilteredChatsType> = []

  operatorTasks: Array<OperatorTaskType> = []

  operatorTemplates: Array<OperatorTemplateType> = []

  operatorCheckins: Array<OperatorCheckinType> = []

  currentCheckins: Array<CurrentCheckinsType> = []

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'OperatorStore',
      properties: [
        'operators',
        'requestInitialState',
        'operatorTasks',
        'operatorTemplates',
        'operatorCheckins',
        'currentCheckins',
        'operatorWithAssign',
        'filteredChats',
        'dashboard',
        'dashboardStats',
      ],
      storage: window.localStorage,
    })
  }

  async deleteAssignChat(chatId: string, type: OperatorForChat) {
    this.requestInitialState.loading = true
    try {
      await deleteAssignedOperatorChat(chatId, type)
      runInAction(() => {
        this.requestInitialState.loading = false
        this.operatorWithAssign.assignedChats =
          this.operatorWithAssign.assignedChats.filter(
            (item) => item._id !== chatId
          )
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

  updateAssignedChats(operatorId: string, chats: string[]) {
    this.requestInitialState.loading = true
    return updateAssignedOperatorChats(operatorId, chats).catch(
      (error: ApiError) => {
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      }
    )
  }

  async fetchDashboard(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const dashboard = await getOperatorDashboard(id)

      runInAction(() => {
        this.dashboard = dashboard
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.dashboard = []
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async fetchDashboardStats(id: string, stats: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await getDashboardStats(id, stats)

      runInAction(() => {
        this.dashboardStats[stats] = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.dashboardStats[stats] = []
        this.requestInitialState = {
          loading: false,
          error: error.message,
        }
      })
    }
  }

  async fetchOperatorWithAssign(id: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await getOperatorWithAssign(id)

      runInAction(() => {
        this.operatorWithAssign = data
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

  async fetchFilteredChats(name: string, date: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await getFilteredChats(name, date)

      runInAction(() => {
        this.filteredChats = data
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

  async createNewOperator(newOperatorData: NewOperatorDataType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const operator = await newOperator(newOperatorData)
      runInAction(() => {
        this.operators.push(operator)
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

  async createNewTask(newTask: NewOperatorTaskType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const operatorTasks = await newOperatorTask(newTask)
      runInAction(() => {
        this.operatorTasks.push(operatorTasks)
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

  async createNewTemplate(newTemplate: NewOperatorTemplateType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const operatorTemplates = await newOperatorTemplate(newTemplate)
      runInAction(() => {
        this.operatorTemplates.push(operatorTemplates)
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

  async fetchAllTemplates(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const allTemplates = await getAllTemplates()
      runInAction(() => {
        this.operatorTemplates = allTemplates
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

  async removeTemplate(_id: OperatorTemplateType['_id']): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await deleteOperatorTemplate(_id)
      runInAction(() => {
        this.operatorTemplates = this.operatorTemplates.filter(
          (template) => template._id !== _id
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

  async fetchOperatorTasks(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const operatorTasks = await getOperatorTasks(accountStore.user.id)
      runInAction(() => {
        this.operatorTasks = operatorTasks
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

  async fetchAllTasks(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const allTasks = await getAllTasks()
      runInAction(() => {
        this.operatorTasks = allTasks
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

  async removeTask(_id: OperatorTaskType['_id']): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await deleteOperatorTask(_id)
      runInAction(() => {
        this.operatorTasks = this.operatorTasks.filter(
          (task) => task._id !== _id
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

  async fetchOperators(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const operators = await getOperators()
      runInAction(() => {
        this.operators = operators
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

  async fetchAssistants(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const assistants = await getAssistants()
      runInAction(() => {
        this.assistants = assistants
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

  async removeOperator(email: OperatorType['email']): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await deleteOperator(email)
      runInAction(() => {
        this.operators = this.operators.filter(
          (operator) => operator.email !== email
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

  async editOperator({
    name,
    email,
    _id,
    phoneNumber,
    type,
    basicInfo = '',
  }: NewOperatorDataType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await changeOperator(_id!, email, name, phoneNumber, basicInfo, type)
      runInAction(() => {
        this.operators.find((operator) => operator._id === _id)!.email = email
        this.operators.find((operator) => operator._id === _id)!.name = name
        this.operators.find((operator) => operator._id === _id)!.basicInfo =
          basicInfo

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

  async editTemplate({ name, text, id = '' }: TemplateDataType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await changeTemplate(id, name, text)
      runInAction(() => {
        this.operatorTemplates.find((template) => template._id === id)!.name =
          name
        this.operatorTemplates.find((template) => template._id === id)!.text =
          text
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

  async fetchCheckins(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const checkins = await getOperatorCheckins(chatStore.currentChat.shortKey)

      const currentDate = moment().format('MMMM Do')

      const currentCheckins = checkins
        .filter(
          (checkin) =>
            moment(checkin.createdAt).format('MMMM Do') === currentDate
        )
        .map((checkin) => omit(checkin, ['__v', 'createdAt', 'updatedAt']))

      runInAction(() => {
        this.operatorCheckins = checkins
        this.currentCheckins = currentCheckins
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

  async setCurrentCheckins(date: Date): Promise<void> {
    const currentCheckins = this.operatorCheckins
      .filter(
        (checkin) =>
          moment(checkin.createdAt).format('MMMM Do') ===
          moment(date).format('MMMM Do')
      )
      .map((checkin) => omit(checkin, ['__v', 'createdAt', 'updatedAt']))

    runInAction(() => {
      this.currentCheckins = currentCheckins
    })
  }

  async createCheckin(
    checkin: CurrentCheckinsType & {
      chekinNumber: number
    }
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const newCheckin = await addCheckin({
        ...checkin,
        chatId: chatStore.currentChat.shortKey,
      })

      runInAction(() => {
        this.operatorCheckins.push(newCheckin)
        this.currentCheckins.push(
          omit(newCheckin, ['__v', 'createdAt', 'updatedAt'])
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

  async updateCheckin(
    checkin: CurrentCheckinsType & {
      chekinNumber: number
    }
  ): Promise<void> {
    this.requestInitialState.loading = true
    try {
      const updatedCheckin = await updateCheckin({
        ...checkin,
        chatId: chatStore.currentChat.shortKey,
      })

      const updatedOperatorCheckin = this.operatorCheckins.map((oldCheckin) =>
        oldCheckin._id === updatedCheckin._id ? updatedCheckin : oldCheckin
      )

      const updatedCurrentCheckin = this.currentCheckins.map((oldCheckin) =>
        oldCheckin._id === updatedCheckin._id
          ? omit(updatedCheckin, ['__v', 'createdAt', 'updatedAt'])
          : oldCheckin
      )

      runInAction(() => {
        this.currentCheckins = updatedCurrentCheckin
        this.operatorCheckins = updatedOperatorCheckin
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

export default new OperatorStore()
