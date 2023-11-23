import { classnames } from 'tailwindcss-classnames'

export const styledClientTyping = classnames(
  'text-gray-500',
  'absolute',
  'bottom-16',
  'left-1/4',
  'px-10'
)

export const alertStyle = classnames(
  'text-gray-600',
  'absolute',
  'bottom-16',
  'left-1/4',
  'px-10',
  'rounded-md',
  'bg-gray-50'
)

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

export const styledChatBoxWrapper = classnames(
  'flex-1',
  'flex-col-reverse',
  'py-2',
  'px-3',
  'overflow-y-scroll'
)

export const styledChatBoxButtonWrapper = classnames(
  'flex',
  'flex-col',
  'p-2',
  'float-right',
  'clear-both',
  'rounded-xl',
  'mb-3'
)

export const styledChatBoxButton = classnames(
  'text-center',
  'text-sm',
  'p-3',
  'border-2',
  'border-red-300',
  'rounded-xl',
  'text-red-600',
  'font-bold',
  'hover:opacity-70',
  'transition'
)

export const styledInput = classnames(
  'p-3',
  'text-lg',
  'w-full',
  'block',
  'mr-3',
  'focus:outline-none'
)

export const styledSendButton = classnames(
  'block',
  'opacity-75',
  'hover:opacity-100',
  'transition'
)

export const styledShapeButton = classnames(
  'block',
  'opacity-75',
  'hover:opacity-100',
  'transition'
)

export const styledUploadButton = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
  'bg-white',
  'p-2',
  'ml-2',
  'rounded-md',
  'shadow-md',
  'tracking-wide',
  'uppercase',
  'border',
  'cursor-pointer',
  'hover:bg-gray-300',
  'hover:text-white',
  'text-gray-300',
  'ease-linear',
  'transition-all',
  'duration-150'
)

export const styledSendIcon = classnames('h-7')

export const styledShapeIcon = classnames('h-9')

export const styledWidgetButton = classnames(
  'text-blue-800',
  'transition',
  'p-3',
  'text-lg',
  'w-80',
  'rounded-xl',
  'hover:bg-blue-100'
)

export const styledWidgetsContent = classnames(
  'flex',
  'flex-col',
  'align-middle'
)

export const styledModalBackground = classnames(
  'bg-black',
  'opacity-60',
  'h-full',
  'w-full',
  'fixed'
)
