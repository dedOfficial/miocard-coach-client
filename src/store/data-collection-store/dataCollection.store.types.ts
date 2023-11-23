export interface StatisticsType {
  period: 'week' | 'month'
  current: number
  previous: number
  minNorm: number
  highlight?: string
}

export interface CoachType {
  name: string
  operatorId: string
  statistics: Array<StatisticsType>
}

export interface CollectionType {
  wholeProject: {
    statistics: Array<StatisticsType>
  }
  coaches: Array<CoachType>
  minNorm: number
}

export interface ChatType {
  name: string
  shortKey: string
  statistics: Array<StatisticsType>
}

export interface CollectionCoachChatsType {
  chats: Array<ChatType>
  minNorm: number
}
