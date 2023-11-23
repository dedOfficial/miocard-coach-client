import React from 'react'
import { observer } from 'mobx-react-lite'

import {
  wrapperStyle,
  checkboxWrapperStyle,
  checkboxStyle,
  labelStyle,
} from './styles'

interface CheckinItemProps {
  checkinItem: { text: string; value: string }
  handleCheckins: (e: React.ChangeEvent<HTMLInputElement>) => void
  selectedCheckins: string[]
}

const CheckinItem: React.FC<CheckinItemProps> = ({
  checkinItem,
  handleCheckins,
  selectedCheckins,
}) => {
  return (
    <div className={wrapperStyle}>
      <div className={checkboxWrapperStyle}>
        <input
          id={checkinItem.value}
          className={checkboxStyle}
          type="checkbox"
          value={checkinItem.value}
          checked={selectedCheckins.includes(checkinItem.value)}
          onChange={handleCheckins}
        />
      </div>

      <label htmlFor={checkinItem.value} className={labelStyle}>
        {checkinItem.text}
      </label>
    </div>
  )
}

export default observer(CheckinItem)
