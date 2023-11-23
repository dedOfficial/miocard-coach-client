/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const modalWrapperStyle = classnames(
  'fixed',
  'top-1/2',
  'left-1/2',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'w-96',
  'max-w-prose',
  'bg-white',
  'rounded-md',
  'z-50',
  'flex',
  'flex-col',
  'items-center'
)
