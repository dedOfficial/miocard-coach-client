import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'bg-white',
  'px-5',
  'flex',
  'justify-center',
  'pb-5'
)

export const buttonStyle = classnames(
  'transition',
  'cursor-pointer',
  'hover:opacity-80',
  'p-3',
  'bg-blue-500',
  'text-white',
  'rounded-md',
  'w-80',
  'mx-auto',
  'flex',
  'font-medium',
  'items-center',
  'justify-center'
)

export const iconStyle = classnames('pr-3', 'w-4')
