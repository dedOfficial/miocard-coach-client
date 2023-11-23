/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

import Dropdown from '../../../assets/dropdown.svg'

export const modalWrapperStyle = classnames(
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
  'py-7',
  'px-14',
  'rounded-lg',
  'z-50'
)

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

export const itemStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'mt-3',
  'w-full'
)

export const titleStyle = classnames(
  'font-semibold',
  'mb-1.5',
  'text-xl',
  'text-center'
)

export const labelStyle = classnames('font-semibold', 'mb-2')

export const inputStyle = classnames(
  'p-3',
  'border',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const textareaStyle = classnames(
  'w-full',
  'p-3',
  'h-28',
  'border',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'resize-none'
)

export const selectStyle = classnames(
  'p-3',
  'border',
  'rounded-lg',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'appearance-none'
)

export const selectBgStyle = {
  background: `url(${Dropdown}) center right 20px no-repeat`,
}

export const errorMessageStyle = classnames(
  'p-3',
  'text-center',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-lg'
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
  'w-64',
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
  'w-64',
  'py-2',
  'px-6',
  'mt-3',
  'hover:opacity-80',
  'transition'
)
