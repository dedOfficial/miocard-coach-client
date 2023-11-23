import React from 'react'

import { modalWrapperStyle } from './styles'

interface PopUpProps {
  children?: any
}

const ModalPopup: React.ForwardRefRenderFunction<HTMLDivElement, PopUpProps> = (
  { children },
  ref
) => {
  return (
    <div className={` transform ${modalWrapperStyle}`} ref={ref}>
      {children}
    </div>
  )
}

export default React.forwardRef(ModalPopup)
