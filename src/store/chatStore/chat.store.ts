/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { makeAutoObservable, runInAction } from 'mobx'
import { clearPersistedStore, makePersistable } from 'mobx-persist-store'

import { ClientInfoType } from '../../components/chat/chat-client-info/constants'
import { ChatService } from '../../services/api.service'
import Message from '../../interfaces/message.interface'
import accountStore from '../accountStore/account.store'
import { ClientConnectedOperatorType } from '../../routes/userChatRoute/UserChatRoute.types'
import { toIdsMap } from '../../helpers/helper'
import { EMessageActions } from '../../components/chat/chatMessage/chatMessageActions/ChatMessageActions.types'
import {
  ChatLastMessagesType,
  ChatType,
  LastMessageType,
  NewChatType,
  DailyMeasurementType,
} from './chat.store.types'
import { getPartOfMessages } from '../../services/chat/chat.service'

const {
  deleteChat,
  getChatInfo,
  getChats,
  getAllChats,
  getLastChatMessage,
  markSeenMessages,
  createChat,
  patchChat,
  patchChatStatus,
  getKitOptions,
  getDailyMeasurements,
  getDashboard,
} = ChatService

class ChatStore {
  chats: Array<ChatType> = []

  filteredChats: Array<ChatType> = []

  allChats: Array<ChatType> = []

  lastChatsMessages: ChatLastMessagesType = {}

  dailyMeasurements: Array<DailyMeasurementType> = []

  currentChat: ChatType = {
    shortKey: '',
    active: true,
    operatorId: '',
    assistantId: '',
    unreadMessages: 0,
    type: '',
    doctorId: '',
    clientNumber: '',
    dummyName: '',
    createdAt: '',
    updatedAt: '',
    lifestyleAssessment: '',
    generalHealthRisks: '',
    score: '',
    bipq: '',
    food: '',
    stress: '',
    sleep: '',
    sport: '',
    badHabits: '',
    understanding: '',
    measurementErrors: '',
    eysenck1: '',
    eysenck2: '',
    eysenck3: '',
    eysenck4: '',
    __v: 0,
    _id: '',
    kit: { id: '', fillingSuccess: [] },
    kitCheckins: {},
    dashboardStats: [],
  }

  coachIsTyping = false

  isMoreChatMessages = true

  clientIsTyping = false

  replyChatMessage: Message | null = null

  chatMessages: Dictionary<Message> = {}

  userChatMessages: Dictionary<Message> = {}

  currentChatMessageAction: EMessageActions = EMessageActions.NO_ACTION

  activeOperator: ClientConnectedOperatorType = {
    room: '',
    isOperatorStatus: false,
    operatorName: '',
    operatorAvatar: '',
  }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ChatStore',
      properties: [
        'isMoreChatMessages',
        'chats',
        'filteredChats',
        'allChats',
        'currentChat',
        'activeOperator',
        'dailyMeasurements',
        'requestInitialState',
        'coachIsTyping',
        'clientIsTyping',
        'replyChatMessage',
        'currentChatMessageAction',
        'chatMessages',
        'userChatMessages',
      ],
      storage: window.localStorage,
    })
  }

  async clearPersistedData(): Promise<void> {
    await clearPersistedStore(this)
  }

  toggleCoachIsTyping(flag: boolean): void {
    this.coachIsTyping = flag
  }

  toggleHasMoreMessagesChat(flag: boolean): void {
    this.isMoreChatMessages = flag
  }

  toggleClientIsTyping(flag: boolean): void {
    this.clientIsTyping = flag
  }

  setActiveOperator(operator: ClientConnectedOperatorType): void {
    this.activeOperator = operator
  }

  addChatMessages(message: Message) {
    if (message?._id) {
      this.chatMessages[message._id] = message
    }
  }

  addUserChatMessage(message: Message) {
    if (message?._id) {
      this.userChatMessages[message._id] = message
    }
  }

  removeUserChatMessages() {
    this.userChatMessages = {}
  }

  addReplyChatMessage(_id: Message['_id']) {
    if (_id) {
      this.replyChatMessage = this.chatMessages[_id]
    }
  }

  removeReplyChatMessage() {
    this.replyChatMessage = null
  }

  clearFilteredChats() {
    this.filteredChats = []
  }

  setCurrentChatMessageAction(action: EMessageActions) {
    this.currentChatMessageAction = action
  }

  filterChats(text: string) {
    this.filteredChats = this.allChats.filter((chat) => {
      const chatData = `${chat.dummyName?.toUpperCase()} ${chat.personalInfo?.clientName?.toUpperCase()}`

      if (text.length > 3) {
        return (
          chatData.toLowerCase().includes(text.toLowerCase()) ||
          chat.clientNumber.includes(text)
        )
      }
      return chatData.toLowerCase().includes(text.toLowerCase())
    })
  }

  updateFillingSuccess(
    fillingSuccess: Array<{ date: string; value: number; total: number }>
  ) {
    this.currentChat.kit.fillingSuccess = fillingSuccess
  }

  async fetchChatsForMessages(): Promise<void> {
    const chats = await getChats(accountStore.user.id)

    runInAction(() => {
      if (chats.length > 0) {
        this.chats = chats
      }
    })
  }

  async fetchAllChatsForMessages(): Promise<void> {
    const chats = await getAllChats()

    runInAction(() => {
      this.allChats = chats
    })
  }

  markAllMessagesAsSeen = (shortKey: string) => {
    return markSeenMessages(shortKey)
  }

  async fetchChats(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const chats = await getChats(accountStore.user.id)

      runInAction(() => {
        this.chats = chats
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

  async fetchAllChats(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const chats = await getAllChats()

      runInAction(() => {
        this.allChats = chats
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

  async fetchChatsLastMessages(chats: ChatType[]): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const promises: Promise<LastMessageType>[] = []

      for (let i = 0; i < chats.length; i += 1) {
        promises.push(getLastChatMessage(chats[i].shortKey))
      }

      const lastMessagesPromises = await Promise.allSettled(promises)
      const lastMessages: [LastMessageType, number][] = []

      lastMessagesPromises.forEach((promise, index) => {
        if (promise.status === 'fulfilled') {
          lastMessages.push([promise.value, index])
        }
      })

      runInAction(() => {
        this.lastChatsMessages = lastMessages.reduce((acc, [msg, index]) => {
          acc[chats[index].shortKey] = JSON.parse(JSON.stringify(msg))
          return acc
        }, {})

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

  async patchChat(data: ClientInfoType): Promise<void> {
    try {
      const updatedChat = await patchChat({
        id: this.currentChat._id,
        ...data,
      })

      const newChats = this.chats.map((chat) =>
        chat._id === updatedChat._id
          ? { ...this.currentChat, ...updatedChat }
          : chat
      )

      runInAction(() => {
        this.currentChat = { ...this.currentChat, ...updatedChat }
        this.chats = newChats
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

  async patchChatStatus(chatId: string, active: boolean): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const updatedChat = await patchChatStatus(chatId, active)

      const newChats = this.chats.map((chat) =>
        chat._id === updatedChat._id
          ? { ...this.currentChat, ...updatedChat }
          : chat
      )

      runInAction(() => {
        this.currentChat = { ...this.currentChat, ...updatedChat }
        this.chats = newChats
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

  async removeChat(shortKey): Promise<void> {
    this.requestInitialState.loading = true
    try {
      await deleteChat(shortKey)
      runInAction(() => {
        this.chats = this.chats.filter((chat) => chat.shortKey !== shortKey)
        this.allChats = this.allChats.filter(
          (chat) => chat.shortKey !== shortKey
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

  async getPartOfChatHistory(shortKey, count): Promise<void> {
    // this.requestInitialState.loading = true

    try {
      const messages = await getPartOfMessages(shortKey, count)
      if (!messages.length) {
        this.toggleHasMoreMessagesChat(false)
      }
      const chatMessages = toIdsMap(
        messages
          .map(
            ({
              _id,
              body,
              fromOperator,
              createdAt,
              fromDoctor,
              userError,
              repliedMessageId,
              repliedMessageBody,
            }): Message => ({
              _id,
              body,
              type: fromOperator
                ? body.endsWith('.webp')
                  ? 'image'
                  : 'operator'
                : fromDoctor
                ? 'doctor'
                : 'user',
              date: createdAt,
              userError,
              repliedMessageId,
              repliedMessageBody,
            })
          )
          .reverse()
      ) as Dictionary<Message>

      runInAction(() => {
        this.chatMessages = { ...chatMessages, ...this.chatMessages }
        // this.requestInitialState.loading = false
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

  async fetchChatHistory(shortKey, count = 0): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const messages = await getPartOfMessages(shortKey, count)
      const chatMessages = toIdsMap(
        messages
          .map(
            ({
              _id,
              body,
              fromOperator,
              createdAt,
              fromDoctor,
              userError,
              repliedMessageId,
              repliedMessageBody,
            }): Message => ({
              _id,
              body,
              type: fromOperator
                ? body.endsWith('.webp')
                  ? 'image'
                  : 'operator'
                : fromDoctor
                ? 'doctor'
                : 'user',
              date: createdAt,
              userError,
              repliedMessageId,
              repliedMessageBody,
            })
          )
          .reverse()
      ) as Dictionary<Message>
      runInAction(() => {
        this.chatMessages = chatMessages
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

  async fetchChat(shortKey): Promise<void> {
    this.requestInitialState.loading = true

    try {
      let chat = await getChatInfo(shortKey)
      chat = chat.kit
        ? { ...chat }
        : { ...chat, kit: { id: '', fillingSuccess: [] } }
      runInAction(() => {
        this.currentChat = chat
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

  async createNewChat({
    clientNumber,
    operatorId,
    assistantId,
    additionalInformation,
  }: NewChatType): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const chat = await createChat({
        clientNumber,
        operatorId,
        assistantId,
        additionalInformation,
      })
      runInAction(() => {
        if (operatorId === accountStore.user.id) this.chats.push(chat)
        this.allChats.push(chat)
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

  async fetchKitOptions(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const response = await getKitOptions(this.currentChat.kit.id)

      runInAction(() => {
        this.currentChat.kitCheckins = response
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

  async fetchDailyMeasurements(): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await getDailyMeasurements()

      runInAction(() => {
        this.dailyMeasurements = data
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

  async fetchDashboard(): Promise<void> {
    try {
      const data = await getDashboard(this.currentChat._id)

      runInAction(() => {
        this.currentChat.dashboardStats = data
      })
    } catch (error: ApiError) {
      runInAction(() => {
        this.requestInitialState.error = error.message
      })
    }
  }
}

export default new ChatStore()
