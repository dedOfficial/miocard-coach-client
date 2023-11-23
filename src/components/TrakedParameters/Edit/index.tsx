import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import checkinProblemsStore from 'store/checkinProblemsStore/checkinProblems.store'
import {
  CollectionValue,
  MeasurementsValue,
  ProblemsValue,
  ReturnValue,
  TrackedParameter,
  TrackedParameterType,
} from '../../../store/trackedParameterStore/trackedParameter.types'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import dataCollectionStore from '../../../store/data-collection-store/dataCollection.store'
import returnStore from '../../../store/returnStore/return.store'
import measurementsStore from '../../../store/measurementsStore/measurements.store'
import trackedParametersStore from '../../../store/trackedParameterStore/trackedParameter.store'
import {
  editTrackedContainerStyle,
  editTrackedWrapStyle,
  styledInput,
} from './styles'

const EditTrackedParameters: FC = () => {
  const { trackedParameter } = useParams<{ trackedParameter: string }>()

  const navigate = useHistory()

  const [parameter, setParameter] = useState<TrackedParameterType>({
    trackingName: '',
    trackingParameter: '',
    value: '',
  })

  useEffect(() => {
    switch (trackedParameter) {
      case TrackedParameter.return:
        setParameter({
          trackingName: ReturnValue.trackingName,
          trackingParameter: ReturnValue.trackingParameter,
          value: returnStore.returnData.minNorm,
          percentage: returnStore.returnData.percentage,
        })
        break
      case TrackedParameter.measurements:
        setParameter({
          trackingName: MeasurementsValue.trackingName,
          trackingParameter: MeasurementsValue.trackingParameter,
          value: measurementsStore.measurementsData.minNorm,
        })
        break
      case TrackedParameter.problems:
        setParameter({
          trackingName: ProblemsValue.trackingName,
          trackingParameter: ProblemsValue.trackingParameter,
          value: checkinProblemsStore.coaches?.[0]?.month.maxLimit || 0,
        })
        break
      case TrackedParameter.collection:
        setParameter({
          trackingName: CollectionValue.trackingName,
          trackingParameter: CollectionValue.trackingParameter,
          value: dataCollectionStore.collectionData.minNorm,
        })
        break
      default:
        break
    }
  }, [trackedParameter])

  const valueLabel = useMemo(() => {
    return trackedParameter === 'checkin-problems'
      ? 'Maximum monthly limit'
      : 'Minimum monthly norm'
  }, [trackedParameter])

  const handleChangeMonthlyNorm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameter((prev) => ({ ...prev, value: e.target.value }))
  }

  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParameter((prev) => ({
      ...prev,
      percentage: e.target.value !== 'Absolute values',
    }))
  }

  const handleSubmit = useCallback(async () => {
    await trackedParametersStore.editTrackedParameters(
      { ...parameter, value: Math.floor(Number(parameter.value)) },
      trackedParameter
    )
    navigate.goBack()
  }, [navigate, parameter, trackedParameter])

  const handleCancelSubmit = () => {
    navigate.goBack()
  }

  return (
    <>
      <div className={editTrackedContainerStyle}>
        <div className={editTrackedWrapStyle}>
          <small>Tracked parameter name</small>
          <input
            className={styledInput}
            type="text"
            placeholder="Tracked parameter name"
            value={parameter.trackingName}
            readOnly
          />
          <small>Tracking parameter</small>
          <input
            className={styledInput}
            type="text"
            placeholder="Patient return"
            value={parameter.trackingParameter}
            readOnly
          />
          <small>{valueLabel}</small>
          <div className="flex flex-row items-center gap-4 flex-initial">
            <input
              className={styledInput}
              type="number"
              value={parameter.value}
              onChange={handleChangeMonthlyNorm}
              min={0}
            />
            {parameter.percentage ? (
              <>
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="radio"
                    name="unit"
                    value="Absolute values"
                    checked={!parameter.percentage}
                    onChange={handleChangeUnit}
                  />
                  Absolute values
                </div>
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="radio"
                    name="unit"
                    value="Percentage"
                    checked={parameter.percentage}
                    onChange={handleChangeUnit}
                  />
                  Percentage
                </div>
              </>
            ) : (
              'Absolute values'
            )}
          </div>
        </div>
      </div>
      <GroupButtons
        onSubmit={handleSubmit}
        onSubmitLabel="Save tracked parameter"
        onCancel={handleCancelSubmit}
        onCancelLabel="Cancel"
      />
    </>
  )
}

export default EditTrackedParameters
