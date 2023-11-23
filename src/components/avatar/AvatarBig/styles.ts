import { classnames } from 'tailwindcss-classnames'

export const photoWrapperStyle = classnames('h-48', 'w-40', 'rounded-md')

export const noAvatarImageStyles = classnames(
  'flex',
  'justify-center',
  'items-center',
  'bg-gradient-to-r',
  'to-blue-500',
  'from-green-400',
  'font-bold',
  'text-7xl',
  'text-white',
  'ring-2',
  'ring-white',
  'h-full',
  'w-full',
  'rounded-md'
)

export const avatarImageStyles = classnames(
  'h-full',
  'w-full',
  'object-cover',
  'rounded-md'
)
