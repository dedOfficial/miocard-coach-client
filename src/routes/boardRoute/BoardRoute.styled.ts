import { classnames } from 'tailwindcss-classnames'

import Dropdown from '../../assets/dropdown.svg'

export const mainWrapperStyle = classnames(
  'p-5',
  'pt-0',
  'max-w-3xl',
  'mx-auto'
)
export const chatWrapperStyle = classnames('pt-2', 'pb-5')
export const doctorWrapperStyle = classnames('py-2')
export const operatorWrapperStyle = classnames('py-2', 'mt-3')
export const modalBackgroundStyle = classnames(
  'bg-black',
  'inset-0',
  'opacity-60',
  'h-full',
  'w-full',
  'fixed',
  'z-10'
)
export const inputStyle = classnames(
  'w-full',
  'p-4',
  'border',
  'mt-3',
  'rounded-xl',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)
export const textareaStyle = classnames(
  inputStyle,
  'max-h-80',
  'h-36',
  'overflow-auto',
  'h-1/2'
)

export const selectStyle = classnames(
  'w-full',
  'p-4',
  'border',
  'rounded-xl',
  'bg-white',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'mt-3'
)
export const selectBgStyle = {
  background: `url(${Dropdown}) center right 20px no-repeat`,
}
export const closeStyle = classnames('flex', 'justify-end')
export const errorMessageStyle = classnames(
  'p-5',
  'text-red-600',
  'bg-red-200',
  'mt-5',
  'rounded-3xl'
)
export const closeBtnStyle = classnames(
  'p-2',
  'font-medium',
  'border-2',
  'border-gray-400',
  'text-black',
  'rounded-xl',
  'hover:opacity-80',
  'transition',
  'mt-3',
  'w-full',
  'ml-8'
)

export const styledInput = classnames(
  'appearance-none',
  'border',
  'border-gray-300',
  'rounded-lg',
  'w-full',
  'mt-2',
  'mb-1',
  'py-3',
  'px-4',
  'transition',
  'focus:border-blue-300',
  'text-gray-700',
  'leading-tight',
  'focus:outline-none'
)
