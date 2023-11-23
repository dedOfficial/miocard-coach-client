import Message from '../../../interfaces/message.interface'

export interface ChatMessageItemProps {
  styleWrapper: 'TAILWIND_STRING'
  styleDate?: 'TAILWIND_STRING'
  body: Message['body']
  date: Message['date']
  onMouseUp?: () => void
  _id?: Message['_id']
  unresponsive?: Message['unresponsive']
  repliedMessageId?: Message['repliedMessageId']
  repliedMessageBody?: Message['repliedMessageBody']
  isUserChat?: Message['isUserChat']
}

export interface ChatMessageProps {
  body: Message['body']
  type: Message['type']
  date: Message['date']
  isOperator?: boolean
  _id?: Message['_id']
  unresponsive?: Message['unresponsive']
  repliedMessageId?: Message['repliedMessageId']
  repliedMessageBody?: Message['repliedMessageBody']
  isUserChat?: Message['isUserChat']
}

export enum EStatTypeParams {
  ADD_PRESSURE = 'addPressure',
  ADD_PULSE = 'addPulse',
  ADD_WEIGHT = 'addWeight',
  ADD_MOOD = 'addMood',
  ADD_FOOD = 'addFood',
  ADD_DRUG = 'addDrug',
  ADD_SYMPTOM = 'addSymptom',
  ADD_NOTES = 'addNotes',
}
