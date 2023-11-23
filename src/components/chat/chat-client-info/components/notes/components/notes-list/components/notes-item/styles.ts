import { classnames } from 'tailwindcss-classnames'

export const itemWrapperStyle = classnames(
  'flex',
  'flex-col',
  'bg-gray-200',
  'rounded-lg',
  'pt-5',
  'px-8',
  'pb-8',
  'my-8',
  'h-auto'
)

export const itemNameStyle = classnames('font-bold', 'ml-4')

export const messageStyle = classnames('h-auto', 'overflow-auto')
