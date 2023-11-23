import { classnames } from 'classnames/tailwind'

export const avatarWrapperStyles = classnames(
  'h-12',
  'w-12',
  'mr-2',
  'cursor-pointer'
)

export const noAvatarImageStyles = classnames(
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
  'h-12',
  'w-12'
)

export const avatarImageStyles = classnames(
  'h-full',
  'w-full',
  'object-cover',
  'rounded-full'
)
