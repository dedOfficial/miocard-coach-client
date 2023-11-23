/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const btnStyle = classnames(
  'text-blue-500',
  'border-2',
  'rounded-l-lg',
  'border-blue-500',
  'p-2',
  'm-1',
  'text-sm',
  'mx-0',
  'hover:opacity-70',
  'transition'
)

export const wrapperStyle = classnames(
  'bg-white',
  'h-screen',
  'w-screen',
  'absolute',
  'z-10',
  'inset-0',
  'max-w-3xl',
  'mx-auto'
)

export const clientInfoStyle = classnames(
  'flex',
  'flex-col',
  'items-center',
  'justify-between',
  'w-full',
  'pb-20'
)
