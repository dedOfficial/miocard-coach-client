import React, { useEffect } from 'react'

import Message from '../interfaces/message.interface'

interface Props {
  ref: React.RefObject<any>
  isVisible?: boolean
  location?: string
  messageEnd?: Message
  dependencies: Array<any>
}

const useScrollToRef = ({
  ref,
  isVisible,
  location,
  messageEnd,
  dependencies,
}: Props): void => {
  useEffect(() => {
    const scrollToDivRef = () => {
      const divScrollToBottom = ref.current as Element
      if (location?.includes('/operator/chat')) {
        if (messageEnd?.type === 'operator' || messageEnd?.type === 'image') {
          divScrollToBottom?.scrollTo({
            top: divScrollToBottom.scrollHeight,
            behavior: 'smooth',
          })
        }
        if (messageEnd?.type === 'user') {
          if (isVisible) {
            divScrollToBottom?.scrollTo({
              top: divScrollToBottom.scrollHeight,
              behavior: 'smooth',
            })
          }
        }
      }
      if (!location?.includes('/operator/chat')) {
        if (messageEnd?.type === 'user') {
          divScrollToBottom?.scrollTo({
            top: divScrollToBottom.scrollHeight,
            behavior: 'smooth',
          })
        }
        if (messageEnd?.type === 'operator' || messageEnd?.type === 'image') {
          if (isVisible) {
            divScrollToBottom?.scrollTo({
              top: divScrollToBottom.scrollHeight,
              behavior: 'smooth',
            })
          }
        }
      }
    }
    scrollToDivRef()
  }, [...dependencies]) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useScrollToRef
