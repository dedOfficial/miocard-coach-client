import { DeleteOperatorType } from '../../../store/operatorStore/operator.store.types'
import { NewOperatorDataType } from '../boardRoute.types'

export const defaultOperatorData: Omit<NewOperatorDataType, 'token'> = {
  name: '',
  email: '',
  _id: '',
  phoneNumber: '',
  type: '',
}

export const initialDeleteOperatorData: DeleteOperatorType = {
  name: '',
  email: '',
  _id: '',
  type: '',
}

export default {}
