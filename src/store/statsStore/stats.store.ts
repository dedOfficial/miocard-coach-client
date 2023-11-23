/* eslint-disable no-underscore-dangle */
import { makeAutoObservable, runInAction } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import uniq from 'lodash-es/uniq'
import moment from 'moment'

import { StatsService } from '../../services/api.service'
import chatStore from '../chatStore/chat.store'
import {
  WeightType,
  MealType,
  NotesType,
  MoodType,
  DrugType,
  SymptomType,
  WalkedDistanceType,
  CardioType,
  HabitType,
  RecommendationType,
  CheckinType,
  StoreStats,
  ETimeOfDay,
} from './stats.store.types'

const {
  distinctCheckin,
  distinctHabit,
  distinctRecommendation,
  distinctFood,
  distinctWeight,
  distinctMood,
  distinctNotes,
  getCardio,
  getCheckins,
  getHabits,
  getRecommendations,
  getFood,
  getWeight,
  getNotes,
  addNotes,
  getMood,
  addCardio,
  addCheckin,
  addHabit,
  addRecommendation,
  addMood,
  addWeight,
  addFood,
  addDrug,
  addSymptom,
  distinctDrug,
  getDrugs,
  getSymptoms,
  distinctSymptom,
  addWalkedDistance,
  getWalkedDistances,
  distinctWalkedDistance,
  editStat,
  editCardio,
  editSymptom,
  editCheckin,
  deleteStat,
} = StatsService
class StatsStore {
  dates: Array<string> = []

  cardioDates: Array<string> = []

  habitDates: Array<string> = []

  recommendationDates: Array<string> = []

  pulseDates: Array<string> = []

  weightDates: Array<string> = []

  pressureDates: Array<string> = []

  mealDates: Array<string> = []

  drugDates: Array<string> = []

  symptomDates: Array<string> = []

  moodDates: Array<string> = []

  notesDates: Array<string> = []

  walkedDistanceDates: Array<string> = []

  checkinsDates: Array<string> = []

  cardio: Array<CardioType> = []

  weight: Array<WeightType> = []

  walkedDistances: Array<WalkedDistanceType> = []

  meals: Array<MealType> = []

  habits: Array<HabitType> = []

  recommendations: Array<RecommendationType> = []

  drugs: Array<DrugType> = []

  symptoms: Array<SymptomType> = []

  notes: Array<NotesType> = []

  mood: Array<MoodType> = []

  checkins: Array<CheckinType> = []

  requestInitialState: RequestState = {
    loading: false,
    error: null,
  }

  constructor() {
    makeAutoObservable(this)

    makePersistable(this, {
      name: 'StatsStore',
      properties: [
        'dates',
        'cardioDates',
        'habitDates',
        'recommendationDates',
        'pulseDates',
        'weightDates',
        'pressureDates',
        'moodDates',
        'mealDates',
        'drugDates',
        'symptomDates',
        'notesDates',
        'walkedDistanceDates',
        'cardio',
        'habits',
        'recommendations',
        'weight',
        'meals',
        'drugs',
        'symptoms',
        'notes',
        'mood',
        'walkedDistances',
        'requestInitialState',
        'checkins',
        'checkinsDates',
      ],
      storage: window.localStorage,
    })
  }

  setAvailableDates() {
    const allDates: string[] = [
      ...this.cardioDates,
      ...this.habitDates,
      ...this.recommendationDates,
      ...this.weightDates,
      ...this.mealDates,
      ...this.moodDates,
      ...this.notesDates,
      ...this.checkinsDates,
    ]

    this.dates = uniq(allDates).sort().reverse()
  }

  // TODO 20 requests to the server with non-dimensional arrays returned will result in a heavy load on the server.
  // TODO Delete if not necessary or create one request on back that will return arrays of a certain length
  /* async fetchAllStatsData(clientNumber: string) {
    await this.fetchDistinctCardio(clientNumber)
    await this.fetchDistinctCheckin(clientNumber)
    await this.fetchDistinctHabit(clientNumber)
    await this.fetchDistinctWeight(clientNumber)
    await this.fetchDistinctFood(clientNumber)
    await this.fetchDistinctDrug(clientNumber)
    await this.fetchDistinctSymptom(clientNumber)
    await this.fetchDistinctMood(clientNumber)
    await this.fetchDistinctNote(clientNumber)
    await this.fetchDistinctWalkedDistance(clientNumber)
    await this.fetchCardio(clientNumber)
    await this.fetchCheckins(clientNumber)
    await this.fetchHabits(clientNumber)
    await this.fetchWeight(clientNumber)
    await this.fetchMeals(clientNumber)
    await this.fetchDrugs(clientNumber)
    await this.fetchSymptoms(clientNumber)
    await this.fetchNotes(clientNumber)
    await this.fetchMood(clientNumber)
    await this.fetchWalkedDistances(clientNumber)
  } */

  async fetchCurrentStats(clientNumber: string, date: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const currentStats = await StatsService.getCurrentStats(
        clientNumber,
        date
      )

      runInAction(() => {
        Object.values(StoreStats).forEach((stat) => {
          this[stat] = currentStats[stat]
        })
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

  async fetchDistinctCheckin(clientNumber: string): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const checkinsDates = await distinctCheckin(clientNumber)

      runInAction(() => {
        this.checkinsDates = checkinsDates
        this.setAvailableDates()
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

  async fetchDistinctHabit(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const habitDates = await distinctHabit(clientNumber)

      runInAction(() => {
        this.habitDates = habitDates
        this.setAvailableDates()
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

  async fetchDistinctRecommendation(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const recommendationDates = await distinctRecommendation(clientNumber)

      runInAction(() => {
        this.recommendationDates = recommendationDates
        this.setAvailableDates()
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

  async fetchDistinctMood(clientNumber): Promise<void> {
    this.requestInitialState.loading = true
    try {
      const moodDates = await distinctMood(clientNumber)
      runInAction(() => {
        this.moodDates = moodDates
        this.setAvailableDates()
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

  async fetchDistinctFood(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const mealDates = await distinctFood(clientNumber)

      runInAction(() => {
        this.mealDates = mealDates
        this.setAvailableDates()
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

  async fetchDistinctDrug(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const drugDates = await distinctDrug(clientNumber)

      runInAction(() => {
        this.drugDates = drugDates
        this.setAvailableDates()
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

  async fetchDistinctSymptom(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const symptomDates = await distinctSymptom(clientNumber)

      runInAction(() => {
        this.symptomDates = symptomDates
        this.setAvailableDates()
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

  async fetchDistinctWeight(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const weightDates = await distinctWeight(clientNumber)

      runInAction(() => {
        this.weightDates = weightDates
        this.setAvailableDates()
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

  async fetchDistinctNote(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const notesDates = await distinctNotes(clientNumber)

      runInAction(() => {
        this.notesDates = notesDates
        this.setAvailableDates()
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

  async fetchDistinctWalkedDistance(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const walkedDistanceDates = await distinctWalkedDistance(clientNumber)

      runInAction(() => {
        this.walkedDistanceDates = walkedDistanceDates
        this.setAvailableDates()
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

  async fetchCardio(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const cardio = await getCardio(clientNumber)

      runInAction(() => {
        this.cardio = cardio
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

  async fetchCheckins(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const checkins = await getCheckins(clientNumber)

      runInAction(() => {
        this.checkins = checkins
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

  async fetchHabits(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const habits = await getHabits(clientNumber)

      runInAction(() => {
        this.habits = habits
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

  async fetchRecommendations(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const recommendations = await getRecommendations(clientNumber)

      runInAction(() => {
        this.recommendations = recommendations
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

  async fetchMood(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const mood = await getMood(clientNumber)

      runInAction(() => {
        this.mood = mood
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

  async fetchWeight(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const weight = await getWeight(clientNumber)

      runInAction(() => {
        this.weight = weight
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

  async fetchMeals(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const meals = await getFood(clientNumber)

      runInAction(() => {
        this.meals = meals
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

  async fetchDrugs(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const drugs = await getDrugs(clientNumber)

      runInAction(() => {
        this.drugs = drugs
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

  async fetchSymptoms(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const symptoms = await getSymptoms(clientNumber)

      runInAction(() => {
        this.symptoms = symptoms
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

  async fetchNotes(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const notes = await getNotes(clientNumber)

      runInAction(() => {
        this.notes = notes
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

  async fetchWalkedDistances(clientNumber): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const walkedDistances = await getWalkedDistances(clientNumber)

      runInAction(() => {
        this.walkedDistances = walkedDistances
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

  async addCardio(
    timeOfDay: ETimeOfDay,
    pressure: string,
    pulse: number,
    day: string = moment().format('DD-MM-YYYY'),
    isReceived: boolean,
    kitId: string,
    checkin?: string,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addCardio(
        kitId,
        chatStore.currentChat.clientNumber,
        timeOfDay,
        pressure,
        pulse,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.cardio.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.cardioDates.push(day)
        this.setAvailableDates()
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

  async addCheckin(
    kitId: string,
    checkinCheckboxes: string[],
    additionally?: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addCheckin(
        kitId,
        chatStore.currentChat.clientNumber,
        checkinCheckboxes,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        additionally,
        checkin
      )

      runInAction(() => {
        this.checkins.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.checkinsDates.push(day)
        this.setAvailableDates()
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

  async addHabit(
    habitId: string,
    repeatability: number,
    day: string = moment().format('DD-MM-YYYY'),
    isReceived,
    kitId: string,
    checkin?: string,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addHabit(
        kitId,
        chatStore.currentChat.clientNumber,
        habitId,
        repeatability,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.habits.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.habitDates.push(day)
        this.setAvailableDates()
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

  async addRecommendation(
    recommendationId: string,
    repeatability: number,
    day: string = moment().format('DD-MM-YYYY'),
    isReceived,
    kitId: string,
    checkin?: string,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addRecommendation(
        kitId,
        chatStore.currentChat.clientNumber,
        recommendationId,
        repeatability,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.recommendations.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.recommendationDates.push(day)
        this.setAvailableDates()
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

  async addMood(
    msg: string,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addMood(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.mood.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.moodDates.push(day)
        this.setAvailableDates()
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

  async addWeight(
    msg: number,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addWeight(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.weight.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.weightDates.push(day)
        this.setAvailableDates()
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

  async addWalkedDistance(
    msg: number,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addWalkedDistance(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.walkedDistances.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.walkedDistanceDates.push(day)
        this.setAvailableDates()
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

  async addNotes(
    msg: string,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addNotes(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.notes.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.notesDates.push(day)
        this.setAvailableDates()
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

  async addFood(
    msg: string,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addFood(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.meals.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.mealDates.push(day)
        this.setAvailableDates()
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

  async addDrug(
    msg: string,
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    drugId: string,
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addDrug(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        drugId,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.drugs.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.drugDates.push(day)
        this.setAvailableDates()
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

  async addSymptom(
    msg: {
      cardiovascular: string[]
      nonCardiovascular: string
      isAbsent: boolean
    },
    kitId: string,
    day: string = moment().format('DD-MM-YYYY'),
    checkin?: string,
    isReceived = true,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { stat, fillingSuccess } = await addSymptom(
        kitId,
        chatStore.currentChat.clientNumber,
        msg,
        day,
        moment().format('h:mm a'),
        chatStore.currentChat._id,
        isReceived,
        notReceivedReason,
        checkin
      )

      runInAction(() => {
        this.symptoms.push(stat)
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this.symptomDates.push(day)
        this.setAvailableDates()
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

  async editCardio(
    newPressure: string,
    newPulse: string,
    id: string,
    timeOfDay: ETimeOfDay,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await editCardio(
        newPressure,
        newPulse,
        id,
        timeOfDay,
        isReceived,
        notReceivedReason
      )

      runInAction(() => {
        if (isReceived) {
          this.cardio = this.cardio.map((stat) =>
            stat._id === id
              ? {
                  ...stat,
                  pressure: newPressure,
                  pulse: newPulse,
                  timeOfDay,
                }
              : stat
          )
        } else {
          this.cardio = this.cardio.map((stat) =>
            stat._id === id
              ? {
                  ...stat,
                  pressure: newPressure,
                  pulse: newPulse,
                  timeOfDay,
                  isReceived,
                  notReceivedReason,
                }
              : stat
          )
        }

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

  async editSymptom(
    symptom: {
      cardiovascular: string[]
      nonCardiovascular: string
      isAbsent: boolean
    },
    id: string,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await editSymptom(symptom, id, isReceived, notReceivedReason)

      runInAction(() => {
        if (isReceived) {
          this.symptoms = this.symptoms.map((stat) =>
            stat._id === id ? { ...stat, symptom: { ...symptom } } : stat
          )
        } else {
          this.symptoms = this.symptoms.map((stat) =>
            stat._id === id
              ? {
                  ...stat,
                  symptom: { ...symptom },
                  isReceived,
                  notReceivedReason,
                }
              : stat
          )
        }
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

  async editHabit(
    repeatability: number,
    id: string,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await StatsService.editHabit(
        repeatability,
        id,
        isReceived,
        notReceivedReason
      )

      runInAction(() => {
        if (isReceived) {
          this.habits = this.habits.map((stat) =>
            stat._id === id ? { ...stat, repeatability } : stat
          )
        } else {
          this.habits = this.habits.map((stat) =>
            stat._id === id
              ? { ...stat, repeatability, isReceived, notReceivedReason }
              : stat
          )
        }
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

  async editRecommendation(
    repeatability: number,
    id: string,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await StatsService.editRecommendation(
        repeatability,
        id,
        isReceived,
        notReceivedReason
      )

      runInAction(() => {
        if (isReceived) {
          this.recommendations = this.recommendations.map((stat) =>
            stat._id === id ? { ...stat, repeatability } : stat
          )
        } else {
          this.recommendations = this.recommendations.map((stat) =>
            stat._id === id
              ? { ...stat, repeatability, isReceived, notReceivedReason }
              : stat
          )
        }
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

  async editDrug(
    drug: 'Taken' | 'Not taken' | '',
    id: string,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await StatsService.editDrug(drug, id, isReceived, notReceivedReason)

      runInAction(() => {
        if (isReceived) {
          this.drugs = this.drugs.map((stat) =>
            stat._id === id ? { ...stat, drug } : stat
          )
        } else {
          this.drugs = this.drugs.map((stat) =>
            stat._id === id
              ? { ...stat, drug, isReceived, notReceivedReason }
              : stat
          )
        }
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

  async editCheckin(
    checkinCheckboxes: string[],
    additionally: string,
    id: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await editCheckin(checkinCheckboxes, additionally, id)

      runInAction(() => {
        this.checkins = this.checkins.map((stat) =>
          stat._id === id
            ? {
                ...stat,
                checkinCheckboxes,
                additionally,
              }
            : stat
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

  async editStat(
    value: string | number,
    storeStatsType: string,
    type: string,
    id: string,
    isReceived?: boolean,
    notReceivedReason?: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      await editStat(value, type, id, isReceived, notReceivedReason)

      runInAction(() => {
        if (isReceived) {
          this[storeStatsType] = this[storeStatsType].map((stat) =>
            stat._id === id ? { ...stat, [type]: value } : stat
          )
        } else {
          this[storeStatsType] = this[storeStatsType].map((stat) =>
            stat._id === id
              ? { ...stat, [type]: value, isReceived, notReceivedReason }
              : stat
          )
        }

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

  async deleteStat(
    id: string,
    kitId: string,
    clientNumber: string,
    stat: string,
    day: string,
    type: string,
    checkin: string
  ): Promise<void> {
    this.requestInitialState.loading = true

    try {
      const { fillingSuccess } = await deleteStat(
        id,
        kitId,
        clientNumber,
        day,
        type,
        chatStore.currentChat._id,
        checkin
      )

      runInAction(() => {
        if (fillingSuccess) chatStore.updateFillingSuccess(fillingSuccess)
        this[stat] = this[stat].filter((item) => item._id !== id)
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

export default new StatsStore()
