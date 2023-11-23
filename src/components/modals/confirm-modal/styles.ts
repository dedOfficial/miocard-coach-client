/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const modalOverlayStyle = classnames(
  'fixed',
  'top-0',
  'left-0',
  'right-0',
  'bottom-0',
  'bg-black',
  'opacity-60',
  'z-50'
)

export const warningWrapperStyle = classnames(
  'flex',
  'flex-col',
  'py-7',
  'mb-3',
  'w-80',
  'items-stretch'
)

export const listStyle = classnames('flex', 'flex-col')

export const chatNameStyle = classnames('font-bold', 'inline', 'mr-1')

export const operatorNameStyle = classnames('font-bold', 'inline', 'mx-1')
