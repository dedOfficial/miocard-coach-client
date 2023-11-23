/* eslint-disable no-underscore-dangle */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from 'store/chatStore/chat.store'
import statsStore from '../../../../../store/statsStore/stats.store'
import {
  MealType,
  WeightType,
  NotesType,
  MoodType,
  DrugType,
  SymptomType,
  WalkedDistanceType,
  HabitType,
  RecommendationType,
  CardioType,
  ETimeOfDay,
} from '../../../../../store/statsStore/stats.store.types'
import ElementBox from './ElementBox'

interface StatElementProps {
  element:
    | CardioType
    | WeightType
    | MealType
    | HabitType
    | RecommendationType
    | DrugType
    | SymptomType
    | MoodType
    | NotesType
    | WalkedDistanceType
  type: string
  text?: string
  storeStatsType: string
  pressure?: string
  pulse?: string
  timeOfDay?: ETimeOfDay
  repeatability?: number
  drug?: DrugType['drug']
  handleEditModal
}

const StatElement: React.FC<StatElementProps> = ({
  element,
  type,
  text = '',
  storeStatsType,
  pressure,
  pulse,
  timeOfDay,
  repeatability,
  drug,
  handleEditModal,
}) => {
  const { clientNumber } = chatStore.currentChat
  const { id: kitId } = chatStore.currentChat.kit

  const removeStatsData = useCallback(
    async (id) => {
      await statsStore.deleteStat(
        id,
        kitId,
        clientNumber,
        storeStatsType,
        element.day,
        type,
        element.checkin
      )
    },
    [clientNumber, element, kitId, storeStatsType, type]
  )

  const value = useMemo(() => {
    if (!element.isReceived) return element.notReceivedReason
    if (type === 'cardio') {
      return `${timeOfDay}, ${pressure} mm/hg, ${pulse} bpm`
    }
    if (type === 'habit') {
      return `${repeatability}`
    }
    if (type === 'recommendation') {
      return `${repeatability}`
    }
    if (type === 'drug') {
      return `${drug}`
    }
    if (type === 'symptom') {
      return (element as SymptomType).symptom.isAbsent
        ? 'Symptoms are absent'
        : `${[
            ...(element as SymptomType).symptom.cardiovascular,
            (element as SymptomType).symptom.nonCardiovascular,
          ]
            .join(', ')
            .replace(/,\s*$/, '')}`
    }
    return `${element[type]} ${text}`
  }, [drug, element, pressure, pulse, repeatability, text, timeOfDay, type])

  return (
    <ElementBox
      time={element.time}
      value={value}
      onClickEdit={handleEditModal}
      onClickDelete={() => removeStatsData(element._id)}
    />
  )
}

export default observer(StatElement)
