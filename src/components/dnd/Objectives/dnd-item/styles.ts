import { classnames } from 'tailwindcss-classnames'

import Dropdown from '../../../../assets/dropdown.svg'

export const buttonStyle = classnames(
  'hover:opacity-80',
  'p-3',
  'rounded-lg',
  'border-blue-400',
  'border'
)

export const checkinWrapperStyle = classnames(
  'relative',
  'items-center',
  'cursor-pointer',
  'h-64',
  'p-6',
  'w-full',
  'rounded-xl',
  'bg-gray-100'
)

export const dragBtnWrapperStyle = classnames(
  'flex',
  'w-5',
  'gap-1',
  'justify-between',
  'flex-wrap',
  'absolute',
  'top-4',
  'left-1/2'
)

export const dragBtnPointStyle = classnames(
  'w-1',
  'h-1',
  'bg-gray-300',
  'rounded-full'
)

export const inputStyle = classnames(
  'w-1/2',
  'h-8',
  'text-sm',
  'border',
  'border-gray-300',
  'rounded-lg',
  'px-1',
  'focus:outline-none',
  'focus:border-blue-400',
  'hover:border-blue-300',
  'transition'
)

export const selectStyle = classnames(
  'w-1/2',
  'h-8',
  'font-medium',
  'px-2',
  'border',
  'border-gray-300',
  'rounded-lg',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'hover:border-blue-300',
  'transition',
  'mt-2',
  'text-sm',
  'cursor-pointer'
)

export const selectBgStyle = {
  background: `white url(${Dropdown}) center right 10px/4.5% no-repeat`,
}

export const labelStyle = classnames(
  'text-sm',
  'cursor-pointer',
  'hover:text-gray-500',
  'transition'
)

export const grayTextStyle = classnames('text-gray-500')

export const cursorPointerStyle = classnames('cursor-pointer')

export const radioWrapperStyle = classnames('flex', 'items-center', 'gap-1')

export const inputGroupWrapperStyle = classnames(
  'flex',
  'justify-between',
  'items-center',
  'mt-2'
)
