/* eslint-disable import/prefer-default-export */
import { classnames } from 'classnames/tailwind'

export const checkboxWrapperStyle = classnames(
  'flex',
  'flex-row',
  'items-center',
  'gap-2'
)

export const checkboxStyle = classnames(
  'h-5',
  'w-5',
  'border',
  'border-gray-300',
  'rounded-md'
)

export const listWrapperStyle = classnames('flex', 'flex-col', 'gap-2')

export const filteredChatsItemStyle = classnames(
  'flex',
  'justify-between',
  'items-center'
)

export const operatorNameStyle = classnames(
  'text-blue-600',
  'font-medium',
  'ml-2'
)

export const btnsWrapperStyle = classnames(
  'flex',
  'flex-col',
  'items-stretch',
  'w-1/3',
  'gap-4',
  'my-4'
)

export const btnStyle = classnames(
  'py-3',
  'px-6',
  'bg-blue-500',
  'text-white',
  'rounded-lg',
  'hover:opacity-80',
  'transition-all',
  'font-medium',
  'flex',
  'items-center',
  'justify-center',
  'disabled:opacity-50'
)

export const cancelBtnStyle = classnames(
  'py-2.5',
  'px-4',
  'bg-white',
  'text-blue-500',
  'border-2',
  'border-blue-500',
  'rounded-lg',
  'hover:opacity-80',
  'transition-all',
  'font-medium',
  'flex',
  'items-center',
  'justify-center'
)
