/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledStatsNoDataElementWrapper = classnames(
  'flex',
  'flex-row',
  'items-center',
  'justify-between',
  'border-2',
  'rounded-xl',
  'py-3.5',
  'px-3'
)

export const styledStatsNoDataMarkedElementWrapper = classnames(
  'flex',
  'flex-row',
  'items-center',
  'justify-between',
  'border-2',
  'rounded-xl',
  'py-1.5',
  'px-3'
)

export const styledStatsNoDataElementText = classnames('text-gray-400')

export const styledStatsNoDataMarkedElementText = classnames('text-base')
