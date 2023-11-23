import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

import chatStore from 'store/chatStore/chat.store'
import { NotesService } from '../../services/api.service'
import { NotesType } from './notes.store.types'

class NotesStore {
  allNotes: NotesType = {
    users: {
      operator: { name: null, avatar: null },
      assistant: { name: null, avatar: null },
    },
    notes: [],
  }

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'Notes',
      properties: ['allNotes'],
      storage: window.localStorage,
    })
  }

  async fetchNotes(date: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const data = await NotesService.getNotes(
        chatStore.currentChat.clientNumber,
        date
      )

      runInAction(() => {
        this.allNotes = data
        this.requestInitialState.loading = false
      })
    } catch (error: ApiError) {
      this.requestInitialState = {
        loading: false,
        error: error.msg,
      }
    }
  }

  async createNote(type: string, message: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const note = await NotesService.createNote(
        chatStore.currentChat.clientNumber,
        type,
        message
      )

      runInAction(() => {
        this.allNotes.notes.push(note)
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

export default new NotesStore()
