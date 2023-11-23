import React from 'react'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { emojis } from '../Emoji/emojis'
import Emoji from '../Emoji/Index'
import { EmojiType } from '../Emoji/emoji.types'
import { popupStyle, popupWrapperStyle } from './styles'

interface EmojiModalProps {
  sendEmoji: (emoji: string) => void
}

const EmojiModal = ({ sendEmoji }: EmojiModalProps) => {
  return (
    <div className={popupWrapperStyle}>
      <div className={popupStyle}>
        {emojis.map(({ symbol }: EmojiType) => (
          <Emoji key={nanoid()} symbol={symbol} sendEmoji={sendEmoji} />
        ))}
      </div>
    </div>
  )
}

export default observer(EmojiModal)
