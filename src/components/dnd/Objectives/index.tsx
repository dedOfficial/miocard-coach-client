import React, { useState } from 'react'

import DndItem from './dnd-item'
import { defaultSelectedState } from './constants'
import { KeyResultForSelectType } from '../../../store/objectiveStore/objectives.store.types'

interface DragAndDropProps {
  options: Array<string>
  list: Array<KeyResultForSelectType>
  setList:
    | React.Dispatch<React.SetStateAction<Array<KeyResultForSelectType>>>
    | ((value: Array<KeyResultForSelectType>) => void)
  sortRule: (a: KeyResultForSelectType, b: KeyResultForSelectType) => number
  deletable?: boolean
}

const { stringify } = JSON

const DragAndDrop: React.FC<DragAndDropProps> = ({
  options,
  list,
  sortRule,
  setList,
  deletable,
}) => {
  const [selected, setSelected] = useState(defaultSelectedState)

  const dragStartHandler = (item: KeyResultForSelectType) => {
    setSelected(item)
  }

  const dropHandler = (item: KeyResultForSelectType) => {
    setList(
      list.map((i) => {
        if (stringify(i) === stringify(item)) {
          return {
            ...i,
            ...selected,
            trackingParameter: i.trackingParameter,
            name: i.name,
            firstNormValue: i.firstNormValue,
          }
        }

        if (stringify(i) === stringify(selected)) {
          return {
            ...i,
            ...item,
            trackingParameter: i.trackingParameter,
            name: i.name,
            firstNormValue: i.firstNormValue,
          }
        }

        return i
      })
    )
  }

  const deleteHandler = (current: KeyResultForSelectType) => () => {
    setList([
      ...list.slice(0, current.order),
      ...list.slice(current.order + 1).map((item) => ({
        ...item,
        order: item.order - 1,
      })),
    ])
  }

  return (
    <div className="flex gap-4 flex-col">
      {list.sort(sortRule).map((item) => (
        <DndItem
          key={`${item.trackingParameter}-${item.order}`}
          itemId={`${item.trackingParameter}-${item.order}`}
          current={item}
          dragStartHandler={dragStartHandler}
          dropHandler={dropHandler}
          optionsList={options}
          allItems={list}
          setAllItems={setList}
          onDelete={deletable ? deleteHandler(item) : undefined}
        />
      ))}
    </div>
  )
}

export default DragAndDrop
