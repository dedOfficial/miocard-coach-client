import React, { FC, useMemo } from 'react'

import { EHighlightedColor } from '../../../../../../constants'

import {
  elementTitleStyle,
  elementValueStyle,
  elementWrapperStyle,
  greenStyle,
  redStyle,
} from './styles'

interface StatsElementProps {
  title: string
  value: string | number
  highlightedColor?: string
}

const StatsElement: FC<StatsElementProps> = ({
  title,
  value,
  highlightedColor,
}) => {
  const valueStyle = useMemo(() => {
    switch (highlightedColor) {
      case EHighlightedColor.GREEN:
        return `${elementValueStyle} ${greenStyle}`
        break
      case EHighlightedColor.RED:
        return `${elementValueStyle} ${redStyle}`
        break
      default:
        return elementValueStyle
        break
    }
  }, [highlightedColor])

  return (
    <li className={elementWrapperStyle}>
      <small className={elementTitleStyle}>{title}</small>
      <mark className={valueStyle}>{value}</mark>
    </li>
  )
}

export default StatsElement
