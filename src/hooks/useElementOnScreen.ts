import React, { useEffect, useState } from 'react'

interface Options {
  root: null | HTMLElement
  rootMargin: string
  threshold: number
}
interface Props {
  options: Options
  divRefEnd: React.RefObject<any>
}
const useElementOnScreen = ({ options, divRefEnd }: Props): boolean[] => {
  const [isVisible, setVisible] = useState(false)
  const callbackFunction = (entries) => {
    const [entry] = entries
    setVisible(entry.isIntersecting)
  }
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (divRefEnd.current) observer.observe(divRefEnd.current)
    return () => {
      if (divRefEnd.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.observe(divRefEnd.current)
      }
    }
  }, [options, divRefEnd])
  return [isVisible]
}

export default useElementOnScreen
