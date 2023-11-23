import { api } from '../api-client'
import { TrackedParameterType } from '../../store/trackedParameterStore/trackedParameter.types'

export async function updateTrackedParameters(
  parameter: TrackedParameterType,
  trackedParameter: string
): Promise<any> {
  return api
    .post(`tracked_parameters/${trackedParameter}/parameter`, {
      json: {
        ...parameter,
      },
    })
    .json()
}

export default {}
