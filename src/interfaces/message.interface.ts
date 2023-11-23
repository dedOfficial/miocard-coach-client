import { ChatMessages } from '../store/chatStore/chat.store.types'

export default interface Message {
  body: ChatMessages['body']
  type: 'user' | 'operator' | 'system' | 'doctor' | 'image'
  date: ChatMessages['createdAt']
  userError?: ChatMessages['userError']
  _id?: ChatMessages['_id']
  unresponsive?: boolean
  repliedMessageId?: string
  repliedMessageBody?: string
  isUserChat?: boolean
}
