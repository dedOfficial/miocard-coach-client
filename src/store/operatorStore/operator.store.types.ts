import { EAllowedTitleOperatorDashboard } from '../../components/operators/constants'

export interface OperatorChatLinkType {
  _id: string
  shortKey: string
  dummyName: string
}

export interface OperatorWithAssignedType {
  _id: string
  assignedChats: Array<OperatorChatLinkType>
  name: string
  email: string
  basicInfo: string
  avatar: string
  type: OperatorForChat | ''
  phoneNumber: string
}

export interface FilteredChatsType {
  _id: string
  dummyName: string
  type: OperatorForChat
  assigned?: { _id: string; name: string }
}

export type OperatorType = {
  createdAt: string
  email: string
  basicInfo: string
  avatar?: string
  type: OperatorForChat
  isSuperadmin: boolean
  name: string
  updatedAt: string
  __v: number
  _id: string
}

export type DeleteOperatorType = {
  name: string
  email: string
  _id: string
  type: string
}

export type OperatorTaskType = {
  _id: string
  operatorId: string
  task: string
  createdAt: string
  updatedAt: string
}

export type OperatorTemplateType = {
  _id: string
  name: string
  text: string
  createdAt: string
  updatedAt: string
}

export type DeleteTemplateType = {
  templateName: string
  id: string
}

export type OperatorCheckinType = {
  isLate?: boolean
  isInterrupt?: boolean
  isNotGetInTouch?: boolean
  isPostpone?: boolean
  isRushes?: boolean
  isComplain?: boolean
  isProblems?: boolean
  isLongTime?: boolean
  isNotParticipate?: boolean
  isBusy?: boolean
  additionally?: Array<string>
  __v: number
  _id: string
  chatId: string
  checkinNumber: number
  createdAt: string
  updatedAt: string
}

export type CurrentCheckinsType = Omit<
  OperatorCheckinType,
  '__v' | 'createdAt' | 'updatedAt'
>

export enum OperatorForChat {
  COACH = 'coach',
  ASSISTANT = 'assistant',
}

export type DashboardStatPeriodType = {
  period: string
  current: number
  previous: number
  highlight: string
  minNorm: number
}

export type DashboardProblemsPeriodType = {
  completedSession: number
  highlight: string
  maxLimit: number
  period: string
  problems: number
}

export type DashboardHabitsPeriodType = {
  period: string
  difference: number
}

export type DashboardMeasurementsType = {
  title: EAllowedTitleOperatorDashboard
  data: {
    name?: string
    operatorId?: string
    statistics: Array<DashboardStatPeriodType>
  }
}

export type DashboardProblemsType = {
  title: EAllowedTitleOperatorDashboard
  data: {
    _id: string
    dummyName: string
    week: DashboardProblemsPeriodType
    month: DashboardProblemsPeriodType
  }
}

export type DashboardHabitsType = {
  title: EAllowedTitleOperatorDashboard
  data: Array<DashboardHabitsPeriodType>
}

export type DashboardPeriodTypes =
  | DashboardStatPeriodType
  | DashboardProblemsPeriodType
  | DashboardHabitsPeriodType

export type DashboardTypes =
  | DashboardMeasurementsType
  | DashboardProblemsType
  | DashboardHabitsType

export type HabitsStatsPeriodType = {
  period: string
  current: number
  previous: number
  highlight: string
  maxLimit: number
}

export type RecommendationsStatsPeriodType = {
  period: string
  current: number
  previous: number
  highlight: string
  minNorm: number
}

export type DrugsStatsPeriodType = {
  period: string
  current: number
  previous: number
  highlight: string | null
}

export type DashboardStatsPeriodTypes =
  | HabitsStatsPeriodType
  | RecommendationsStatsPeriodType
  | DrugsStatsPeriodType

export type HabitsStatsDataType = {
  name: string
  statistics: Array<HabitsStatsPeriodType>
}

export type RecommendationsStatsDataType = {
  name: string
  statistics: Array<RecommendationsStatsPeriodType>
}

export type DrugsStatsDataType = {
  name: string
  statistics: Array<HabitsStatsPeriodType>
}

export type DashboardStatsDataType =
  | HabitsStatsDataType
  | RecommendationsStatsDataType
  | DrugsStatsDataType

export type HabitsStatsType = {
  chatName: string
  data: Array<HabitsStatsDataType>
}

export type RecommendationsStatsType = {
  chatName: string
  data: Array<RecommendationsStatsDataType>
}

export type DrugsStatsType = {
  chatName: string
  data: Array<DrugsStatsDataType>
}

export type DashboardStatsTypes =
  | HabitsStatsType
  | RecommendationsStatsType
  | DrugsStatsType

export type DashboardStatsType = {
  habits: Array<HabitsStatsType>
  recommendations: Array<RecommendationsStatsType>
  drugs: Array<DrugsStatsType>
}
