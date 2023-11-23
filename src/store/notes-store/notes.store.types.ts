export interface UserType {
  operator: { name: string | null; avatar: string | null | undefined }
  assistant: { name: string | null; avatar: string | null | undefined }
}

export interface NoteType {
  _id: string
  clientNumber: string
  type: string
  message: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface NotesType {
  users: UserType
  notes: Array<NoteType>
}
