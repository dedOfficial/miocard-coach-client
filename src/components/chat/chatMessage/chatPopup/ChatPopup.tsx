import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { ChatPopupProps, ChatPopupItemProps } from './ChatPopup.types'
import { EStatTypeParams } from '../ChatMessage.types'
import {
  styledPopupWrapper,
  styledLoading,
  styledButton,
  styledButtonExit,
} from './ChatPopup.styled'

const ChatPopupItem: FC<ChatPopupItemProps> = observer(
  ({ statLoading, text, onClick }) => (
    <>
      {statLoading ? (
        <p className={styledLoading}>Adding...</p>
      ) : (
        <button type="button" className={styledButton} onClick={onClick}>
          {text}
        </button>
      )}
    </>
  )
)

const chatPopupData = (addStat: ChatPopupProps['addStat']) => [
  {
    text: '+ Add as blood pressure',
    onClick: addStat(EStatTypeParams.ADD_PRESSURE),
  },
  {
    text: '+ Add as heart rate',
    onClick: addStat(EStatTypeParams.ADD_PULSE),
  },
  {
    text: '+ Add as body weight',
    onClick: addStat(EStatTypeParams.ADD_WEIGHT),
  },
  {
    text: '+ Add as mood',
    onClick: addStat(EStatTypeParams.ADD_MOOD),
  },
  {
    text: '+ Add as meal',
    onClick: addStat(EStatTypeParams.ADD_FOOD),
  },
  {
    text: '+ Add as drug',
    onClick: addStat(EStatTypeParams.ADD_DRUG),
  },
  {
    text: '+ Add as symptom',
    onClick: addStat(EStatTypeParams.ADD_SYMPTOM),
  },
  {
    text: '+ Add as note',
    onClick: addStat(EStatTypeParams.ADD_NOTES),
  },
]

const ChatPopup: FC<ChatPopupProps> = ({
  statLoading,
  addStat,
  closePopup,
}) => {
  return (
    <div className={styledPopupWrapper}>
      <div className="text-center">Add highlighted</div>
      {chatPopupData(addStat).map(({ text, onClick }) => (
        <ChatPopupItem
          statLoading={statLoading}
          text={text}
          onClick={onClick}
        />
      ))}
      <button type="button" className={styledButtonExit} onClick={closePopup}>
        Close
      </button>
    </div>
  )
}

export default observer(ChatPopup)
