import React, { useEffect, useCallback } from 'react'

interface CustomHookProps {
  mainRef: React.RefObject<any>
  handler: (e?: Event) => void
  dependentRefs?: Array<React.RefObject<any>>
}

const useCloseByClickOutside = ({
  mainRef,
  handler,
  dependentRefs,
}: CustomHookProps): void => {
  const isOutside = useCallback(
    (event: Event) => {
      const condition =
        mainRef.current && !mainRef.current.contains(event.target)

      if (dependentRefs)
        return (
          condition &&
          dependentRefs.every(
            (ref) => ref.current && !ref.current.contains(event.target)
          )
        )

      return condition
    },
    [mainRef, dependentRefs]
  )

  useEffect(() => {
    const handlerClickOutside = (event: Event) => {
      if (isOutside(event)) {
        handler(event)
      }
    }
    document.addEventListener('click', handlerClickOutside)
    return () => {
      document.removeEventListener('click', handlerClickOutside)
    }
  }, [handler, isOutside])
}

export default useCloseByClickOutside
