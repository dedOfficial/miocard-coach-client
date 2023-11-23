/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import {
  addCardio,
  distinctCardio,
  getCardio,
  editCardio,
} from './cardio/cardio-stat.service'
import {
  addCheckin,
  distinctCheckin,
  getCheckins,
  editCheckin,
} from './checkins/checkin-stat.service'
import {
  addHabit,
  distinctHabit,
  getHabits,
  editHabit,
} from './habits/habits-stat.service'
import {
  addRecommendation,
  distinctRecommendation,
  getRecommendations,
  editRecommendation,
} from './recommendations/recommendations-stat.service'
import {
  addDrug,
  distinctDrug,
  getDrugs,
  editDrug,
} from './drugs/drugs-stat.service'
import { addFood, distinctFood, getFood } from './food/food-stat.service'
import { addMood, distinctMood, getMood } from './mood/mood-stat.service'
import { addNotes, distinctNotes, getNotes } from './notes/notes-stat.service'
import {
  addSymptom,
  editSymptom,
  distinctSymptom,
  getSymptoms,
} from './symptoms/symptoms-stat.service'
import {
  addWalkedDistance,
  distinctWalkedDistance,
  getWalkedDistances,
} from './walked-dist/walked-dist-stat.service'
import {
  addWeight,
  distinctWeight,
  getWeight,
} from './weight/weight-stat.service'
import { TStatsStoreTypes } from '../../store/statsStore/stats.store.types'

export async function getCurrentStats(
  clientNumber: string,
  date: string
): Promise<TStatsStoreTypes> {
  return api.get(`stats/?clientNumber=${clientNumber}&date=${date}`).json()
}

export async function editStat(
  value: string | number,
  type: string,
  id: string,
  isReceived?: boolean,
  notReceivedReason?: string
): Promise<any> {
  return api
    .patch(`stats/${type}`, {
      json: {
        [type]: value,
        id,
        isReceived,
        notReceivedReason,
      },
    })
    .json()
}

export async function deleteStat(
  id: string,
  kitId: string,
  clientNumber: string,
  day: string,
  type: string,
  chatId: string,
  checkin: string
): Promise<any> {
  return api
    .delete(`stats/${type}`, {
      json: {
        id,
        kitId,
        clientNumber,
        chatId,
        day,
        checkin,
      },
    })
    .json()
}

export {
  addCardio,
  distinctCardio,
  getCardio,
  editCardio,
  addCheckin,
  distinctCheckin,
  getCheckins,
  editCheckin,
  addHabit,
  distinctHabit,
  getHabits,
  editHabit,
  addRecommendation,
  distinctRecommendation,
  getRecommendations,
  editRecommendation,
  addDrug,
  distinctDrug,
  getDrugs,
  editDrug,
  addFood,
  distinctFood,
  getFood,
  addMood,
  distinctMood,
  getMood,
  addNotes,
  distinctNotes,
  getNotes,
  addSymptom,
  editSymptom,
  distinctSymptom,
  getSymptoms,
  addWalkedDistance,
  distinctWalkedDistance,
  getWalkedDistances,
  addWeight,
  distinctWeight,
  getWeight,
}
