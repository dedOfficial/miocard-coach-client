/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const itemStyle = classnames(
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

export const titleStyle = classnames('text-blue-600', 'font-semibold')

export const statsWrapperStyle = classnames('flex', 'justify-between')
