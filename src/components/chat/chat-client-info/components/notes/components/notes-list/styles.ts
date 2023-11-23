import { classnames } from 'tailwindcss-classnames'

export const notesWrapper = classnames(
  'flex-1',
  'flex-col',
  'py-5',
  'px-10',
  'border',
  'border-gray-300',
  'rounded-lg',
  'text-base',
  'overflow-y-scroll',
  'h-screen'
)

export const notesFooterStyle = classnames(
  'py-1',
  'pr-4',
  'mt-5',
  'flex',
  'flex-row',
  'gap-8'
)

export const inputStyle = classnames(
  'w-full',
  'p-3',
  'border',
  'border-gray-300',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'resize-none'
)

export const sendBtnStyle = classnames('hover:opacity-80', 'transition')

export const dateStyle = classnames('text-center', 'text-gray-400', 'mt-6')
