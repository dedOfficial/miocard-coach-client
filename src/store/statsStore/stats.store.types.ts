export type StatType = {
  __v: number
  _id: string
  chatId: string
  clientNumber: string
  createdAt: string
  updatedAt: string
  day: string
  time: string
  checkin: string
  isReceived?: boolean
  notReceivedReason?: string
}

export type CardioType = StatType & {
  timeOfDay: ETimeOfDay
  pressure: string
  pulse: string
}

export type HabitType = StatType & {
  habitId: string
  repeatability: number
}

export type RecommendationType = StatType & {
  recommendationId: string
  repeatability: number
}

export type MoodType = StatType & {
  mood: string
}

export type WalkedDistanceType = StatType & {
  walkedDistance: number
}

export type WeightType = StatType & {
  weight: number
}

export type MealType = StatType & {
  food: string
}

export type DrugType = StatType & {
  drug: 'Taken' | 'Not taken' | ''
  drugId: string
}

export type SymptomType = StatType & {
  symptom: {
    cardiovascular: string[]
    nonCardiovascular: string
    isAbsent: boolean
  }
}

export type NotesType = StatType & {
  notes: string
}

export type CheckinType = Omit<StatType, 'isReceived' | 'notReceivedReason'> & {
  checkinCheckboxes: string[]
  additionally?: string
}

export enum StoreStats {
  cardio = 'cardio',
  pulse = 'pulse',
  weight = 'weight',
  pressure = 'pressure',
  meals = 'meals',
  habits = 'habits',
  recommendations = 'recommendations',
  drugs = 'drugs',
  symptoms = 'symptoms',
  notes = 'notes',
  mood = 'mood',
  walkedDistances = 'walkedDistances',
  checkins = 'checkins',
}

export type StoreStatsDateType =
  | 'cardioDates'
  | 'pulseDates'
  | 'weightDates'
  | 'pressureDates'
  | 'mealDates'
  | 'habitDates'
  | 'recommendationDates'
  | 'drugDates'
  | 'symptomDates'
  | 'moodDates'
  | 'notesDates'
  | 'walkedDistanceDates'
  | 'checkinsDates'

export const initialCardiovascularSymptoms = [
  'Dyspnea',
  'Sweating',
  'Increased heartbeat',
  'Swelling of the face',
  'Black dots before eyes',
  'Numbness and chills',
  'Fatique',
  'Vertigo',
  'Blurry vision',
  'Nausea, vomiting',
]

export type TStatsStoreTypes = {
  cardio: Array<CardioType>
  weight: Array<WeightType>
  walkedDistances: Array<WalkedDistanceType>
  meals: Array<MealType>
  habits: Array<HabitType>
  drugs: Array<DrugType>
  symptoms: Array<SymptomType>
  notes: Array<NotesType>
  mood: Array<MoodType>
  checkins: Array<CheckinType>
}

export enum ETimeOfDay {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  EVENING = 'evening',
  NIGHT = 'night',
}
