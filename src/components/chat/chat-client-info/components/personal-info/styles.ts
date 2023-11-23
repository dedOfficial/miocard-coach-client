/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'
import Dropdown from '../../../../../assets/dropdown.svg'

export const itemStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'mt-7',
  'w-full'
)

export const labelStyle = classnames('font-semibold', 'mb-2')

export const inputStyle = classnames(
  'p-3',
  'border',
  'border-gray-300',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const selectStyle = classnames(
  'p-3',
  'border',
  'border-gray-300',
  'rounded-lg',
  'appearance-none',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const selectBgStyle = {
  background: `url(${Dropdown}) center right 20px no-repeat`,
}

export const textareaStyle = classnames(
  'w-full',
  'p-3',
  'h-44',
  'border',
  'border-gray-300',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'resize-none'
)

export const checkboxWrapperStyle = classnames(
  'flex-row',
  'flex-wrap',
  'items-center',
  'py-1'
)

export const checkboxStyle = classnames('w-4', 'h-4', 'mr-3')

export const addBtnStyle = classnames(
  'w-2/5',
  'text-blue-500',
  'border',
  'rounded-lg',
  'border-blue-500',
  'p-1',
  'mt-3',
  'hover:opacity-80',
  'transition',
  'self-start',
  'font-semibold'
)

export const saveBtnStyle = classnames(
  'bg-blue-900',
  'text-white',
  'rounded-lg',
  'text-lg',
  'px-3',
  'py-2',
  'mt-7',
  'hover:opacity-80',
  'transition'
)
