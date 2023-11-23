/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'

import {
  elementTitleStyle,
  elementValueStyle,
  elementWrapperStyle,
} from './styles'

interface StatsElementProps {
  title: string
  value: string | number
  status?: 'less' | 'larger' | 'normal'
}

const StatsElement: FC<StatsElementProps> = ({ title, value, status }) => {
  return (
    <li className={elementWrapperStyle}>
      <small className={elementTitleStyle}>{title}</small>
      <mark className={elementValueStyle}>{value}</mark>
    </li>
  )
}

export default StatsElement
