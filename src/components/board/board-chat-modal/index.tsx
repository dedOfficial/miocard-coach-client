/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useEffect, useRef, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import InputMask from 'react-input-mask'

import operatorStore from '../../../store/operatorStore/operator.store'
import chatStore from '../../../store/chatStore/chat.store'
import { checkPhoneNumber } from '../../../services/chat/chat.service'
import { OperatorType } from '../../../store/operatorStore/operator.store.types'
import { NewChatType } from '../../../store/chatStore/chat.store.types'
import accountStore from '../../../store/accountStore/account.store'
import useCloseByClickOutside from '../../../hooks/useCloseByClickOutside'

import {
  overlayStyle,
  titleStyle,
  labelStyle,
  inputStyle,
  selectBgStyle,
  selectStyle,
  errorMessageStyle,
  modalWrapperStyle,
  itemStyle,
  textareaStyle,
  cancelBtnStyle,
  addBtnStyle,
  btnsWrapperStyle,
} from './styles'

interface BoardChatModalProps {
  setIsChatModal: (value: boolean) => void
}

const BoardChatModal: FC<BoardChatModalProps> = ({ setIsChatModal }) => {
  const [newChatData, setNewChatData] = useState<Omit<NewChatType, 'token'>>({
    clientNumber: '',
    operatorId: '',
    assistantId: '',
    additionalInformation: '',
  })
  const [hasAssignedChats, setHasAssignedChats] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  const chatModalRef = useRef<HTMLDivElement>(null)

  const isUser = !!accountStore.user.id.length

  useEffect(() => {
    const getOperators = async () => {
      await operatorStore.fetchOperators()
      await operatorStore.fetchAssistants()
    }
    if (isUser) {
      getOperators()
      chatStore.fetchChats()
      chatStore.fetchAllChats()
    }
  }, [isUser])

  const handleSetNewChatData = useCallback(
    (value) => (e) => {
      setNewChatData((prev) => ({ ...prev, [value]: e.target.value }))
    },
    []
  )

  const disabled =
    newChatData.clientNumber.length < 12 ||
    newChatData.clientNumber.includes('_') ||
    newChatData.assistantId === '' ||
    newChatData.operatorId === ''

  useEffect(() => {
    if (disabled) {
      setHasAssignedChats(false)
      return
    }
    const checkPhone = async () => {
      const chats = await checkPhoneNumber(newChatData.clientNumber)
      setHasAssignedChats(chats.length > 0)
    }
    checkPhone()
  }, [disabled, newChatData.clientNumber])

  useEffect(() => {
    setIsErrorMessage(hasAssignedChats)
  }, [hasAssignedChats])

  const handleCreateNewChat = useCallback(async () => {
    if (!hasAssignedChats) {
      await chatStore.createNewChat(newChatData)
      chatStore.fetchAllChats()
      setIsChatModal(false)
    }
  }, [hasAssignedChats, newChatData, setIsChatModal])

  useCloseByClickOutside({
    mainRef: chatModalRef,
    handler: () => setIsChatModal(false),
  })

  return (
    <>
      <div className={overlayStyle} />

      <div className={`transform ${modalWrapperStyle}`} ref={chatModalRef}>
        <div className={titleStyle}>Add new patient</div>
        <div className={itemStyle}>
          <div className={labelStyle}>Responsible coach:</div>
          <select
            className={selectStyle}
            defaultValue="default"
            style={selectBgStyle}
            onChange={handleSetNewChatData('operatorId')}>
            <option value="default" disabled hidden>
              Required field
            </option>
            {operatorStore.operators.map(({ _id, name }: OperatorType) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
          <div className={`${labelStyle} mt-3`}>Responsible assistant:</div>
          <select
            className={selectStyle}
            defaultValue="default"
            style={selectBgStyle}
            onChange={handleSetNewChatData('assistantId')}>
            <option value="default" disabled hidden>
              Required field
            </option>
            {operatorStore.assistants.map(({ _id, name }: OperatorType) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className={itemStyle}>
          <div className={labelStyle}>Patient's phone*:</div>
          <InputMask
            mask="+99999999999"
            type="text"
            placeholder="Patient's phone"
            className={inputStyle}
            onChange={handleSetNewChatData('clientNumber')}
          />
        </div>

        <div className={itemStyle}>
          <div className={labelStyle}>Additional information (optional):</div>
          <textarea
            className={textareaStyle}
            placeholder="Additional information about the patient"
            value={newChatData.additionalInformation}
            onChange={handleSetNewChatData('additionalInformation')}
          />
        </div>

        {isErrorMessage && (
          <p className={errorMessageStyle}>
            A patient with this phone number is already registered
          </p>
        )}

        <div className={btnsWrapperStyle}>
          <button
            className={
              disabled || hasAssignedChats
                ? `${addBtnStyle} disabled:opacity-60 cursor-not-allowed`
                : addBtnStyle
            }
            onClick={handleCreateNewChat}
            type="button"
            disabled={disabled || hasAssignedChats}>
            ADD PATIENT
          </button>
          <button
            className={cancelBtnStyle}
            onClick={() => setIsChatModal(false)}
            type="button">
            CANCEL
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(BoardChatModal)
