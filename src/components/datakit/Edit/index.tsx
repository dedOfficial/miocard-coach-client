import React, { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CheckinForSelectType,
  KitCheckinType,
} from '../../../store/datakitStore/datakit.store.types'
import datakitStore from '../../../store/datakitStore/datakit.store'
import { sortCheckins } from '../../../helpers/data-kit/data-kit.helper'
import TemplateName from '../../Input/TemplateName'
import DragAndDrop from '../../dnd/DataKit'
import { listWrapper, errorStyle } from '../styles'
import { editKitDefaultState } from '../constants'
import ActionButton from '../../controls/action-btn'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import useTimeout from '../../../hooks/useTimeout'

const EditDataKit: React.FC = () => {
  const { checkinOptionsList } = datakitStore
  const navigate = useHistory()

  const [editedDataKit, setEditedDataKit] = useState(editKitDefaultState)
  const [checkins, setCheckins] = useState<CheckinForSelectType[]>([])
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchOptionsList = async () => {
      await datakitStore.fetchCheckinOptionsList()
    }
    fetchOptionsList()
  }, [])

  const setCheckinsAndDataKit = (value: CheckinForSelectType[]) => {
    setCheckins(value)
    const first: string[] = []
    const second: string[] = []

    value.forEach(({ name, position }) => {
      if (position === 1) {
        first.push(name)
      } else if (position === 2) {
        second.push(name)
      }
    })

    const newCheckins: KitCheckinType[] = []
    if (first.length) {
      newCheckins.push({
        name: 'First check-in',
        options: first,
        position: 1,
      })
    }
    if (second.length) {
      newCheckins.push({
        name: 'Second check-in',
        options: second,
        position: 2,
      })
    }

    setEditedDataKit({
      ...editedDataKit,
      checkins: newCheckins,
    })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, name } = datakitStore.editedDataKit
    const checkinsForDatakit = datakitStore.editedDataKit.checkins

    setEditedDataKit({ _id, name, checkins: checkinsForDatakit })

    const firstCheckin = checkinsForDatakit.filter(
      (checkin) => checkin.position === 1
    )[0]

    const secondCheckin = checkinsForDatakit.filter(
      (checkin) => checkin.position === 2
    )[0]

    const firstCheckins = firstCheckin
      ? firstCheckin.options.map((option, index) => ({
          name: option,
          order: index,
          position: 1,
        }))
      : []

    const secondCheckins = secondCheckin
      ? secondCheckin.options.map((option, index) => ({
          name: option,
          order: index,
          position: 2,
        }))
      : []

    setCheckins([...firstCheckins, ...secondCheckins])
  }, [])

  const handleCancelSubmit = () => {
    navigate.goBack()
  }

  const runWithDelay = useTimeout(() => setIsError(false))

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedDataKit({ ...editedDataKit, name: e.target.value })
  }

  const firstCheckins = checkins.filter((checkin) => checkin.position === 1)
  const secondCheckins = checkins.filter((checkin) => checkin.position === 2)

  const onFormSubmit = (e) => {
    const uniqueFirst = new Set(firstCheckins.map((v) => v.name))
    const uniqueSecond = new Set(secondCheckins.map((v) => v.name))
    const checkConditions =
      uniqueFirst.size < firstCheckins.length ||
      uniqueSecond.size < secondCheckins.length
    if (checkConditions) {
      setIsError(true)
      runWithDelay()
    } else {
      e.preventDefault()
      datakitStore.patchDataKit(editedDataKit)
      // eslint-disable-next-line no-underscore-dangle
      setEditedDataKit({ _id: editedDataKit._id, name: '', checkins: [] })
      setCheckins([])
      navigate.push('/data-kits')
    }
  }

  const setFirstCheckins = (value: CheckinForSelectType[]) => {
    setCheckinsAndDataKit([
      ...checkins.filter((c) => c.position === 2),
      ...value,
    ])
  }
  const setSecondCheckins = (value: CheckinForSelectType[]) => {
    setCheckinsAndDataKit([
      ...checkins.filter((c) => c.position === 1),
      ...value,
    ])
  }

  const isFormFilled = useMemo(() => {
    return editedDataKit.name && editedDataKit.checkins.length >= 1
  }, [editedDataKit.name, editedDataKit.checkins.length])

  const handleAddParameters = (position: 1 | 2) => {
    setCheckinsAndDataKit([
      ...checkins,
      {
        name: checkinOptionsList[0],
        order: position === 1 ? firstCheckins.length : secondCheckins.length,
        position,
      },
    ])
  }

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-8">
      <TemplateName
        onChange={handleInputChange}
        value={editedDataKit.name}
        label="Template name"
      />

      <section>
        <h2 className="font-medium mb-2">First check in:</h2>
        <div className={listWrapper}>
          {!firstCheckins.length ? (
            <small className="text-gray-400">
              You have not added any collected parameters yet.
            </small>
          ) : (
            <DragAndDrop
              list={firstCheckins}
              setList={setFirstCheckins}
              options={checkinOptionsList}
              sortRule={sortCheckins}
              deletable
            />
          )}

          <div>
            <ActionButton
              label="Add parameter"
              action={() => handleAddParameters(1)}
              white
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-2">Second check in:</h2>
        <div className={listWrapper}>
          {!secondCheckins.length ? (
            <small className="text-gray-400">
              You have not added any collected parameters yet.
            </small>
          ) : (
            <DragAndDrop
              list={secondCheckins}
              setList={setSecondCheckins}
              options={checkinOptionsList}
              sortRule={sortCheckins}
              deletable
            />
          )}

          <div>
            <ActionButton
              label="Add parameter"
              action={() => handleAddParameters(2)}
              white
            />
          </div>
        </div>
      </section>

      <div>
        <hr />
        {isError && (
          <div className={errorStyle}>
            No opportunity to add to one Check-in two or more same parameters
          </div>
        )}
        <GroupButtons
          onSubmit={onFormSubmit}
          onSubmitLabel="Save Kit"
          onCancel={handleCancelSubmit}
          onCancelLabel="Cancel"
          disabled={!isFormFilled}
        />
      </div>
    </form>
  )
}

export default EditDataKit
