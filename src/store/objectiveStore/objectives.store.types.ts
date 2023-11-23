export type ObjectivesListType = {
  _id: string
  name: string
  achievement: number
}

export type ObjectiveType = Omit<ObjectivesListType, 'achievement'> & {
  keyResults: Array<KeyResultType>
}

export type KeyResultType = {
  name: string
  trackingParameter: string
  firstNormValue: {
    value: number
    percentage: boolean
  }
  secondNormValue?: {
    value: number
    percentage: boolean
  }
}

export type KeyResultForSelectType = {
  order: number
  name: string
  trackingParameter: string
  firstNormValue: {
    value: number | string
    percentage: boolean
  }
  secondNormValue?: {
    value: number | string
    percentage: boolean
  }
}

export type NewObjectiveType = Pick<ObjectiveType, 'name' | 'keyResults'>

export type PressureWeekType = [{ systolic: number }, { diastolic: number }]

export type PressureMonthType = [
  { systolic: number; norm: number; highlighted: string },
  { diastolic: number; norm: number; highlighted: string }
]

export type HabitsWeekType = [{ actual: number }]

export type HabitsMonthType = [
  { actual: number; norm: number; highlighted: string }
]

export type ProblemsPeriodType = [
  { actual: number; 'max limit': number; highlighted: string }
]

export type StatPeriodWeekType = [{ actual: number }]

export type StatPeriodMonthType = [
  { actual: number; norm: number; highlighted: string }
]

export type StatPeriodType = StatPeriodWeekType | StatPeriodMonthType

export type BPResultsDataType = {
  week: PressureWeekType
  month: PressureMonthType
}

export type BPMeasurementsResultsDataType = {
  week: StatPeriodType
  month: StatPeriodType
}

export type HabitsResultsDataType = {
  week: StatPeriodType
  month: StatPeriodType
}

export type RecommendationsResultsDataType = {
  week: StatPeriodType
  month: StatPeriodType
}

export type ReturnResultsDataType = {
  week: StatPeriodType
  month: StatPeriodType
}

export type ProblemsResultsDataType = {
  week: StatPeriodType
  month: StatPeriodType
}

export type ResultsPeriodType =
  | PressureWeekType
  | PressureMonthType
  | StatPeriodType

export type ResultsDataType =
  | BPResultsDataType
  | BPMeasurementsResultsDataType
  | HabitsResultsDataType
  | RecommendationsResultsDataType
  | ProblemsResultsDataType
  | ReturnResultsDataType

export type ResultsAchievementType = {
  name: string
  type: string
  data: ResultsDataType
}

export type DataByOperatorType = {
  name: string
  week: ResultsPeriodType
  month: ResultsPeriodType
  operatorId?: string
  assistantId?: string
}

export type ResultsByOperatorsType = {
  type: string
  data: [] | [[], []]
}
