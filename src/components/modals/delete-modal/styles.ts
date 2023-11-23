import { classnames } from 'tailwindcss-classnames'

export const overlayStyle = classnames(
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'bottom-0',
  'bg-black',
  'opacity-60',
  'z-50'
)

export const warningWrapperStyle = classnames(
  'flex',
  'flex-col',
  'py-7',
  'mb-3',
  'w-80',
  'items-stretch'
)

export const errorStyle = classnames(
  'p-3',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-lg',
  'text-base'
)
