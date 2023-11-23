/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import keyBy from 'lodash-es/keyBy'
import Message from '../interfaces/message.interface'

export const toIdsMap = <T extends Record<string, any>>(
  items: T,
  idKey = '_id'
): Dictionary<T[keyof T]> => keyBy(items, idKey)

export const objectValueToArray = (object: Dictionary<Message>): Message[] =>
  Object.values(object)

export const checkToEmptyString = (text: string): number => text.trim().length
