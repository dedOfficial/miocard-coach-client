/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames('flex', 'flex-row', 'gap-10', 'py-1.5')

export const inputWrapperStyle = classnames('inline-flex', 'items-center')

export const inputStyle = classnames(
  'h-4',
  'w-4',
  'mr-1.5',
  'hover:bg-blue-600',
  'transition'
)

export const titleStyle = classnames(
  'flex',
  'justify-between',
  'text-sm',
  'mt-1',
  'py-2'
)

export const greenStyle = classnames(
  'text-green-600',
  'mt-5',
  'mb-1',
  'font-semibold'
)

export const redStyle = classnames(
  'text-red-500',
  'mt-5',
  'mb-1',
  'font-semibold'
)
