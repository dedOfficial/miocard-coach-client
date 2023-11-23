import { classnames } from 'classnames/tailwind'

export const avatarWrapperStyle = classnames(
  'h-12',
  'w-12',
  'mr-2',
  'cursor-pointer'
)

export const noAvatarImageStyle = classnames(
  'flex',
  'justify-center',
  'items-center',
  'bg-gradient-to-r',
  'to-blue-500',
  'from-green-400',
  'font-bold',
  'text-white',
  'ring-2',
  'ring-white',
  'rounded-full',
  'h-10',
  'w-10'
)

export const avatarImageStyle = classnames(
  'h-10',
  'w-10',
  'object-cover',
  'rounded-full'
)
