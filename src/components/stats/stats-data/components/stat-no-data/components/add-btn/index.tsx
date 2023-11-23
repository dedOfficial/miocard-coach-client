import React from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

const btnStyle = classnames(
  'text-blue-600',
  'rounded-md',
  'py-1',
  'px-4',
  'font-medium',
  'border-blue-600',
  'border-2',
  'hover:bg-blue-200',
  'transition'
)

interface AddBtnProps {
  handleAddModal
}

const AddBtn: React.FC<AddBtnProps> = ({ handleAddModal }) => {
  return (
    <button type="button" className={btnStyle} onClick={handleAddModal}>
      Add Values
    </button>
  )
}

export default observer(AddBtn)
