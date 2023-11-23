import Message from '../../../interfaces/message.interface'

// eslint-disable-next-line import/prefer-default-export
export const chatMessagesValidation = (
  type: Message['type'],
  body: Message['body']
): boolean =>
  type === 'system' &&
  body !== 'Widget cancelled.' &&
  !body.includes('response') &&
  body !== 'The client has connected to the chat.'
