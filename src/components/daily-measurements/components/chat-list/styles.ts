import { classnames } from 'classnames/tailwind'

export const listTitleStyle = classnames('font-medium', 'text-xl')

export const listHeaderStyle = classnames(
  'rounded-xl',
  'px-6',
  'py-5',
  'text-gray-500',
  'grid',
  'grid-cols-2'
)
export const listItemStyle = classnames(
  'rounded-xl',
  'px-6',
  'py-5',
  'bg-gray-100',
  'grid',
  'grid-cols-2',
  'mb-5'
)

export const chatNameStyle = classnames('font-medium', 'text-blue-600')

export const checkedStyle = classnames('w-5')
