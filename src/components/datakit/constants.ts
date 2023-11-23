import {
  CheckinForSelectType,
  EditDataKitType,
  NewDataKitType,
} from '../../store/datakitStore/datakit.store.types'

export const newKitDefaultState: NewDataKitType = {
  name: '',
  checkins: [],
}

export const deleteKitDefaultState = {
  name: '',
  id: '',
}

export const defaultCheckinForSelect: CheckinForSelectType = {
  name: '',
  order: 0,
  position: 1,
}

export const editKitDefaultState: EditDataKitType = {
  _id: '',
  name: '',
  checkins: [],
}
