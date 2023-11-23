import { useEffect, useState } from 'react'

const useIsOnline = (): boolean => {
  const [isOnline, setOnlineStatus] = useState(window.navigator.onLine)

  useEffect(() => {
    const toggleOnlineStatus = () => setOnlineStatus(window.navigator.onLine)

    window.addEventListener('online', toggleOnlineStatus)
    window.addEventListener('offline', toggleOnlineStatus)

    return () => {
      window.removeEventListener('online', toggleOnlineStatus)
      window.removeEventListener('offline', toggleOnlineStatus)
    }
  }, [isOnline])

  return isOnline
}

export default useIsOnline
