export type UserToken = string

export type User = {
  name: string
  email: string
  id: string
  type: string
  doctor: boolean
  isSuperadmin: boolean
}

export type UserOptions = {
  currentChatPage: number
  viewAllChats: boolean
}
