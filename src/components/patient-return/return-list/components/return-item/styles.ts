/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const returnItemStyle = classnames(
  'h-44',
  'bg-gray-100',
  'px-8',
  'py-6',
  'rounded-md',
  'flex',
  'flex-col',
  'justify-between',
  'mt-8'
)

export const returnItemTitleStyle = classnames('text-blue-600', 'font-semibold')

export const returnStatsWrapperStyle = classnames('flex', 'justify-between')
