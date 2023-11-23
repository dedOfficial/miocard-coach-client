import { classnames } from 'classnames/tailwind'

export const titleStyle = classnames('text-2xl', 'text-black', 'font-bold')

export const subtitleStyle = classnames('text-2xl', 'font-medium')

export const titleWrapperStyle = classnames(
  'flex',
  'justify-between',
  'my-5',
  'pr-1'
)

export const backBtnStyle = classnames(
  'text-blue-600',
  'font-semibold',
  'hover:opacity-70',
  'transition'
)
