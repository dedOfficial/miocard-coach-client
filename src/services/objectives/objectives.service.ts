import { api } from '../api-client'
import {
  NewObjectiveType,
  ObjectivesListType,
  ObjectiveType,
  ResultsAchievementType,
} from '../../store/objectiveStore/objectives.store.types'

export function getObjectiveById(id: string): Promise<ObjectiveType> {
  return api.get(`objectives/${id}`).json()
}

export async function getAllObjectives(): Promise<ObjectivesListType[]> {
  return api.get('objectives/').json()
}

export function addObjective(
  newObjective: NewObjectiveType
): Promise<ObjectiveType> {
  return api
    .post('objectives/', {
      json: {
        ...newObjective,
      },
    })
    .json()
}

export function updateObjective({
  _id,
  name,
  keyResults,
}: ObjectiveType): Promise<ObjectiveType> {
  return api
    .patch('objectives/', {
      json: {
        id: _id,
        name,
        keyResults,
      },
    })
    .json()
}

export function deleteObjective(id: string): Promise<any> {
  return api
    .delete('objectives/', {
      json: {
        id,
      },
    })
    .json()
}

export function getResultsAchievement(
  objectiveId: string
): Promise<ResultsAchievementType[]> {
  return api
    .get(
      `objectives/key-results-achievement/${objectiveId}
`
    )
    .json()
}

export function getKeyResult(
  objectiveId: string,
  keyResultName: string
): Promise<any> {
  return api
    .get(
      `objectives/${objectiveId}/${keyResultName}

`
    )
    .json()
}

export default {}
