/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

import Dropdown from '../../../assets/dropdown.svg'

export const statsAddModalOverlay = classnames(
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'bottom-0',
  'bg-black',
  'opacity-60',
  'z-50'
)

export const statsAddModalWrapper = classnames(
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

export const statsAddModalCloseBtnWrapper = classnames('flex', 'justify-end')

export const statsAddModalAddBtn = classnames(
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
export const statsAddModalErrorStyle = classnames(
  'p-4',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-md'
)
export const statsAddModalSelect = classnames(
  'w-full',
  'p-3',
  'border',
  'border-blue-200',
  'rounded-lg',
  'bg-white',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'mt-3'
)

export const statsAddModalSelectBg = {
  background: `url(${Dropdown}) center right 20px no-repeat`,
}

export const statsAddModalInput = classnames(
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

export const styledModalInputWrapper = classnames('flex', 'flex-row', 'gap-2')

export const styledModalInputLabel = classnames(
  'w-1/3',
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'rounded-lg',
  'flex',
  'align-middle'
)

export const styledModalInput = classnames(
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'w-2/3'
)

export const smallInputStyle = classnames(
  'p-3',
  'border',
  'border-blue-200',
  'mt-3',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'w-1/2'
)

export const statsAddModalCardiovacsularsWrapper = classnames(
  'inline-flex',
  'items-center',
  'border',
  'border-blue-200',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'p-3',
  'm-1'
)
