/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from 'store/chatStore/chat.store'
import ActionButton from '../../../../controls/action-btn'
import statsStore from '../../../../../store/statsStore/stats.store'
import CheckinItem from './components/checkin-item'
import {
  initialCheckins,
  checkinsName,
  CheckinType,
  defaultCheckin,
} from './constants'

import {
  wrapperStyle,
  headerStyle,
  greenStyle,
  redStyle,
  toggleBtnStyle,
  iconStyle,
  iconTopStyle,
  iconBottomStyle,
  sendBtnStyle,
  checkinsWrapperStyle,
  inputStyle,
} from './styles'

export interface CheckinProps {
  currentCheckin: string
  clientNumber: string
  currentDate: string
}

const Checkin: React.FC<CheckinProps> = ({
  currentCheckin,
  clientNumber,
  currentDate,
}) => {
  const { id: kitId } = chatStore.currentChat.kit

  const [checkin, setCheckin] = useState<CheckinType>(defaultCheckin)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCheckins, setSelectedCheckins] = useState<Array<string>>([])

  const toggle = () => {
    setIsOpen((prev) => !prev)
  }

  const handleCheckins = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newCheckins = [...selectedCheckins, e.target.value]

      if (selectedCheckins.includes(e.target.value)) {
        newCheckins = newCheckins.filter((item) => item !== e.target.value)
      }

      if (newCheckins.includes('isNoProblems')) {
        newCheckins = ['isNoProblems']
      }

      setSelectedCheckins(newCheckins)
    },
    [selectedCheckins]
  )

  const handleAdditionally = useCallback(
    (e) => {
      setCheckin({ ...checkin, additionally: e.target.value })
    },
    [checkin]
  )

  const findLastCheckin = useCallback(() => {
    const arr = [...statsStore.checkins]
    return arr
      .reverse()
      .find(
        (el) =>
          el.clientNumber === clientNumber &&
          el.day === currentDate &&
          el.checkin === currentCheckin &&
          el.chatId === chatStore.currentChat._id
      )
  }, [clientNumber, currentCheckin, currentDate])

  const theCurrentCheckin = findLastCheckin()

  useEffect(() => {
    if (theCurrentCheckin) {
      setCheckin({
        checkins: theCurrentCheckin.checkinCheckboxes,
        additionally: theCurrentCheckin.additionally || '',
      })
      setSelectedCheckins(theCurrentCheckin.checkinCheckboxes)
    } else {
      setCheckin(defaultCheckin)
      setSelectedCheckins([])
    }
  }, [theCurrentCheckin])

  const isFormFilled = useMemo(() => {
    return selectedCheckins.length > 0 || checkin.additionally.length > 0
  }, [checkin.additionally.length, selectedCheckins.length])

  const additionallyValue = useMemo(() => {
    return checkin.additionally
      ? checkin.additionally
      : theCurrentCheckin?.additionally
  }, [checkin, theCurrentCheckin])

  const editCheckin = useCallback(() => {
    if (theCurrentCheckin) {
      statsStore.editCheckin(
        selectedCheckins,
        checkin.additionally,
        theCurrentCheckin._id
      )
      setIsOpen(false)
    }
  }, [checkin.additionally, selectedCheckins, theCurrentCheckin])

  const sendCheckin = useCallback(() => {
    if (theCurrentCheckin) {
      editCheckin()
    } else {
      statsStore.addCheckin(
        kitId,
        selectedCheckins,
        checkin.additionally,
        currentDate,
        currentCheckin
      )
    }
    setIsOpen(false)
  }, [
    checkin.additionally,
    currentCheckin,
    currentDate,
    editCheckin,
    kitId,
    selectedCheckins,
    theCurrentCheckin,
  ])

  return (
    <div className={wrapperStyle}>
      <div className={headerStyle}>
        <div>
          <div
            className={
              theCurrentCheckin && selectedCheckins.length > 0
                ? greenStyle
                : redStyle
            }>
            {checkinsName[currentCheckin]}
          </div>
          <div className="flex items-center" onClick={toggle}>
            <button className={toggleBtnStyle} type="button">
              {isOpen ? 'Hide options' : 'Show options'}
            </button>
            <div className={iconStyle}>
              <div className={isOpen ? iconTopStyle : iconBottomStyle} />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className={sendBtnStyle}>
            <ActionButton
              label="Send"
              action={sendCheckin}
              disabled={!isFormFilled}
            />
          </div>
        )}
      </div>

      {isOpen && (
        <>
          <div className={checkinsWrapperStyle}>
            {initialCheckins.map((checkinItem) => (
              <CheckinItem
                key={checkinItem.text}
                checkinItem={checkinItem}
                handleCheckins={handleCheckins}
                selectedCheckins={selectedCheckins}
              />
            ))}
          </div>
          <div>
            <input
              type="text"
              placeholder="Client's additional information"
              className={inputStyle}
              onChange={handleAdditionally}
              value={additionallyValue}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default observer(Checkin)
