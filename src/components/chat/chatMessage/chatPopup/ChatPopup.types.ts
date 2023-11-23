import { SyntheticEvent } from 'react'

import { EStatTypeParams } from '../ChatMessage.types'

export interface ChatPopupItemProps {
  statLoading: boolean
  text: string
  onClick: () => void
}

export interface ChatPopupProps {
  statLoading: boolean
  addStat: (statType: EStatTypeParams) => () => void
  closePopup: (e: SyntheticEvent) => void
}
