export type NewOperatorDataType = {
  name: string
  email: string
  _id?: string
  basicInfo?: string
  phoneNumber: string
  type: string
}

export type NewOperatorTaskType = {
  operatorId: string
  task: string
}

export type NewOperatorTemplateType = {
  name: string
  text: string
}

export type TemplateDataType = {
  id?: string
  name: string
  text: string
}

export type NewDoctorDataType = {
  name: string
  email: string
  number: string
  id?: string
}
