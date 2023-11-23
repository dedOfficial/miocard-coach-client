/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useHistory } from 'react-router-dom'
import { classnames } from 'tailwindcss-classnames'

import dataKitStore from '../../store/datakitStore/datakit.store'
import { KitCheckinType } from '../../store/datakitStore/datakit.store.types'
import CustomSelect from '../customSelect/CustomSelect'
import CallCustomSelectBtn from '../customSelect/CallCustomSelectBtn'
import useCloseByClickOutside from '../../hooks/useCloseByClickOutside'
import ListItem from '../ListItem'

import { assignButtonStyles } from '../datakit/styles'

type BoardDataKitsProp = {
  name: string
  dataKitId: string
  fillingRating: number
  checkins: KitCheckinType[]
  onDelete: () => void
  onDuplicate: () => void
}

const dataKitBoardWrapperStyle = classnames(
  'flex',
  'justify-between',
  'h-16',
  'relative'
)

const BoardDataKits: FC<BoardDataKitsProp> = ({
  name,
  dataKitId,
  fillingRating,
  checkins,
  onDelete,
  onDuplicate,
}) => {
  const navigate = useHistory()

  const [isSelectActive, setIsSelectActive] = useState(false)

  const toggleSelect = useCallback(() => {
    setIsSelectActive((prev) => !prev)
  }, [])

  const customSelectActionRef = useRef<HTMLUListElement>(null)
  const callCustomSelectActionRef = useRef<HTMLButtonElement>(null)

  useCloseByClickOutside({
    mainRef: customSelectActionRef,
    handler: () => setIsSelectActive(false),
    dependentRefs: [callCustomSelectActionRef],
  })

  const onEdit = () => {
    dataKitStore.setEditedDataKit(dataKitId, name, checkins)
    navigate.push(`/data-kit/${dataKitId}/edit`)
  }

  const withToggleSelect = (fn: () => void) => {
    toggleSelect()
    return fn
  }

  return (
    <ListItem>
      <div className={dataKitBoardWrapperStyle}>
        <div className="flex flex-col justify-between gap-4">
          <Link to={`/data-kit/${dataKitId}`}>
            <h3 className="font-semibold text-blue-600 hover:opacity-80 transition">
              {name}
            </h3>
          </Link>
          <span className="font-light text-gray-400">
            Filling success (%):{' '}
            <mark className="font-bold bg-transparent">{fillingRating}</mark>
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <Link
            to={`/data-kit/${dataKitId}/assign`}
            className={assignButtonStyles}>
            Assign
          </Link>

          <CallCustomSelectBtn
            onClick={toggleSelect}
            ref={callCustomSelectActionRef}
          />
        </div>
        <CustomSelect
          ref={customSelectActionRef}
          isActiveState={isSelectActive}
          onEdit={onEdit}
          onDuplicate={() => withToggleSelect(onDuplicate)()}
          onDelete={() => withToggleSelect(onDelete)()}
        />
      </div>
    </ListItem>
  )
}

export default observer(BoardDataKits)
