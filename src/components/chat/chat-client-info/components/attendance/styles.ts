/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

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

export const smInputWrapperStyle = classnames(
  'flex',
  'flex-row',
  'items-center'
)

export const smInputStyle = classnames(
  'w-24',
  'py-2',
  'px-4',
  'border',
  'border-gray-300',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const smInputTextStyle = classnames('ml-3', 'text-sm')

export const textareaStyle = classnames(
  'w-full',
  'p-3',
  'h-16',
  'border',
  'border-gray-300',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition',
  'resize-none'
)

export const addBtnStyle = classnames(
  'w-2/5',
  'text-blue-500',
  'border',
  'rounded-lg',
  'border-blue-500',
  'p-1',
  'mt-5',
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
  'transition',
  'font-medium'
)

export const removeBtnStyle = classnames(
  'hover:opacity-80',
  'p-1.5',
  'rounded-md',
  'border-blue-400',
  'border'
)

export const habitTitleWrapperStyle = classnames(
  'flex',
  'flex-row',
  'justify-between',
  'mt-3'
)

export const titleStyle = classnames('mt-10', 'font-semibold', 'text-xl')
