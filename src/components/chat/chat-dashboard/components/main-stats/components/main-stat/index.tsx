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
} from './styles'
import { TChatDashboard } from '../../../../../../../store/chatStore/chat.store.types'

interface MainStatProps {
  stat: TChatDashboard
}

const MainStat: React.FC<MainStatProps> = ({ stat }) => {
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
      <div className={titleStyle}>{stat.title}</div>
      <div className={statsStyle}>
        {stat.blocks.map((block) => (
          <div
            key={block.title || block.categories[0].title}
            className="w-80 px-5 py-2 flex flex-col justify-center">
            {block.title && <div className={textStyle}>{block.title}</div>}
            <div className={valueWrapperStyle}>
              {block.categories.map((item) => (
                <div
                  key={item.title || item.value}
                  className="flex flex-col h-14 justify-between">
                  <div className={smallTextStyle}>{item.title}</div>
                  <div className={highlightedStyle(`${item.highlighted}`)}>
                    {item.value || 'No data'}
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

export default MainStat
