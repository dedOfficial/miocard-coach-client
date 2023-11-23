/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const statsEditModalOverlay = classnames(
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'bottom-0',
  'bg-black',
  'opacity-60',
  'z-50'
)

export const statsEditModalWrapper = classnames(
  'fixed',
  'top-1/2',
  'left-1/2',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'w-4/5',
  'sm:w-3/4',
  'md:w-2/3',
  'lg:w-3/5',
  'bg-white',
  'lg:max-w-screen-sm',
  'py-5',
  'px-8',
  'rounded-lg',
  'z-50',
  'max-h-screen',
  'overflow-y-auto'
)

export const statsEditModalSaveBtn = classnames(
  'p-3',
  'text-lg',
  'font-medium',
  'bg-blue-500',
  'text-white',
  'rounded-lg',
  'hover:opacity-80',
  'transition',
  'mt-5',
  'w-full'
)

export const statsEditModalCloseBtn = classnames('flex', 'justify-end')

export const statsEditModalInput = classnames(
  'w-full',
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const statsEditModalTitle = classnames('font-semibold', 'text-lg')

export const statsEditModalInputWrapper = classnames('flex', 'flex-row')

export const statsEditModalInputLabel = classnames(
  'w-1/3',
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'rounded-lg'
)

export const statsEditModalSmallInput = classnames(
  'w-2/3',
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'ml-3',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)
