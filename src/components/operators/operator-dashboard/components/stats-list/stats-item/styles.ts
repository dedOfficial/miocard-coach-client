/* eslint-disable import/prefer-default-export */
import { classnames } from 'classnames/tailwind'

export const wrapperStyle = classnames(
  'h-44',
  'bg-gray-100',
  'px-8',
  'py-6',
  'rounded-md',
  'flex',
  'flex-col'
)

export const statTitleStyle = classnames('font-medium')

export const statsWrapperStyle = classnames('flex', 'gap-1', 'mt-4')

export const itemTitleStyle = classnames(
  'text-xl',
  'text-blue-600',
  'font-semibold',
  'mb-3'
)
