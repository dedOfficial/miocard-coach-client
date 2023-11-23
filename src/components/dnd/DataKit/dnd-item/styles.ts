import { classnames } from 'tailwindcss-classnames'

export const buttonStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-lg',
  'border-blue-400',
  'border'
)

export const checkinWrapperStyle = classnames(
  'relative',
  'items-center',
  'cursor-pointer',
  'h-32',
  'p-6',
  'w-full',
  'rounded-xl',
  'bg-gray-100'
)

export const dragBtnWrapperStyle = classnames(
  'flex',
  'w-5',
  'gap-1',
  'justify-between',
  'flex-wrap',
  'absolute',
  'top-4',
  'left-1/2'
)

export const dragBtnPointStyle = classnames(
  'w-1',
  'h-1',
  'bg-gray-300',
  'rounded-full'
)
