export interface ProblemsPeriodType {
  period: string
  problems: number
  completedSession: number
  highlight: string
  maxLimit: number
}

export interface ProblemsType {
  _id: string
  dummyName: string
  week: ProblemsPeriodType
  month: ProblemsPeriodType
}

export interface ProblemsByChat {
  _id: string
  checkinsList: {
    first?: Array<{
      _id: string
      checkinCheckboxes: string[]
      checkin: string
      createdAt: string
    }>
    second?: Array<{
      _id: string
      checkinCheckboxes: string[]
      checkin: string
      createdAt: string
    }>
  }
}
