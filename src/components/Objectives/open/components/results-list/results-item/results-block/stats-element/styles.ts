import { classnames } from 'tailwindcss-classnames'

export const elementWrapperStyle = classnames(
  'w-1/4',
  'flex',
  'flex-col',
  'justify-between'
)

export const elementTitleStyle = classnames('h-10', 'md:h-6', 'leading-tight')

export const elementValueStyle = classnames(
  'bg-transparent',
  'block',
  'text-xl',
  'font-semibold'
)

export const greenStyle = classnames('text-green-500')

export const redStyle = classnames('text-red-500')
