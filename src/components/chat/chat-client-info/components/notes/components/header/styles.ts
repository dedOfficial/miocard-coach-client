import { classnames } from 'tailwindcss-classnames'

export const headerWrapperStyle = classnames('flex', 'justify-between', 'px-10')

export const checkboxWrapperStyle = classnames(
  'flex',
  'items-center',
  'flex-wrap',
  'py-1'
)

export const checkboxStyle = classnames('w-4', 'h-4', 'mr-1.5')

export const pickedDateWrapper = classnames(
  'flex',
  'flex-col',
  'justify-between',
  'relative',
  'py-1'
)

export const pickedDateBox = classnames(
  'flex',
  'flex-row',
  'justify-start',
  'items-center'
)

export const pickedDateBtn = classnames(
  'flex',
  'flex-row',
  'justify-start',
  'items-center',
  'mr-4'
)

export const pickedDateValue = classnames('text-blue-500', 'mr-4')

export const datePickerBox = classnames('absolute', 'top-12', 'left-0', 'z-50')
