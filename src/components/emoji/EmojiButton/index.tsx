import React, { useCallback, useRef, useState } from 'react'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'
import {
  styledShapeButton,
  styledShapeIcon,
} from 'routes/operatorChatRoute/OperatorChatRoute.styled'
import { observer } from 'mobx-react-lite'
import EmojiModal from '../EmojiModal'
import Smile from '../../../assets/smile.svg'

interface EmojButtonProps {
  inputRef: React.RefObject<HTMLInputElement>
  text: string
  setText: (text: string) => void
}

const EmojiButton = ({ inputRef, text, setText }: EmojButtonProps) => {
  const emojiRef = useRef<HTMLDivElement>(null)
  const [isEmojiModal, isSetEmojiModal] = useState(false)

  useCloseByClickOutside({
    mainRef: emojiRef,
    handler: () => isSetEmojiModal(false),
  })

  const sendEmoji = useCallback(
    (symbol: string) => {
      const cursor = inputRef?.current?.selectionStart
      if (cursor) {
        const message = text.slice(0, cursor) + symbol + text.slice(cursor)
        setText(message)
      } else {
        setText(`${text}${symbol}`)
      }
    },
    [inputRef, text, setText]
  )

  return (
    <div className="ml-2 relative" ref={emojiRef}>
      {isEmojiModal && <EmojiModal sendEmoji={sendEmoji} />}
      <button
        type="button"
        className={styledShapeButton}
        onClick={() => isSetEmojiModal(!isEmojiModal)}>
        <img src={Smile} alt="Smile" className={styledShapeIcon} />
      </button>
    </div>
  )
}

export default observer(EmojiButton)
