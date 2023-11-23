/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import {
  CurrentCheckinsType,
  OperatorCheckinType,
} from '../../store/operatorStore/operator.store.types'
import { getOperatorCheckins } from './operator/operator-checkin.service'

export const updateCheckin = async (
  checkin: CurrentCheckinsType & {
    chekinNumber: number
  }
): Promise<OperatorCheckinType> =>
  api
    .patch('checkin/', {
      json: checkin,
    })
    .json()

export const addCheckin = async (
  checkin: CurrentCheckinsType & {
    chekinNumber: number
  }
): Promise<OperatorCheckinType> =>
  api
    .post('checkin/', {
      json: checkin,
    })
    .json()

export { getOperatorCheckins }
