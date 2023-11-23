import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'

const loaderWrapperStyle = classnames('flex', 'justify-center', 'items-center')
const loaderStyle = classnames(
  'animate-spin',
  'rounded-full',
  'h-14',
  'w-14',
  'border-t-2',
  'border-l-2',
  'border-blue-500'
)

const Loader: FC = () => {
  return (
    <div className={loaderWrapperStyle}>
      <div className={loaderStyle} />
    </div>
  )
}

export default observer(Loader)
