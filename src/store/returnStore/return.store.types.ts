export interface ReturnStatsType {
  period: EPeriod
  current: number | null
  previous: number | null
  minNorm: number | null
  highlight?: string
}

export enum EPeriod {
  WEEK = 'week',
  MONTH = 'month',
}

export interface ReturnCoachesType {
  name: string
  operatorId: string
  statistics: ReturnStatsType[]
}

export interface ReturnType {
  coaches: ReturnCoachesType[]
  minNorm: number
  percentage: boolean
}

export interface ReturnChatsType {
  name: string
  shortKey: string
  statistics: ReturnStatsType[]
}

export interface ReturnCoachChatsType {
  chats: ReturnChatsType[]
  minNorm: number
  percentage: boolean
}
