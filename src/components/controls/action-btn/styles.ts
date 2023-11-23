import { classnames } from 'classnames/tailwind'

export const actionBtnStyles = classnames(
  'rounded-md',
  'text-white',
  'text-sm',
  'text-center',
  'px-10',
  'py-1.5',
  'max-w-xs',
  'disabled:opacity-60',
  'hover:opacity-80',
  'transition-all',
  'shadow',
  'border'
)

export const buttonBlueStyle = classnames(
  'bg-blue-600',
  'font-medium',
  'border-blue-600'
)

export const buttonWhiteStyle = classnames(
  'bg-white',
  'text-blue-500',
  'border-blue-500',
  'font-semibold'
)

export default {}
