import React, { useState } from 'react'

import DndItem from './dnd-item'
import { defaultSelectedState } from './constants'
import { DnDItemType } from './types'

interface DragAndDropProps {
  options: Array<string>
  list: Array<DnDItemType>
  setList:
    | React.Dispatch<React.SetStateAction<Array<DnDItemType>>>
    | ((value: Array<DnDItemType>) => void)
  sortRule: (a: DnDItemType, b: DnDItemType) => number
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

  const dragStartHandler = (item: DnDItemType) => {
    setSelected(item)
  }

  const dropHandler = (item: any) => {
    setList(
      list.map((i) => {
        if (i.position !== selected.position) return i

        if (stringify(i) === stringify(item)) {
          return { ...i, ...selected, name: i.name }
        }

        if (stringify(i) === stringify(selected)) {
          return { ...i, ...item, name: i.name }
        }

        return i
      })
    )
  }

  const deleteHandler = (current: DnDItemType) => () => {
    setList([
      ...list.slice(0, current.order),
      ...list.slice(current.order + 1).map((check) => ({
        ...check,
        order: check.order - 1,
      })),
    ])
  }

  return (
    <div className="flex gap-4 flex-col">
      {list.sort(sortRule).map((item) => (
        <DndItem
          key={`${item.name}-${item.order}`}
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
