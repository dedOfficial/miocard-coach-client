/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'rounded-xl',
  'mx-1.5'
)

export const headerStyle = classnames('flex', 'justify-between')

export const greenStyle = classnames('text-green-600', 'mb-2', 'font-medium')

export const redStyle = classnames('text-red-500', 'mb-2', 'font-medium')

export const toggleBtnStyle = classnames(
  'flex',
  'items-start',
  'text-blue-600',
  'font-semibold',
  'w-28'
)

export const iconStyle = classnames(
  'w-5',
  'h-auto',
  'overflow-hidden',
  'cursor-pointer'
)

export const iconTopStyle = classnames(
  'h-3',
  'w-3',
  'bg-blue-600',
  'rotate-45',
  'origin-bottom-left',
  'transform-gpu'
)

export const iconBottomStyle = classnames(
  'h-3',
  'w-3',
  'bg-blue-600',
  '-rotate-45',
  'origin-top-left',
  'transform-gpu'
)

export const sendBtnStyle = classnames('w-32', 'h-10')

export const checkinsWrapperStyle = classnames('flex', 'flex-wrap')

export const inputStyle = classnames(
  'w-full',
  'p-3',
  'mt-2',
  'border',
  'border-gray-300',
  'rounded-md',
  'hover:border-blue-300',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)
