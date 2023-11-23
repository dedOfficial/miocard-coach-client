/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledStatsHeaderWrapper = classnames(
  'flex',
  'justify-between',
  'items-center',
  'border-b-2',
  'border-gray-200',
  'pb-3'
)

export const styledStatsHeaderButtonLeft = classnames(
  'text-gray-500',
  'rounded-lg',
  'py-2',
  'px-4',
  'font-medium',
  'm-1',
  'bg-gray-100',
  'hover:bg-gray-300',
  'transition'
)

export const styledDatePickerWrapper = classnames(
  'flex',
  'py-5',
  'text-lg',
  'items-center',
  'justify-center',
  'cursor-pointer'
)

export const styledDatePickerImg = classnames('pr-2')

export const styledDatePicker = classnames(
  'text-blue-500',
  'font-medium',
  'w-44',
  'cursor-pointer'
)
