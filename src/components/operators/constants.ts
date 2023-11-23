export enum EAllowedTitleOperatorDashboard {
  PATIENT_RETURN = 'Patient return',
  DATA_COLLECTION = 'Data collection (average)',
  MEASUREMENTS = 'BP measurements frequency',
  CHECKIN_PROBLEMS = 'Check-in problems',
  HABITS = 'Repeatability of bad habits',
  RECOMMENDATIONS = 'Repeatability of recommendations to follow',
  MEDICATIONS = 'Medication intake',
}

export enum EAllowedTitleBlockOperatorDashboard {
  WEEKLY_PERCENTAGE = 'Weekly (%)',
  WEEKLY_ACHIEVEMENT_PERCENTAGE = 'Weekly Achievement (%)',
  WEEKLY = 'Weekly',
  WEEKLY_TIMES = 'Weekly (times)',
  THIS_WEEK_PERCENTAGE = 'This week (%)',
  MONTHLY_PERCENTAGE = 'Monthly (%)',
  MONTHLY_ACHIEVEMENT_PERCENTAGE = 'Monthly Achievement (%)',
  MONTHLY = 'Monthly',
  MONTHLY_TIMES = 'Monthly (times)',
  THIS_MONTH_PERCENTAGE = 'This month (%)',
}

export enum EAllowedAdditionalTitleBlock {
  THIS_WEEK = 'This week',
  THIS_MONTH = 'This month',
  PREVIOUS_WEEK = 'Previous week',
  PREVIOUS_MONTH = 'Previous month',
  MIN_NORM = 'Min norm',
  MAX_LIMIT = 'Max limit',
  PROBLEMS = 'Problems',
  COMPLETED = 'Completed',
  ACTUAL = 'Actual',
}

export const EDashboardSection = {
  [EAllowedTitleOperatorDashboard.PATIENT_RETURN]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.WEEKLY_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_WEEK,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_WEEK,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.MONTHLY_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_MONTH,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_MONTH,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    path: 'patient-return',
  },
  [EAllowedTitleOperatorDashboard.DATA_COLLECTION]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.WEEKLY_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_WEEK,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_WEEK,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.MONTHLY_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_MONTH,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_MONTH,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    path: 'data-collection',
  },
  [EAllowedTitleOperatorDashboard.MEASUREMENTS]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.WEEKLY_TIMES,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_WEEK,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_WEEK,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.MONTHLY_TIMES,
      firstTitle: EAllowedAdditionalTitleBlock.THIS_MONTH,
      secondTitle: EAllowedAdditionalTitleBlock.PREVIOUS_MONTH,
      thirdTitle: EAllowedAdditionalTitleBlock.MIN_NORM,
    },
    path: 'measurements',
  },
  [EAllowedTitleOperatorDashboard.CHECKIN_PROBLEMS]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.WEEKLY,
      firstTitle: EAllowedAdditionalTitleBlock.PROBLEMS,
      secondTitle: EAllowedAdditionalTitleBlock.COMPLETED,
      thirdTitle: EAllowedAdditionalTitleBlock.MAX_LIMIT,
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.MONTHLY,
      firstTitle: EAllowedAdditionalTitleBlock.PROBLEMS,
      secondTitle: EAllowedAdditionalTitleBlock.COMPLETED,
      thirdTitle: EAllowedAdditionalTitleBlock.MAX_LIMIT,
    },
    path: 'checkin-problems',
  },
  [EAllowedTitleOperatorDashboard.HABITS]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_WEEK_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_MONTH_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    path: 'habits',
  },
  [EAllowedTitleOperatorDashboard.RECOMMENDATIONS]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_WEEK_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_MONTH_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    path: 'recommendations',
  },
  [EAllowedTitleOperatorDashboard.MEDICATIONS]: {
    firstBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_WEEK_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    secondBlock: {
      generalTitle: EAllowedTitleBlockOperatorDashboard.THIS_MONTH_PERCENTAGE,
      firstTitle: EAllowedAdditionalTitleBlock.ACTUAL,
      secondTitle: '',
      thirdTitle: '',
    },
    path: 'drugs',
  },
}
