/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames('flex', 'flex-col', 'w-80', 'h-80')

export const titleStyle = classnames('text-2xl', 'font-medium', 'px-2', 'h-16')

export const smallTitleStyle = classnames(
  'text-xl',
  'font-medium',
  'px-2',
  'h-16'
)

export const statsStyle = classnames('grid', 'grid-rows-2', 'pt-3', 'w-full')

export const textStyle = classnames(
  'text-gray-400',
  'font-thin',
  'text-lg',
  'w-full',
  'text-left',
  'h-8'
)

export const smallTextStyle = classnames('text-xs', 'h-8')

export const valueWrapperStyle = classnames(
  'grid',
  'grid-cols-3',
  'text-left',
  'h-20',
  'gap-1'
)

export const blackStyle = classnames('text-lg', 'font-semibold', 'h-6')

export const greenStyle = classnames(
  'text-green-500',
  'font-semibold',
  'text-lg',
  'h-6'
)

export const redStyle = classnames(
  'text-red-500',
  'text-lg',
  'font-semibold',
  'h-6'
)
