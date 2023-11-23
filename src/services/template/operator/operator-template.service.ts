import { api } from '../../api-client'
import { NewOperatorTemplateType } from '../../../routes/boardRoute/boardRoute.types'
import { OperatorTemplateType } from '../../../store/operatorStore/operator.store.types'

/* eslint-disable import/prefer-default-export */
export const newOperatorTemplate = async ({
  name,
  text,
}: NewOperatorTemplateType): Promise<OperatorTemplateType> =>
  api
    .post('message/', {
      json: {
        name,
        text,
      },
    })
    .json()

export async function deleteOperatorTemplate(_id: string): Promise<void> {
  await api.delete('message', {
    json: {
      id: _id,
    },
  })
}
