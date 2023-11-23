import { classnames } from 'tailwindcss-classnames'

export const styledMessageEndRefWrapper = classnames(
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'flex',
  'flex-col',
  'flex-wrap',
  'relative'
)

export const isErrorNoticeMessageStyle = classnames(
  'bg-pink-100',
  'p-2',
  'text-pink-600',
  'border-2',
  'border-pink-200',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none'
)
export const messageWrapperStyle = classnames(
  'flex-1',
  'py-2',
  'px-3',
  'overflow-y-scroll'
)
export const inputStyle = classnames(
  'p-3',
  'text-lg',
  'w-full',
  'block',
  'focus:outline-none',
  'rounded-2xl'
)
export const sendButtonStyle = classnames('block')
export const sendIconStyle = classnames('h-7')

export const coachIsTypingStyle = classnames(
  'bg-green-100',
  'text-green-700',
  'float-right',
  'clear-both',
  'rounded-xl',
  'rounded-br-none',
  'p-1',
  'text-xs'
)

export const chatFooterWidgetInput = classnames('flex', 'w-full', 'p-1')

export const chatFooterWidgetText = classnames(
  'flex',
  'items-center',
  'mx-3',
  'text-blue-900',
  'text-lg',
  'font-medium'
)
