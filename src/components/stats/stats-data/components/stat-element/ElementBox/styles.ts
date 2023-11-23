/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const wrapperStyle = classnames(
  'flex',
  'flex-row',
  'items-center',
  'border',
  'border-gray-300',
  'rounded-md',
  'px-3',
  'py-1',
  'my-2',
  'w-full'
)

export const textStyle = classnames('flex-1', 'font-medium')

export const timeStyle = classnames('w-24', 'flex-shrink-0', 'ml-3')

export const btnStyle = classnames('h-8', 'w-8', 'p-1', 'hover:opacity-80')
