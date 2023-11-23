import { classnames } from 'tailwindcss-classnames'

export const elementWrapperStyle = classnames(
  'w-1/3',
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
