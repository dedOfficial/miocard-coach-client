/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const statsBlockTitle = classnames('font-thin', 'text-gray-400')

export const statsListStyle = classnames('flex', 'gap-10', 'mt-1')

export const statsElementValueStyle = classnames(
  'bg-transparent',
  'block',
  'text-xl',
  'font-semibold'
)

export const markLessStyle = classnames('text-red-500')
export const markLargerStyle = classnames('text-green-500')
