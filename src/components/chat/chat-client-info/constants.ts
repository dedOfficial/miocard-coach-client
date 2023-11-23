export type CurrentSectionType = {
  notes: boolean
  attendance: boolean
  personal: boolean
  medical: boolean
}

export const initialSection: CurrentSectionType = {
  notes: false,
  attendance: false,
  personal: true,
  medical: false,
}

export type ClientInfoType = {
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
  additionalInformation?: string
  weight?: { recommended?: number | string; current?: number | string }
  height?: number | string
  habits?: Array<{
    id?: string
    name?: string
    repeatability?: number | string
    limit?: number | string
  }>
  recommendations?: Array<{
    id?: string
    name?: string
    min?: number
  }>
  bmi?: number
  drugs?: Array<{
    id?: string
    type?: string
    name?: string
    dosage?: string
    regularity?: {
      value?: string
      additional?: string
    }
    frequency?: {
      value?: string
      additional?: string
    }
    indication?: string
  }>
  diseases?: {
    cardiovascularDiseases?: string[]
    relativeDiseases?: string[]
    chronicDiseases?: string[]
    otherDiseases?: string
  }
  checkinsPerWeek?: number | string
  assistantCheckinsPerWeek?: number | string
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

export const initialJobDescriptions = [
  'Do not work',
  'Mainly associated with mental activity',
  'Mainly associated with physical activity',
  'Work at home',
  'Often has business trips to other countries',
]

export const initialCardioDiseases = [
  'None',
  'Prehypertension',
  'Hypertension (high blood pressure)',
  'Hypotension (low blood pressure)',
  'Ischemic heart disease (heart attack)',
  'Disorders of cerebral circulation (stroke)',
  'Congenital heart defects',
  'Cardiomyopathy',
  'Rhytm and conduction disorders',
]

export const initialRelativeDiseases = [
  'None',
  'Grandparent, aunt/uncle, cousins',
  'Parents, brother/sister, or own child',
]
export const initialChronicDiseases = [
  'Raspiratory diseases (bronchitis, asthma, etc.)',
  'Diseases of the genitourinary system (renal failure, cystitis, etc.)',
  'Diseases of the digestive system (ulcer, pancreatitis, gallstone disease, gastritis, etc.)',
  'Mental illness (bipolar affective disorder, depression, schizophrenia, etc.)',
  'Endocrine diseases (diabetes, Itsenko-Cushing, Nodular goiter, etc.)',
  'Oncology (write Another answer which of oncology)',
]
