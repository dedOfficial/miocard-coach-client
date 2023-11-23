/* eslint-disable consistent-return */
import { useEffect, useState } from 'react'

const DEFAULT_DELAY_IN_MS = 5000

type UseTimeout = (callback: () => void, delay?: number) => () => void

const useTimeout: UseTimeout = (callback, delay = DEFAULT_DELAY_IN_MS) => {
  const [timeoutId, setTimeoutId] = useState<number>()

  useEffect(() => {
    if (timeoutId !== undefined) {
      return () => clearTimeout(timeoutId)
    }
  }, [timeoutId])

  return () => setTimeoutId(+setTimeout(callback, delay))
}

export default useTimeout
