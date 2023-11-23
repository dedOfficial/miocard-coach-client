import { useCallback, useEffect } from 'react'

const usePressEnter = (handler: () => void): void => {
  const onPressEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handler()
      }
    },
    [handler]
  )

  useEffect(() => {
    document.addEventListener('keydown', onPressEnter)
    return () => {
      document.removeEventListener('keydown', onPressEnter)
    }
  })
}

export default usePressEnter
