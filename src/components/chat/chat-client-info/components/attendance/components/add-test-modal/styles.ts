/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const overlayStyle = classnames(
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'bottom-0',
  'bg-black',
  'opacity-60',
  'z-50'
)

export const wrapperStyle = classnames(
  'w-96',
  'h-auto',
  'px-8',
  'py-5',
  'rounded-lg',
  'absolute',
  'z-50',
  'border',
  'bg-white',
  'self-center'
)

export const titleStyle = classnames(
  'font-semibold',
  'mb-1.5',
  'text-xl',
  'text-center'
)

export const labelStyle = classnames('font-semibold', 'text-base', 'mb-2')

export const inputStyle = classnames(
  'p-3',
  'text-base',
  'border',
  'border-gray-300',
  'rounded-lg',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const btnsWrapperStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
  'mt-7',
  'w-full'
)

export const addBtnStyle = classnames(
  'bg-blue-600',
  'font-semibold',
  'text-white',
  'rounded-lg',
  'text-lg',
  'w-full',
  'py-2',
  'px-6',
  'hover:opacity-80',
  'transition'
)

export const cancelBtnStyle = classnames(
  'bg-white',
  'font-semibold',
  'text-blue-600',
  'border',
  'border-blue-500',
  'rounded-lg',
  'text-lg',
  'w-full',
  'py-2',
  'px-6',
  'mt-3',
  'hover:opacity-80',
  'transition'
)

export const errorStyle = classnames(
  'p-3',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-lg',
  'text-base',
  'text-center'
)
