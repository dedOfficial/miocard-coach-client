import moment from 'moment'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import {
  chatFilterWrapper,
  chatSearchWrapper,
  datePickerBox,
  inputFilter,
  inputFilterBox,
  pickedDateBox,
  pickedDateBtn,
  pickedDateValue,
  pickedDateWrapper,
  section,
  sectionTitle,
} from './styles'
import Close from '../../assets/closeRed.svg'
import CalendarIcon from '../../assets/calendar.svg'
import useCloseByClickOutside from '../../hooks/useCloseByClickOutside'

interface ChatSearchProps {
  chatFilterValue: string
  chatFilterOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  chatFilterClear: () => void
  pickedDate: 'Any date' | Date
  setPickedDate: React.Dispatch<any>
}

const ChatSearch: React.FC<ChatSearchProps> = ({
  chatFilterValue,
  chatFilterOnChange,
  chatFilterClear,
  pickedDate,
  setPickedDate,
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

  return (
    <section className={section}>
      <span className={sectionTitle}>Assign to chats:</span>
      <div className={chatSearchWrapper}>
        <div className={chatFilterWrapper}>
          <span>Chat name:</span>
          <div className={inputFilterBox}>
            <input
              className={inputFilter}
              type="text"
              placeholder="Find chats..."
              onChange={chatFilterOnChange}
              value={chatFilterValue}
            />
            <button type="button" onClick={chatFilterClear}>
              <img src={Close} alt="Logo" className="w-4" />
            </button>
          </div>
        </div>
        <div className={pickedDateWrapper}>
          <span>Chat creation date:</span>
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
      </div>
    </section>
  )
}

export default ChatSearch
