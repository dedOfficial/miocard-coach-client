import { classnames } from '../../../classnames/tailwind'

export const styledInput = classnames(
  'appearance-none',
  'border-2',
  'border-gray-200',
  'rounded-lg',
  'mt-2',
  'mb-1',
  'py-2',
  'px-2',
  'transition',
  'focus:border-blue-300',
  'text-gray-700',
  'font-medium',
  'leading-tight',
  'focus:outline-none'
)

export const editTrackedContainerStyle = classnames(
  'bg-gray-100',
  'px-8',
  'py-6',
  'rounded-md',
  'mt-8'
)

export const editTrackedWrapStyle = classnames(
  'flex',
  'flex-col',
  'justify-between',
  'w-3/4',
  'pr-10'
)
