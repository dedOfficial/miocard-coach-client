import { classnames } from 'tailwindcss-classnames'

export const paginationContainerStyle = classnames(
  'relative',
  'z-0',
  'inline-flex',
  'rounded-md',
  'shadow-sm',
  '-space-x-px'
)

export const paginationItemStyle = classnames(
  'bg-white',
  'border-gray-300',
  'text-gray-500',
  'hover:bg-gray-50',
  'relative',
  'inline-flex',
  'items-center',
  'px-4',
  'py-2',
  'border',
  'text-sm',
  'font-medium'
)

export const paginationPrevNextStyle = classnames(
  'relative',
  'inline-flex',
  'items-center',
  'px-2',
  'py-2',
  'border',
  'border-gray-300',
  'bg-white',
  'text-sm',
  'font-medium',
  'text-gray-500',
  'hover:bg-gray-50'
)
