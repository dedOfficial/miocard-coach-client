import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import ProgressBar from 'react-customizable-progressbar'

import CalendarIcon from '../../../assets/calendar.svg'
import chatStore from '../../../store/chatStore/chat.store'
import { StatsHeaderProps } from './StatsHeader.types'

import {
  styledDatePicker,
  styledDatePickerImg,
  styledDatePickerWrapper,
  styledStatsHeaderButtonLeft,
  styledStatsHeaderWrapper,
} from './StatsHeader.styled'

const StatsHeader: FC<StatsHeaderProps> = ({
  chartValue,
  currentDate,
  setCurrentDay,
}) => {
  const history = useHistory()

  const handleBackBtn = () => {
    history.push(`/operator/chat/${chatStore.currentChat.shortKey}`, {
      fromPage: 'kit',
    })
  }

  return (
    <div className={styledStatsHeaderWrapper}>
      <button
        type="button"
        className={styledStatsHeaderButtonLeft}
        onClick={handleBackBtn}>
        Back
      </button>

      <div className="text-lg font-medium">
        {chatStore.currentChat.dummyName}{' '}
      </div>

      {chatStore.currentChat.kit?.id && (
        <ProgressBar
          strokeColor="#16A34A"
          progress={chartValue.filledValue}
          steps={chartValue.totalValue}
          radius={30}
          trackStrokeWidth={8}
          strokeWidth={8}>
          <div className="flex justify-center items-center absolute w-full h-full top-0">
            <div>
              {chartValue.filledValue}/{chartValue.totalValue}
            </div>
          </div>
        </ProgressBar>
      )}

      <div className={styledDatePickerWrapper}>
        <img
          src={CalendarIcon}
          alt="Calendar"
          className={styledDatePickerImg}
        />
        <DatePicker
          className={styledDatePicker}
          selected={currentDate}
          dateFormat="MMMM, d"
          onChange={setCurrentDay}
        />
      </div>
    </div>
  )
}

export default observer(StatsHeader)
