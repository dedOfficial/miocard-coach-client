/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRef } from 'react'
import throttle from 'lodash-es/throttle'

const useLazyLoading = ({ onIntersection, delay = 1000 }) => {
  const containerRef: any = useRef(null)

  const onScroll = throttle(() => {
    const containerScrollTop = containerRef?.current?.scrollTop
    if (containerScrollTop === 0) {
      onIntersection()
      containerRef.current.scrollTo(0, 5)
    }
  }, delay)
  return [onScroll, containerRef]
}

export default useLazyLoading
