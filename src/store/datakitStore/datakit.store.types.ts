export type KitCheckinType = {
  name: string
  options: string[]
  position: number
}

export type KitChatType = {
  id: string
  name: string
  fillingSuccess: number
}

export type DataKitType = {
  _id: string
  createdAt: Date
  updatedAt: Date
  name: string
  chats: KitChatType[]
  checkins: KitCheckinType[]
  fillingSuccess: number
}

export type AssignedChatType = {
  id: string
  name: string
}

export type EditDataKitType = Pick<DataKitType, 'name' | '_id' | 'checkins'>

export type NewDataKitType = Omit<
  DataKitType,
  '_id' | 'createdAt' | 'updatedAt' | 'chats' | 'fillingSuccess'
>

export type UpdateDataKitType = Pick<DataKitType, 'name' | 'checkins'>

export type CheckinForSelectType = {
  name: string
  order: number
  position: number
}
