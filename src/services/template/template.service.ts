/* eslint-disable import/prefer-default-export */
import { api } from '../api-client'
import { OperatorTemplateType } from '../../store/operatorStore/operator.store.types'
import {
  newOperatorTemplate,
  deleteOperatorTemplate,
} from './operator/operator-template.service'

export async function changeTemplate(
  id: string,
  name: string,
  text: string
): Promise<void> {
  await api.patch('message', {
    json: {
      name,
      text,
      id,
    },
  })
}

export async function getAllTemplates(): Promise<OperatorTemplateType[]> {
  return api.get('message/messages/').json()
}

export { newOperatorTemplate, deleteOperatorTemplate }
