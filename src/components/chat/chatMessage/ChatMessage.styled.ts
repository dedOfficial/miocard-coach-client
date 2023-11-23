/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledUserMessageWrapper = classnames(
  'bg-blue-100',
  'p-2',
  'float-left',
  'clear-both',
  'rounded-xl',
  'rounded-bl-none',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledUserChatMessageWrapper = classnames(
  'bg-blue-100',
  'p-2',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-bl-none',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledSystemMessage = classnames(
  'bg-yellow-100',
  'p-2',
  'text-yellow-600',
  'border-2',
  'border-yellow-200',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledOperatorMessageWrapper = classnames(
  'bg-blue-900',
  'p-2',
  'text-white',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'shadow-md',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledUserChatOperatorMessageWrapper = classnames(
  'bg-blue-900',
  'p-2',
  'text-white',
  'float-left',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'shadow-md',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledDoctorMessage = classnames(
  'bg-green-200',
  'p-2',
  'text-green-700',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'shadow-md',
  'mb-3',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const styledDate = classnames('text-sm', 'opacity-40')

export const styledDateOperator = classnames(
  'text-sm',
  'text-white',
  'opacity-40'
)

export const styledOperatorMessage = classnames(
  'max-w-xs',
  'h-72',
  'cursor-pointer'
)

export const styledOperatorMessageImgStyle = classnames(
  'object-cover',
  'h-full',
  'w-full'
)

export const styledTextIconWrapper = classnames(
  'flex',
  'justify-between',
  'items-center',
  'relative'
)

export const styledIcon = classnames('cursor-pointer', 'ml-3')

export const styledRepliedMessage = classnames(
  'border-b',
  'mb-1',
  'border-gray-400'
)
