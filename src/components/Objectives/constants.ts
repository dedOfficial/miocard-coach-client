/* eslint-disable @typescript-eslint/no-unused-vars */
export enum EKeyResultsType {
  BLOOD_PRESSURE = 'Blood pressure',
  BP_MEASUREMENTS_FREQUENCY = 'BP measurements frequency',
  PATIENT_RETURN = 'Patient return',
  CHECKIN_PROBLEMS = 'Check-in problems',
  HABITS = 'Repeatability of the habits',
  RECOMMENDATIONS = 'Recommendations to follow',
  SELF_EFFICACY = 'Patient self-efficacy',
}

export enum EAllowedBlockTitle {
  THIS_WEEK_PERCENTAGE = 'This week (%)',
  THIS_WEEK_TIMES = 'This week (times)',
  THIS_WEEK_MMHG = 'This week (mmHg)',
  WEEKLY_REPETITIONS_PERCENTAGE = 'Weekly repetitions (%)',
  THIS_MONTH_PERCENTAGE = 'This month (%)',
  THIS_MONTH_TIMES = 'This month (times)',
  THIS_MONTH_MMHG = 'This month (mmHg)',
  MONTLY_REPETITIONS_PERCENTAGE = 'Monthly repetitions (%)',
}

export enum EAllowedElementTitle {
  SYSTOLIC = 'Systolic',
  DIASTOLIC = 'Diastolic',
  ACTUAL = 'Actual',
  NORM = 'Norm',
  MAX_LIMIT = 'Max limit',
}

export enum EHighlightedColor {
  BLACK = 'black',
  GREEN = 'green',
  RED = 'red',
}

export const keyResultsOptionsList = Object.entries(EKeyResultsType).map(
  ([key, value]) => value
)

export default {}
