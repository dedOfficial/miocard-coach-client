/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const statsBlockTitle = classnames('font-thin', 'text-gray-400')

export const statsListStyle = classnames('flex', 'mt-2', 'gap-2')

export const elementWrapperStyle = classnames(
  'w-1/3',
  'flex',
  'flex-col',
  'justify-between'
)

export const elementTitleStyle = classnames('h-10', 'md:h-6', 'leading-tight')

export const elementValueStyle = classnames(
  'bg-transparent',
  'block',
  'text-xl',
  'font-semibold'
)

export const markLessStyle = classnames('text-red-500')

export const markLargerStyle = classnames('text-green-500')
