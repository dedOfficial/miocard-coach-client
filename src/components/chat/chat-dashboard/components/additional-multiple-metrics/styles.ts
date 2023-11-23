/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'flex-col',
  'mt-10',
  'w-11/12',
  'gap-y-10'
)

export const wrapperBlockStyle = classnames(
  'grid',
  'w-11/12',
  'grid-cols-2',
  'gap-y-4'
)
