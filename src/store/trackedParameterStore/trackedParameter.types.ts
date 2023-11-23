export type TrackedParameterType = {
  trackingName: string
  trackingParameter: string
  value: number | string
  percentage?: boolean
}

export enum TrackedParameter {
  return = 'patient-return',
  measurements = 'measurements',
  problems = 'checkin-problems',
  collection = 'data-collection',
}

export enum ReturnValue {
  trackingName = 'Patient return',
  trackingParameter = 'Patient return',
}

export enum MeasurementsValue {
  trackingName = 'BP measurements control',
  trackingParameter = 'BP measurements control',
}

export enum ProblemsValue {
  trackingName = 'Check-in problems',
  trackingParameter = 'Check-in problems',
}

export enum CollectionValue {
  trackingName = 'Data collection',
  trackingParameter = 'Data collection',
}
