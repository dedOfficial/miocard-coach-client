import { classnames } from 'tailwindcss-classnames'

export const section = classnames('mt-8', 'mb-4')

export const sectionTitle = classnames('text-xl')

export const chatSearchWrapper = classnames(
  'flex',
  'flex-auto',
  'flex-row',
  'justify-between',
  'items-stretch',
  'bg-gray-100',
  'rounded-lg',
  'py-4',
  'px-6',
  'my-4'
)

export const chatFilterWrapper = classnames(
  'flex',
  'flex-col',
  'justify-between',
  'w-1/3'
)

export const inputFilterBox = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)

export const inputFilter = classnames(
  'appearance-none',
  'border-2',
  'border-gray-200',
  'rounded-lg',
  'w-full',
  'mt-2',
  'mb-1',
  'mr-2',
  'py-2',
  'px-2',
  'transition',
  'focus:border-blue-300',
  'text-gray-700',
  'font-medium',
  'leading-tight',
  'focus:outline-none'
)

export const pickedDateWrapper = classnames(
  'flex',
  'flex-col',
  'justify-between',
  'relative'
)

export const pickedDateBox = classnames(
  'flex',
  'flex-row',
  'justify-start',
  'items-center',
  'mb-3'
)

export const pickedDateBtn = classnames(
  'flex',
  'flex-row',
  'justify-start',
  'items-center',
  'mr-4'
)

export const pickedDateValue = classnames('text-blue-500', 'mr-4')

export const datePickerBox = classnames('absolute', 'top-20', 'left-0', 'z-10')

export default {}
