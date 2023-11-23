/* eslint-disable import/prefer-default-export */
import { generateId } from '../../../../../helpers/chat/chat.helper'

export type InitialNewHabit = {
  id: string
  name: string
  repeatability: number | string
  limit: number | string
}

export const initialNewHabit: InitialNewHabit = {
  id: generateId(),
  name: '',
  repeatability: '',
  limit: '',
}

export type InitialTestResults = {
  id: string
  name: string
  text: string
}

export const initialTestResults: InitialTestResults = {
  id: generateId(),
  name: '',
  text: '',
}

export type InitialNewRecommend = {
  id: string
  name: string
  min: number | string
}

export const initialNewRecommend: InitialNewRecommend = {
  id: generateId(),
  name: '',
  min: '',
}
