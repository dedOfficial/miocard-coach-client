import { classnames } from 'tailwindcss-classnames'

export const listWrapper = classnames('flex', 'flex-col', 'gap-4')

export const errorStyle = classnames(
  'p-3',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-md',
  'text-base',
  'text-center'
)

export const assignButtonStyles = classnames(
  'bg-transparent',
  'border-2',
  'border-blue-500',
  'rounded-md',
  'h-8',
  'w-28',
  'font-semibold',
  'text-sm',
  'text-blue-500',
  'hover:border-transparent',
  'hover:bg-blue-600',
  'hover:text-white',
  'transition-all',
  'duration-75',
  'flex',
  'items-center',
  'justify-center'
)
