export type LastMessageType = {
  message: string
  fromOperator: boolean
  date: Date | string
}

export type ChatLastMessagesType = {
  [key: string]: LastMessageType
}

export type ChatType = {
  shortKey: string
  active: boolean
  unreadMessages: number
  type: string
  operatorId: string
  assistantId: string
  doctorId: string
  clientNumber: string
  dummyName: string
  weight?: { recommended?: number; current?: number }
  height?: number
  personalInfo?: {
    clientName?: string
    sex?: string
    dateOfBirth?: string
    age?: string
    nation?: string
    city?: string
    familyStatus?: string
    livesWith?: string
    levelOfEducation?: string
    jobProfession?: string
    jobDescription?: string[]
  }
  lifestyleAssessment?: string
  generalHealthRisks?: string
  score?: string
  bipq?: string
  food?: string
  stress?: string
  sleep?: string
  sport?: string
  badHabits?: string
  understanding?: string
  measurementErrors?: string
  eysenck1?: string
  eysenck2?: string
  eysenck3?: string
  eysenck4?: string
  bmi?: number
  drugs?: Array<{
    id?: string
    type?: string
    name?: string
    dosage?: string
    indication?: string
    regularity?: {
      value?: string
      additional?: string
    }
    frequency?: {
      value?: string
      additional?: string
    }
  }>
  habits?: Array<ChatHabit>
  diseases?: {
    cardiovascularDiseases?: string[]
    relativeDiseases?: string[]
    chronicDiseases?: string[]
    otherDiseases?: string
  }
  recommendations?: Array<ChatRecommendation>
  additionalInformation?: string
  kit: {
    id: string
    fillingSuccess: Array<{ date: string; value: number; total: number }>
  }
  checkinsPerWeek?: number
  assistantCheckinsPerWeek?: number
  selfEfficacy?: { norm?: number; current?: number; previous?: number }
  testResults?: Array<{
    id?: string
    name?: string
    text?: string
  }>
  bloodPressure?: {
    recommended?: {
      sys?: number
      dia?: number
    }
    comfortable?: {
      sys?: number
      dia?: number
    }
  }
  heartRate?: { recommended?: number; comfortable?: number }
  createdAt: string
  updatedAt: string
  __v: number
  _id: string
  kitCheckins: any
  dashboardStats?: Array<TChatCombineDashboard | TChatDashboard>
}

export type TChatDashboard = {
  title: string
  type: EAllowedDashboardType
  blocks: Array<{
    title: string
    categories: Array<{
      title?: string
      value: string | number
      highlighted?: 'green' | 'red'
    }>
  }>
}

export type TChatCombineDashboard = {
  title: string
  type: EAllowedDashboardType
  blocks: TChatDashboard[]
}

export type ChatHabit = {
  id?: string
  name?: string
  repeatability?: number
  limit?: number
}

export type ChatRecommendation = {
  id?: string
  name?: string
  min?: number
}

export type ChatMessages = {
  body: string
  chatId: string
  createdAt: string
  fromOperator: boolean
  fromDoctor: boolean
  updatedAt: string
  userError: boolean
  __v: number
  _id: string
  repliedMessageId?: string
  repliedMessageBody?: string
}

export type NewChatType = {
  clientNumber: string
  operatorId?: string
  assistantId?: string
  additionalInformation?: string
}

export type PatchChatType = {
  id: string
  personalInfo?: {
    clientName?: string
    sex?: string
    dateOfBirth?: string
    age?: string
    nation?: string
    city?: string
    familyStatus?: string
    livesWith?: string
    levelOfEducation?: string
    jobProfession?: string
    jobDescription?: string[]
  }
  additionalInformation?: string
  weight?: { recommended?: number | string; current?: number | string }
  height?: number | string
  habits?: Array<{
    id?: string
    name?: string
    repeatability?: number | string
    limit?: number | string
  }>
  bmi?: number
  drugs?: Array<{
    id?: string
    group?: string
    name?: string
    dose?: string
    time?: string
  }>
  diseases?: {
    cardiovascularDiseases?: string[]
    relativeDiseases?: string[]
    chronicDiseases?: string[]
    otherDiseases?: string
  }
  checkinsPerMonth?: number | string
  selfEfficacy?: {
    norm?: number | string
    current?: number | string
    previous?: number
  }
  testResults?: Array<{
    id?: string
    name?: string
    text?: string
  }>
  bloodPressure?: {
    recommended?: {
      sys?: number | string
      dia?: number | string
    }
    comfortable?: {
      sys?: number | string
      dia?: number | string
    }
  }
  heartRate?: { recommended?: number | string; comfortable?: number | string }
}

export type DeleteChatDataType = {
  chatName: string
  shortKey: string
}

export type DailyMeasurementType = {
  shortKey: string
  dummyName: string
  measurement: boolean
}

export enum EAllowedDashboardType {
  LARGE = 'large',
  SMALL = 'small',
  SMALL_MULTIPLE = 'small multiple',
}
