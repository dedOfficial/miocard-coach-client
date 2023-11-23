import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory, useParams } from 'react-router-dom'
import { omit, get, set } from 'lodash-es'

import TemplateName from '../../Input/TemplateName'
import ActionButton from '../../controls/action-btn'
import {
  ObjectiveType,
  KeyResultForSelectType,
} from '../../../store/objectiveStore/objectives.store.types'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import objectivesStore from '../../../store/objectiveStore/objectives.store'
import accountStore from '../../../store/accountStore/account.store'
import DragAndDrop from '../../dnd/Objectives'
import { keyResultsOptionsList, EKeyResultsType } from '../constants'

import * as S from './style'

const EditObjective: React.FC = () => {
  const { currentObjective } = objectivesStore
  const [objective, setObjective] = useState<ObjectiveType>({
    _id: '',
    keyResults: [],
    name: '',
  })
  const [keyResults, setKeyResults] = useState<KeyResultForSelectType[]>([])

  const { id } = useParams<{ id: string }>()

  const navigate = useHistory()

  useEffect(() => {
    if (accountStore.userToken) {
      objectivesStore.fetchObjectiveById(id)
    }
  }, [id])

  useEffect(() => {
    setObjective({ ...currentObjective })
    const defaultKeyResults: Array<KeyResultForSelectType> =
      currentObjective.keyResults.map((key, index) => {
        return Object.assign(key, { order: index })
      })
    setKeyResults(defaultKeyResults)
  }, [currentObjective])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setObjective({ ...objective, name: e.target.value })
  }

  const handleAddNewKeyResult = () => {
    setKeyResults([
      ...keyResults,
      {
        order: keyResults.length,
        name: '',
        trackingParameter: keyResultsOptionsList[0],
        firstNormValue: { value: '0', percentage: true },
        secondNormValue: { value: '0', percentage: true },
      },
    ])
  }

  const setKeyResultsList = (value: KeyResultForSelectType[]) => {
    setKeyResults(value)
  }

  const sortKeyResults = (
    a: KeyResultForSelectType,
    b: KeyResultForSelectType
  ): number => {
    if (a.order > b.order) return 1
    return -1
  }

  const handleSaveObjective = async () => {
    await objectivesStore.patchObjective({
      ...objective,
      keyResults: keyResults.map((item) => {
        let newItem = omit(item, 'order')

        const parameter = item.trackingParameter
        const isCheckinProblems = parameter === EKeyResultsType.CHECKIN_PROBLEMS
        const isPatientReturn = parameter === EKeyResultsType.PATIENT_RETURN
        const isBloodPressure = parameter === EKeyResultsType.BLOOD_PRESSURE
        const isProblemsOrReturn = isCheckinProblems || isPatientReturn

        set(
          newItem,
          'firstNormValue.value',
          Number(get(newItem, 'firstNormValue.value'))
        )

        if (isProblemsOrReturn) {
          set(newItem, 'firstNormValue.percentage', false)
        }

        if (isBloodPressure) {
          set(
            newItem,
            'secondNormValue.value',
            Number(get(newItem, 'secondNormValue.value'))
          )
        } else {
          newItem = omit(newItem, 'secondNormValue')
        }

        return newItem
      }),
    })
    navigate.goBack()
  }

  const handleCancelSubmit = () => {
    navigate.goBack()
  }

  const checkFillingParameters = useMemo(() => {
    const checkKeyResultName = () => {
      if (keyResults.length) {
        return keyResults.findIndex((item) => item.name === '') === -1
      }
      return false
    }
    return !!objective.name && checkKeyResultName()
  }, [keyResults, objective.name])

  return (
    <div className={S.listWrapper}>
      <TemplateName
        onChange={handleInputChange}
        value={objective.name}
        label="Objective name"
      />

      <section>
        <h2 className="font-medium mb-2">Key results:</h2>
        <div className={S.keyResultWrapper}>
          {!keyResults.length ? (
            <small className="text-gray-400">
              You have not added any tracked parameters yet.
            </small>
          ) : (
            <DragAndDrop
              list={keyResults}
              setList={setKeyResultsList}
              options={keyResultsOptionsList}
              sortRule={sortKeyResults}
              deletable
            />
          )}

          <div>
            <ActionButton
              label="Add key result"
              action={handleAddNewKeyResult}
              white
            />
          </div>
        </div>
      </section>

      <div>
        <hr />
        <GroupButtons
          onSubmit={handleSaveObjective}
          onSubmitLabel="Save Objective"
          onCancel={handleCancelSubmit}
          onCancelLabel="Cancel"
          disabled={!checkFillingParameters}
        />
      </div>
    </div>
  )
}

export default observer(EditObjective)
