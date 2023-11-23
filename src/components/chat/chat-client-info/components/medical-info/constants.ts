/* eslint-disable import/prefer-default-export */
import { generateId } from '../../../../../helpers/chat/chat.helper'

export const initialNewDrug = {
  id: generateId(),
  type: '',
  name: '',
  dosage: '',
  regularity: {
    value: '',
    additional: '',
  },
  frequency: {
    value: '',
    additional: '',
  },
  indication: '',
}
