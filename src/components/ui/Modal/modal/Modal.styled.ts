/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const modalBackgroundStyle = classnames(
  'bg-black',
  'opacity-60',
  'h-screen',
  'w-screen',
  'fixed',
  'block',
  'z-40',
  'inset-0',
  'overflow-hidden'
)

export const popupWrapperStyle = classnames(
  'absolute',
  'flex',
  'flex-col',
  'h-screen',
  'w-full',
  'z-50',
  'items-center',
  'justify-center'
)

export const popupCloseStyles = classnames(
  'p-5',
  'bg-white',
  'rounded-xl',
  'mx-10',
  'mt-3'
)

export const closeStyles = classnames(
  'bg-white',
  'text-blue-800',
  'rounded-xl',
  'text-lg',
  'w-80'
)
