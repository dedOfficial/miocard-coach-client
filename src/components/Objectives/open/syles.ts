/* eslint-disable import/prefer-default-export */
import { classnames } from 'classnames/tailwind'

export const wrapperStyle = classnames('mt-10')

export const btnsWrapperStyle = classnames(
  'flex',
  'justify-around',
  'mt-10',
  'bg-gray-100',
  'rounded-md',
  'shadow-sm',
  'p-3'
)

export const btnStyle = classnames(
  'text-gray-400',
  'font-semibold',
  'hover:text-blue-700',
  'transition-all',
  'p-2'
)

export const activeBtnStyle = classnames(
  'text-blue-600',
  'font-semibold',
  'transition-all',
  'p-2'
)
