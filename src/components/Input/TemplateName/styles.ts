import { classnames } from 'tailwindcss-classnames'

export const inputStyles = classnames(
  'border',
  'border-gray-300',
  'rounded-lg',
  'px-3',
  'py-2',
  'focus:outline-none',
  'focus:border-blue-400',
  'hover:border-blue-300',
  'transition'
)

export const listWrapper = classnames('flex', 'flex-col')
