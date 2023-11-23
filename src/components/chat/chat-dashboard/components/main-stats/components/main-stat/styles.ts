/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'flex-col',
  'mt-7',
  'w-full',
  'h-80'
)

export const titleStyle = classnames('text-2xl', 'font-medium', 'px-2', 'h-8')

export const statsStyle = classnames(
  'grid',
  'grid-rows-2',
  'grid-flow-col',
  'w-full',
  'pt-3'
)

export const textStyle = classnames(
  'text-gray-400',
  'font-thin',
  'w-full',
  'text-left',
  'h-12'
)

export const smallTextStyle = classnames(
  'text-xs',
  'h-8',
  'flex',
  'flex-col',
  'justify-center'
)

export const valueWrapperStyle = classnames(
  'grid',
  'grid-cols-2',
  'text-left',
  'h-14'
)

export const blackStyle = classnames('font-semibold', 'text-lg', 'h-6')

export const greenStyle = classnames(
  'text-green-500',
  'font-semibold',
  'text-lg',
  'h-6'
)

export const redStyle = classnames(
  'text-red-500',
  'font-semibold',
  'text-lg',
  'h-6'
)
