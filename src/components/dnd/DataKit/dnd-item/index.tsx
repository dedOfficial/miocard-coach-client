import React, { useMemo, useState } from 'react'

import { DnDItemType } from '../types'
import Trash from '../../../../assets/trash.svg'

import {
  buttonStyle,
  checkinWrapperStyle,
  dragBtnPointStyle,
  dragBtnWrapperStyle,
} from './styles'
import {
  grayTextStyle,
  selectBgStyle,
  selectStyle,
} from '../../Objectives/dnd-item/styles'

type DraggableCheckinProp = {
  current: DnDItemType
  dragStartHandler: any
  dropHandler: any
  dragOverHandler?: any
  onDelete?: () => void
  optionsList: Array<string>
  allItems: Array<DnDItemType>
  setAllItems: (value: Array<DnDItemType>) => void
}

const DndItem: React.FC<DraggableCheckinProp> = ({
  current,
  dragStartHandler,
  dropHandler,
  dragOverHandler,
  onDelete,
  optionsList,
  allItems,
  setAllItems,
}) => {
  const [isDragged, setIsDragged] = useState(false)

  const selectChangeHandler = (e) => {
    const name = e.target.value
    const changed = allItems.find(
      (item) => JSON.stringify(item) === JSON.stringify(current)
    )
    if (changed) {
      changed.name = name
      setAllItems([
        ...allItems.slice(0, current.order),
        changed,
        ...allItems.slice(current.order + 1),
      ])
    }
  }

  const onDragStart = () => {
    dragStartHandler(current)
    setIsDragged(true)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (dragOverHandler) {
      dragOverHandler()
      setIsDragged(false)
    }
  }
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dropHandler(current)
    setIsDragged(false)
  }

  const draggedClassName = useMemo(
    () => (isDragged ? 'shadow-md' : ''),
    [isDragged]
  )

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`${checkinWrapperStyle} ${draggedClassName}`}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      draggable>
      <div className={dragBtnWrapperStyle}>
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
        <div className={dragBtnPointStyle} />
      </div>

      <div className="mt-2">
        <small className={grayTextStyle}>Collected parameter</small>
        <div className="flex justify-between items-center">
          <select
            name="kit-checkin"
            id="kit-checkin"
            className={selectStyle}
            style={selectBgStyle}
            onChange={selectChangeHandler}
            value={current.name}>
            {optionsList.map((checkin) => (
              <option key={checkin} value={checkin}>
                {checkin}
              </option>
            ))}
          </select>

          {onDelete && (
            <button className={buttonStyle} onClick={onDelete} type="button">
              <img src={Trash} alt="Trash" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DndItem
