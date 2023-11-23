/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'items-start',
  'my-2.5',
  'w-1/2',
  'pr-2'
)

export const checkboxWrapperStyle = classnames('w-5')

export const checkboxStyle = classnames('w-4', 'h-4', 'cursor-pointer', 'mt-1')

export const labelStyle = classnames('cursor-pointer', 'ml-1.5', 'select-none')
