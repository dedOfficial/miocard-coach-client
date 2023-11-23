/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import DatePicker from 'react-datepicker'

import CalendarIcon from '../../../../../../../assets/calendar.svg'
import Close from '../../../../../../../assets/closeRed.svg'
import useCloseByClickOutside from '../../../../../../../hooks/useCloseByClickOutside'

import {
  headerWrapperStyle,
  checkboxWrapperStyle,
  checkboxStyle,
  pickedDateWrapper,
  pickedDateBox,
  pickedDateBtn,
  pickedDateValue,
  datePickerBox,
} from './styles'
import { CurrentNotesType, PickedDateType } from '../../constants'

interface HeaderProps {
  pickedDate: PickedDateType
  setPickedDate: React.Dispatch<React.SetStateAction<PickedDateType>>
  currentNotes: CurrentNotesType
  setCurrentNotes: React.Dispatch<React.SetStateAction<CurrentNotesType>>
}

const Header: React.FC<HeaderProps> = ({
  pickedDate,
  setPickedDate,
  currentNotes,
  setCurrentNotes,
}) => {
  const [isOpenCalendar, isSetOpenCalendar] = useState(false)
  const btnOpenCalendarRef = useRef<HTMLButtonElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: calendarRef,
    handler: () => isSetOpenCalendar(false),
    dependentRefs: [btnOpenCalendarRef],
  })

  const toggleShowCalendar = () => isSetOpenCalendar((prev) => !prev)

  const handleNotes = useCallback(
    (role: string) => {
      if (role === 'coach') {
        if (currentNotes.coach && !currentNotes.assistant) {
          return
        }
        setCurrentNotes({ ...currentNotes, coach: !currentNotes.coach })
      }
      if (role === 'assistant') {
        if (currentNotes.assistant && !currentNotes.coach) {
          return
        }
        setCurrentNotes({ ...currentNotes, assistant: !currentNotes.assistant })
      }
    },
    [currentNotes, setCurrentNotes]
  )

  return (
    <div className={headerWrapperStyle}>
      <div className={pickedDateWrapper}>
        <div className={pickedDateBox}>
          <button
            className={pickedDateBtn}
            onClick={toggleShowCalendar}
            type="button"
            ref={btnOpenCalendarRef}>
            <span className={pickedDateValue}>
              {pickedDate === 'Any date'
                ? pickedDate
                : moment(pickedDate).format('MMM D, YY')}
            </span>
            <img src={CalendarIcon} alt="Calendar" />
          </button>
          {pickedDate !== 'Any date' && (
            <button type="button" onClick={() => setPickedDate('Any date')}>
              <img src={Close} alt="Logo" className="w-4" />
            </button>
          )}
        </div>
        {isOpenCalendar && (
          <div ref={calendarRef} className={datePickerBox}>
            <DatePicker
              selected={pickedDate === 'Any date' ? new Date() : pickedDate}
              dateFormat="MMMM, d"
              onChange={setPickedDate}
              inline
            />
          </div>
        )}
      </div>

      <div className="flex gap-8">
        <div className={checkboxWrapperStyle}>
          <input
            id="coach"
            type="checkbox"
            className={checkboxStyle}
            onChange={() => handleNotes('coach')}
            checked={currentNotes.coach}
          />
          <label htmlFor="coach">Coach records</label>
        </div>
        <div className={checkboxWrapperStyle}>
          <input
            id="assistant"
            type="checkbox"
            className={checkboxStyle}
            onChange={() => handleNotes('assistant')}
            checked={currentNotes.assistant}
          />
          <label htmlFor="assistant">Health assistant records</label>
        </div>
      </div>
    </div>
  )
}

export default observer(Header)
