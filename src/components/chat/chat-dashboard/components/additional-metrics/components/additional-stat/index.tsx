import React from 'react'

import {
  wrapperStyle,
  titleStyle,
  statsStyle,
  textStyle,
  valueWrapperStyle,
  blackStyle,
  greenStyle,
  redStyle,
  smallTextStyle,
  smallTitleStyle,
} from './styles'
import { TChatDashboard } from '../../../../../../../store/chatStore/chat.store.types'

interface AdditionalStatProps {
  stat: TChatDashboard
  smallTitle?: boolean
}

const AdditionalStat: React.FC<AdditionalStatProps> = ({
  stat,
  smallTitle = false,
}) => {
  const highlightedStyle = (value: string) => {
    switch (value) {
      case 'green':
        return greenStyle
      case 'red':
        return redStyle
      default:
        return blackStyle
    }
  }

  return (
    <div className={wrapperStyle}>
      <div className={smallTitle ? smallTitleStyle : titleStyle}>
        {stat.title}
      </div>
      <div className={statsStyle}>
        {stat.blocks.map((block) => (
          <div key={block.title} className="w-80 px-5 mt-3 h-24">
            <div className={textStyle}>{block.title}</div>
            <div className={valueWrapperStyle}>
              {block.categories.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col justify-between h-14">
                  <div className={smallTextStyle}>{item.title}</div>
                  <div className={highlightedStyle(`${item.highlighted}`)}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdditionalStat
