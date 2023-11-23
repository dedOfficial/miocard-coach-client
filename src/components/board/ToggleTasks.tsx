import React, { FC } from 'react'
import { classnames } from 'tailwindcss-classnames'

const toggleWrapperStyle = classnames(
  'flex',
  'items-center',
  'justify-end',
  'mt-4'
)
const checkBoxStyle = classnames(
  'w-16',
  'h-8',
  'rounded-full',
  'flex-shrink-0',
  'p-1',
  'mx-2',
  'duration-300',
  'ease-in-out'
)
const toggleStyle = classnames(
  'bg-white',
  'w-8',
  'h-6',
  'rounded-full',
  'shadow-md',
  'duration-300',
  'ease-in-out'
)
const toggleTextStyle = classnames('text-sm', 'text-gray-900')

interface ToggleTasksProps {
  title: string
  toggleTasks: boolean
  setToggleTasks: (data: boolean) => void
}

const ToggleTasks: FC<ToggleTasksProps> = ({
  title,
  toggleTasks,
  setToggleTasks,
}) => {
  return (
    <div className={toggleWrapperStyle}>
      <h2 className={toggleTextStyle}>{title}</h2>
      <button
        style={
          toggleTasks
            ? { backgroundColor: 'lightblue' }
            : { backgroundColor: '#D0D0D0' }
        }
        className={checkBoxStyle}
        type="button"
        onClick={() => {
          if (toggleTasks) setToggleTasks(false)
          if (!toggleTasks) setToggleTasks(true)
        }}>
        <div
          style={
            toggleTasks
              ? { transform: 'translateX(1.5rem)' }
              : { transform: 'translateX(0)' }
          }
          className={toggleStyle}
        />
      </button>
    </div>
  )
}

export default ToggleTasks
