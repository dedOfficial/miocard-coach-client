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
  'self-center',
  'flex',
  'flex-col'
)

export const btnsWrapperStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'items-center',
  'mt-7',
  'w-full'
)

export const submitBtnStyle = classnames(
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

export const inputWrapperStyle = classnames('flex', 'flex-col', 'mt-3')

export const labelStyle = classnames('font-semibold')

export const inputStyle = classnames(
  'px-3',
  'py-2',
  'border',
  'border-gray-300',
  'rounded-lg',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const errorStyle = classnames(
  'p-3',
  'mb-3',
  'bg-red-200',
  'text-red-600',
  'rounded-lg',
  'text-center'
)
