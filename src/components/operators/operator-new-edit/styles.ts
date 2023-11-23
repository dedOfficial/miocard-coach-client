import { classnames } from 'tailwindcss-classnames'

export const coachEditWrapperStyle = classnames('flex', 'flex-col', 'mt-4')

export const coachEditBigBoxStyle = classnames(
  'flex',
  'flex-row',
  'mt-8',
  'gap-12',
  'sm:gap-0'
)

export const coachEditAddPhotoStyle = classnames(
  'w-1/3',
  'flex',
  'flex-col',
  'gap-4'
)

export const coachEditLinkPhotoStyle = classnames(
  'text-lg',
  'font-medium',
  'text-blue-500'
)

export const coachEditSmallBoxStyle = classnames(
  'flex',
  'flex-col',
  'w-1/2',
  'sm:w-2/3',
  'justify-between'
)

export const inputStyle = classnames(
  'p-3',
  'border',
  'border-gray-300',
  'w-full',
  'rounded-lg',
  'focus:outline-none',
  'focus:border-blue-400',
  'transition'
)

export const textAreaStyle = classnames('sm:w-full', 'h-36', 'resize-none')

export const labelStyle = classnames('text-lg', 'font-medium', 'mb-3.5')

export const btnsWrapperStyle = classnames(
  'flex',
  'flex-col',
  'justify-center',
  'items-start',
  'mt-8',
  'w-full'
)

export const addBtnStyle = classnames(
  'bg-blue-600',
  'font-semibold',
  'text-white',
  'rounded-lg',
  'text-lg',
  'w-2/5',
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
  'w-2/5',
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
