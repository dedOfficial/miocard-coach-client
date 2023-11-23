export interface MeasurementsStatsType {
  period: 'week' | 'month'
  current: number
  highlight: string
  minNorm: number
  previous: number
}

export interface MeasurementsCoachesType {
  name: string
  operatorId: string
  statistics: MeasurementsStatsType[]
}

export interface MeasurementsType {
  coaches: MeasurementsCoachesType[]
  minNorm: number
}

export interface MeasurementsChatsType {
  name: string
  shortKey: string
  statistics: MeasurementsStatsType[]
}

export interface MeasurementsCoachChatsType {
  chats: MeasurementsChatsType[]
  minNorm: number
}
