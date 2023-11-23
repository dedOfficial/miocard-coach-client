import { v4 as uuidv4 } from 'uuid'

import { EMessageActions } from '../../components/chat/chatMessage/chatMessageActions/ChatMessageActions.types'
import chatStore from '../../store/chatStore/chat.store'
import { TCheckToUndefined, TRepliedMessage } from './chat.types'

export const checkRegExp = (str: string, regexp: RegExp): boolean =>
  regexp.test(str)

export const removeReplyChatMessage = (): void => {
  chatStore.removeReplyChatMessage()
  chatStore.setCurrentChatMessageAction(EMessageActions.NO_ACTION)
}

export const checkToUndefined = (text: string): TCheckToUndefined =>
  text === 'undefined' ? undefined : text

export const repliedMessage = (
  repliedMessageId: string,
  repliedMessageBody: string
): TRepliedMessage =>
  checkToUndefined(repliedMessageId)
    ? {
        repliedMessageId: checkToUndefined(repliedMessageId),
        repliedMessageBody: checkToUndefined(repliedMessageBody),
      }
    : undefined

export const generateId = (): string => uuidv4()
