/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'justify-between',
  'text-lg',
  'mt-7',
  'w-11/12',
  'rounded-lg',
  'border',
  'border-gray-300',
  'p-0'
)

export const btnStyle = classnames(
  'inline-block',
  'text-blue-600',
  'py-3',
  'px-3',
  'w-full',
  'font-semibold',
  'rounded-lg',
  'hover:opacity-80',
  'transition'
)

export const activeBtnStyle = classnames(
  'inline-block',
  'py-3',
  'px-3',
  'w-full',
  '-mx-0.5',
  'font-semibold',
  'rounded-lg',
  'bg-gray-300'
)
