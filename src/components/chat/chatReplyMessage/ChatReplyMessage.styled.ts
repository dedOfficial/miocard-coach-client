/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledChatReplyMessageWrapper = classnames(
  'flex',
  'py-2',
  'px-3',
  'justify-between',
  'border-t-2',
  'my-0.5'
)

export const styledChatReplyMessage = classnames('flex')

export const styledReplyToThisMassage = classnames('pr-2', 'font-bold')

export const styledCloseButton = classnames('w-8', 'flex', 'justify-end')
