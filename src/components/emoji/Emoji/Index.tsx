/* eslint-disable no-octal-escape */
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import emojiStyle from './styles'

interface EmojiProps {
  symbol: string
  sendEmoji: (symbol: string) => void
}

const Emoji: FC<EmojiProps> = ({ symbol, sendEmoji }) => (
  <button
    type="button"
    className={emojiStyle}
    onClick={() => sendEmoji(symbol)}>
    {symbol}
  </button>
)

export default observer(Emoji)
