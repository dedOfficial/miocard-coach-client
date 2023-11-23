/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledChatMessageActionsWrapper = classnames(
  'absolute',
  'top-5',
  'right-0',
  'bg-white',
  'px-3',
  'py-1',
  'shadow-lg',
  'rounded-md',
  'z-10'
)

export const StyledChatMessageAction = classnames(
  'text-blue-500',
  'cursor-pointer'
)
