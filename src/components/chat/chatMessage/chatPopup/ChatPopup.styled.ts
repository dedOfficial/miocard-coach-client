/* eslint-disable import/prefer-default-export */
import { classnames } from 'tailwindcss-classnames'

export const styledPopupWrapper = classnames(
  'p-3',
  'border',
  'rounded-xl',
  'flex',
  'flex-col',
  'my-1',
  'bg-white',
  'divide-y',
  'space-y-2',
  'float-left',
  'clear-both'
)

export const styledLoading = classnames('pt-2', 'text-gray-400')

export const styledButton = classnames('pt-2', 'text-blue-500')

export const styledButtonExit = classnames('pt-2', 'text-red-600')
