/* eslint-disable import/prefer-default-export */
import omit from 'lodash-es/omit'
import { api } from '../api-client'
import {
  ChatMessages,
  ChatType,
  LastMessageType,
  NewChatType,
  PatchChatType,
} from '../../store/chatStore/chat.store.types'

export async function getAllChats(): Promise<ChatType[]> {
  return api.get('operator/chats/').json()
}

export async function getChats(operatorId: string): Promise<ChatType[]> {
  return api.get(`operator/chats/${operatorId}`).json()
}

export function markSeenMessages(shortKey: string): Promise<any> {
  return api
    .post('chat/mark_seen', {
      json: {
        shortKey,
      },
    })
    .json()
}

export async function getChatInfo(chatId: string): Promise<ChatType> {
  return api.get(`operator/chat_info/${chatId}`).json()
}

export async function getLastChatMessage(
  chatId: string
): Promise<LastMessageType> {
  return api
    .post('chat/last_message', {
      json: {
        chatId,
      },
    })
    .json()
}

export async function createChat({
  clientNumber,
  operatorId,
  assistantId,
  additionalInformation,
}: NewChatType): Promise<ChatType> {
  return api
    .post('operator/chat/', {
      json: {
        clientNumber,
        operatorId,
        assistantId,
        additionalInformation,
      },
    })
    .json()
}

export async function patchChat(data: PatchChatType): Promise<any> {
  return api
    .patch('operator/chat/', {
      json: omit(data, ['token']),
    })
    .json()
}

export async function deleteChat(id: string): Promise<any> {
  return api.delete('operator/chat/', {
    json: {
      id,
    },
  })
}

export async function getPartOfMessages(
  id: string,
  count: number
): Promise<ChatMessages[]> {
  return api.get(`operator/chat_messages/${id}/${count}`).json()
}

export async function getKitOptions(kitId: string): Promise<any> {
  return api.get(`kits/chat/${kitId}`).json()
}

export async function getDailyMeasurements(): Promise<any> {
  return api.get('chat/todays_measurements').json()
}

export async function getDashboard(chatId: string): Promise<any> {
  return api.get(`dashboard/${chatId}`).json()
}

export async function patchChatStatus(
  chatId: string,
  active: boolean
): Promise<any> {
  return api
    .patch('operator/chat/status', {
      json: {
        id: chatId,
        active,
      },
    })
    .json()
}

export async function checkPhoneNumber(clientNumber: string): Promise<any> {
  return api.get(`operator/chat/check/${clientNumber}`).json()
}
