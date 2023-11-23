import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'

import useTimeout from '../../../hooks/useTimeout'
import {
  CheckinForSelectType,
  KitCheckinType,
} from '../../../store/datakitStore/datakit.store.types'
import datakitStore from '../../../store/datakitStore/datakit.store'
import TemplateName from '../../Input/TemplateName'
import { sortCheckins } from '../../../helpers/data-kit/data-kit.helper'
import { newKitDefaultState } from '../constants'
import DragAndDrop from '../../dnd/DataKit'
import ActionButton from '../../controls/action-btn'
import GroupButtons from '../../controls/submitCancelGroupBtn'

import { listWrapper, errorStyle } from '../styles'

const AddDataKit: React.FC = () => {
  const { checkinOptionsList } = datakitStore

  const [dataKit, setDataKit] = useState(newKitDefaultState)
  const [checkins, setCheckins] = useState<CheckinForSelectType[]>([])
  const [isError, setIsError] = useState({
    showUnique: false,
    showTemplate: false,
  })
  const [error] = useState({
    unique: 'No opportunity to add to one Check-in two or more same parameters',
    template: 'Template name and checkins should not be empty',
  })

  const navigate = useHistory()

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

    setDataKit({
      ...dataKit,
      checkins: newCheckins,
    })
  }
  const firstCheckins = checkins.filter((checkin) => checkin.position === 1)
  const secondCheckins = checkins.filter((checkin) => checkin.position === 2)

  const isFormFilled = useMemo(() => {
    return !!(dataKit.name && dataKit.checkins.length >= 1)
  }, [dataKit.checkins.length, dataKit.name])

  const runWithDelay = useTimeout(() =>
    setIsError({
      ...isError,
      showUnique: false,
      showTemplate: false,
    })
  )

  const onFormSubmit = useCallback(
    (e) => {
      const uniqueFirst = new Set(firstCheckins.map((v) => v.name))
      const uniqueSecond = new Set(secondCheckins.map((v) => v.name))
      const checkConditions =
        uniqueFirst.size < firstCheckins.length ||
        uniqueSecond.size < secondCheckins.length

      if (!isFormFilled) {
        setIsError({
          ...isError,
          showTemplate: true,
        })
        runWithDelay()
      } else if (checkConditions) {
        setIsError({
          ...isError,
          showUnique: true,
        })
        runWithDelay()
      } else {
        e.preventDefault()
        datakitStore.createNewDataKit(dataKit)
        setDataKit({ name: '', checkins: [] })
        setCheckins([])
        navigate.goBack()
      }
    },
    [
      dataKit,
      firstCheckins,
      isError,
      isFormFilled,
      navigate,
      runWithDelay,
      secondCheckins,
    ]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataKit({ ...dataKit, name: e.target.value })
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

  const handleAddParameters = (position: 1 | 2) => {
    setCheckinsAndDataKit([
      ...checkins,
      {
        name: 'Blood pressure and pulse',
        order: position === 1 ? firstCheckins.length : secondCheckins.length,
        position,
      },
    ])
  }

  const handleCancelSubmit = () => {
    navigate.goBack()
  }

  return (
    <form className="flex flex-col gap-8">
      <TemplateName
        onChange={handleInputChange}
        value={dataKit.name}
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
        {isError.showTemplate && (
          <div className={errorStyle}>{error.template}</div>
        )}
        {isError.showUnique && <div className={errorStyle}>{error.unique}</div>}
        <GroupButtons
          onSubmit={onFormSubmit}
          onSubmitLabel="Save Kit"
          onCancel={handleCancelSubmit}
          onCancelLabel="Cancel"
        />
      </div>
    </form>
  )
}

export default AddDataKit
