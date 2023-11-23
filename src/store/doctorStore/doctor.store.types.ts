export type DoctorType = {
  createdAt: string
  number: string
  name: string
  email: string
  avatar?: string
  updatedAt: string
  __v: number
  _id: string
}

export type DeleteDoctorType = {
  id: string
  name: string
}
