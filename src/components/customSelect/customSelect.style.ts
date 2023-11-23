import { classnames } from 'tailwindcss-classnames'

export const customSelectItemStyle = classnames(
  'px-5',
  'cursor-pointer',
  'text-black',
  'hover:bg-gray-200'
)

export const customSelectItemBtnStyle = classnames(
  'font-semibold',
  'text-sm',
  'w-full',
  'text-left'
)

export const customSelectStyle = classnames(
  'flex-col',
  'justify-between',
  'absolute',
  'right-7',
  'top-full',
  '-bottom-24',
  'w-32',
  'min-h-full',
  'bg-white',
  'shadow-lg',
  'rounded-md',
  'py-5',
  'font-semibold',
  'text-sm',
  'z-10'
)

export const callSelectBtnPointStyle = classnames(
  'w-1.5',
  'h-1.5',
  'bg-gray-400',
  'rounded-full'
)
