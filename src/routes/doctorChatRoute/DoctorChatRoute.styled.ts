import { classnames } from 'tailwindcss-classnames'

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
  'mr-3',
  'focus:outline-none'
)
export const sendButtonStyle = classnames(
  'block',
  'opacity-75',
  'hover:opacity-100',
  'transition'
)

export const sendIconStyle = classnames('h-7')

export const widgetButton = classnames(
  'text-blue-900',
  'p-3',
  'text-lg',
  'w-80'
)
export const widgetsContentStyle = classnames(
  'flex',
  'flex-col',
  'align-middle'
)
export const modalBackgroundStyle = classnames(
  'bg-black',
  'opacity-60',
  'h-screen',
  'w-full',
  'absolute'
)
