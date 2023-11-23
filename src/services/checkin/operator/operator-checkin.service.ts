/* eslint-disable import/prefer-default-export */
import { api } from '../../api-client'
import { OperatorCheckinType } from '../../../store/operatorStore/operator.store.types'

export async function getOperatorCheckins(
  shortKey: string
): Promise<OperatorCheckinType[]> {
  return api.get(`checkin/${shortKey}`).json()
}
