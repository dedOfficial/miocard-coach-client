/* eslint-disable import/prefer-default-export */
import { KeyResultForSelectType } from '../../../store/objectiveStore/objectives.store.types'

export const defaultSelectedState: KeyResultForSelectType = {
  name: '',
  order: 0,
  trackingParameter: '',
  firstNormValue: {
    value: 0,
    percentage: true,
  },
}
