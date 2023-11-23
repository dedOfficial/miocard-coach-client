/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { FC, useState, useCallback, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { classnames } from 'tailwindcss-classnames'
import { API_URL } from 'config'
import DatePicker from 'react-datepicker'
import useCloseByClickOutside from 'hooks/useCloseByClickOutside'

import doctorStore from '../../store/doctorStore/doctor.store'
import operatorStore from '../../store/operatorStore/operator.store'
import { OperatorTemplateType } from '../../store/operatorStore/operator.store.types'
import chatStore from '../../store/chatStore/chat.store'
import { removeReplyChatMessage } from '../../helpers/chat/chat.helper'
import CloseIcon from '../../assets/close.svg'
import ChatConfirmPopup from './ChatConfirmPopup'
import ChatMenu from './ChatMenu'
import 'react-datepicker/dist/react-datepicker.css'
import ChatClientInfo from './chat-client-info'
import ChatDashboard from './chat-dashboard'

interface ChatTitleProps {
  chatId?: string
  isOperator?: boolean
  isDoctor?: boolean
}

const titleWrapperStyle = classnames(
  'py-2',
  'px-3',
  'border-b-2',
  'flex',
  'items-center',
  'justify-between',
  'flex-wrap'
)
const userTitleWrapperStyle = classnames(
  'py-2',
  'px-3',
  'border-b-2',
  'flex',
  'items-center'
)
const titleStyle = classnames(
  'hover:text-blue-500',
  'font-medium',
  'ml-2',
  'border-b',
  'border-gray-400',
  'break-words',
  'max-w-xs',
  'hover:border-blue-300',
  'transition'
)
const smsSentStyle = classnames(
  'text-sm',
  'text-gray-600',
  'inline-block',
  'py-2',
  'px-4'
)
const testimonialWrapperStyle = classnames(
  'flex',
  'flex-col',
  'items-center',
  'py-0',
  'px-0'
)

const modalBackgroundStyle = classnames(
  'w-full',
  'bg-black',
  'opacity-60',
  'h-full',
  'max-w-3xl',
  'absolute'
)
const templatesBackgroundStyle = classnames(
  'w-full',
  'bg-white',
  'h-full',
  'max-w-3xl',
  'absolute',
  'z-10'
)
const closeStyle = classnames('flex', 'justify-end')
const closeButtonStyle = classnames(
  'p-4',
  'text-lg',
  'font-medium',
  'bg-blue-500',
  'text-white',
  'rounded-xl',
  'hover:opacity-80',
  'transition',
  'mt-3',
  'w-full'
)
const closeOutlinedButtonStyle = classnames(
  'p-4',
  'text-lg',
  'font-medium',
  'bg-blue-500',
  'text-white',
  'rounded-xl',
  'opacity-80',
  'hover:opacity-60',
  'transition',
  'mt-3',
  'w-full'
)
const chatConfirmTitle = classnames('p-4', 'mt-3', 'w-full')
const menuBackgroundStyle = classnames(
  'w-full',
  'h-full',
  'max-w-3xl',
  'absolute',
  'z-30'
)
const menuButton = classnames(
  'text-blue-800',
  'transition',
  'p-3',
  'text-lg',
  'w-56',
  'rounded-xl',
  'hover:bg-blue-100',
  'text-left'
)
const chatMenuStyle = classnames(
  'flex',
  'flex-col',
  'p-5',
  'bg-white',
  'rounded-xl',
  'border',
  'border-blue-900',
  'border-opacity-50',
  'shadow-2xl'
)

const actionsButton = classnames(
  'text-blue-500',
  'border-2',
  'border-l-0',
  'text-sm',
  'border-r-0',
  'border-blue-500',
  'p-2',
  'm-1',
  'mx-0',
  'hover:opacity-70',
  'transition'
)

const chartsButton = classnames(
  'text-blue-500',
  'border-2',
  'border-r-0',
  'text-sm',
  'border-blue-500',
  'p-2',
  'm-1',
  'mx-0',
  'hover:opacity-70',
  'transition'
)

const noAvatarStyle = classnames(
  'flex',
  'justify-center',
  'items-center',
  'bg-gradient-to-r',
  'to-blue-500',
  'from-green-400',
  'font-bold',
  'text-white',
  'ring-2',
  'ring-white',
  'rounded-full',
  'h-12',
  'w-12'
)
const avatarStyle = classnames(
  'h-full',
  'w-full',
  'object-cover',
  'rounded-full'
)

const titleOnlineStyle = classnames('text-green-400', 'px-1', 'rounded-md')
const titleOfflineStyle = classnames('text-red-400', 'px-1', 'rounded-md')
const titleTypingStyle = classnames('text-yellow-400', 'px-1', 'rounded-md')

const operatorTemplateWrapperStyle = classnames(
  'py-3',
  'border-t-2',
  'flex',
  'flex-row',
  'justify-between',
  'items-center'
)

const ChatTitle: FC<ChatTitleProps> = ({ chatId, isOperator, isDoctor }) => {
  const [smsSent, setSmsSent] = useState(false)
  const [docSent, setDocSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showSmsTemplatesModal, setShowSmsTemplatesModal] = useState(false)
  const [showExportStats, setShowExportStats] = useState(false)
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false)
  const chatConfirmModalRef = useRef<HTMLDivElement>(null)
  const chatMenuRef = useRef<HTMLDivElement>(null)
  const actionsButtonRef = useRef<HTMLButtonElement>(null)
  const [chatStartDate, setChatStartDate] = useState(new Date())
  const [statsStartDate, setStatsStartDate] = useState(new Date())
  const [chatEndDate, setChatEndDate] = useState(new Date())
  const [statsEndDate, setStatsEndDate] = useState(new Date())
  const history = useHistory()
  const location = useLocation<{ fromPage: string }>()
  const fromKit = location.state?.fromPage === 'kit'

  const handleCallTheDoctor = useCallback(async () => {
    setLoading(true)
    await doctorStore.callTheDoctor(chatId as string)
    setLoading(false)
    setDocSent(true)
    setShowConfirmModal(false)
  }, [chatId])

  const handleResendSMS = useCallback(async (templateId: string) => {
    setLoading(true)
    await doctorStore.resendSMS(templateId as string, chatStore.currentChat._id)
    setLoading(false)
    setSmsSent(true)
    setShowWidgetsMenu(false)
    setShowSmsTemplatesModal(false)
  }, [])

  const handleChangeConfirmModal = useCallback(
    (flag: boolean) => () => {
      setShowConfirmModal(flag)
    },
    []
  )
  const handleChangeWidgetsMenu = useCallback(() => {
    setShowWidgetsMenu(!showWidgetsMenu)
  }, [showWidgetsMenu])

  const handleBackBtn = useCallback(() => {
    if (fromKit) {
      removeReplyChatMessage()
      history.push('/')
    } else {
      removeReplyChatMessage()
      history.goBack()
    }
  }, [fromKit, history])

  useCloseByClickOutside({
    mainRef: chatMenuRef,
    handler: () => setShowWidgetsMenu(false),
    dependentRefs: [actionsButtonRef],
  })

  useCloseByClickOutside({
    mainRef: chatConfirmModalRef,
    handler: () => showConfirmModal && setShowConfirmModal(false),
  })

  if (isOperator) {
    return (
      <>
        {showSmsTemplatesModal && (
          <div className={templatesBackgroundStyle}>
            <div>
              <div className="flex justify-between py-5">
                <span className="font-bold">Send SMS template</span>
                <button
                  type="button"
                  onClick={() => setShowSmsTemplatesModal(false)}>
                  <img src={CloseIcon} alt="Close" />
                </button>
              </div>
              {operatorStore.operatorTemplates
                // eslint-disable-next-line @typescript-eslint/no-shadow
                .map(({ name, text, _id }: OperatorTemplateType) => (
                  <div className={operatorTemplateWrapperStyle} key={_id}>
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="break-words max-w-2xl text-gray-700">
                        {text}
                      </p>
                    </div>
                    {!loading && (
                      <button
                        type="button"
                        className="p-3 border-2 border-blue-400 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition"
                        onClick={() => handleResendSMS(_id)}>
                        Send
                      </button>
                    )}
                    {loading && (
                      <span className="text-sm text-gray-700">Sending</span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {showExportStats && (
          <div className={templatesBackgroundStyle}>
            <div>
              <div className="flex justify-between py-5">
                <span className="font-bold">Export chat statistics</span>
                <button type="button" onClick={() => setShowExportStats(false)}>
                  <img src={CloseIcon} alt="Close" />
                </button>
              </div>

              <div className={operatorTemplateWrapperStyle}>
                <div>
                  <p className="font-medium pb-3">Export chat history</p>
                  <div className="text-gray-700">
                    Start date:
                    <DatePicker
                      className="border-2 p-3 rounded-xl font-medium"
                      selected={chatStartDate}
                      onChange={(date) => {
                        setChatStartDate(date)
                      }}
                    />
                    End date:
                    <DatePicker
                      className="border-2 p-3 rounded-xl font-medium"
                      selected={chatEndDate}
                      onChange={(date) => {
                        setChatEndDate(date)
                      }}
                    />
                  </div>
                </div>
                <a
                  className="p-3 border-2 border-blue-400 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition"
                  href={`${API_URL}export/${chatId}?sd=${chatStartDate.toUTCString()}&ed=${chatEndDate.toUTCString()}`}>
                  Download
                </a>
              </div>
              <div className={operatorTemplateWrapperStyle}>
                <div>
                  <p className="font-medium pb-3">Export chat statistics</p>
                  <div className="text-gray-700">
                    {' '}
                    Start date:
                    <DatePicker
                      className="border-2 p-3 rounded-xl font-medium"
                      selected={statsStartDate}
                      onChange={(date) => {
                        setStatsStartDate(date)
                      }}
                    />
                    End date:
                    <DatePicker
                      className="border-2 p-3 rounded-xl font-medium"
                      selected={statsEndDate}
                      onChange={(date) => {
                        setStatsEndDate(date)
                      }}
                    />
                  </div>
                </div>
                <a
                  className="p-3 border-2 border-blue-400 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition"
                  href={`${API_URL}export/stats/${chatId}?sd=${statsStartDate.toUTCString()}&ed=${statsEndDate.toUTCString()}`}>
                  Download
                </a>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && <div className={modalBackgroundStyle} />}
        {showConfirmModal && (
          <ChatConfirmPopup>
            <div ref={chatConfirmModalRef}>
              <div className={closeStyle}>
                <button type="button" onClick={handleChangeConfirmModal(false)}>
                  <img src={CloseIcon} alt="Close" />
                </button>
              </div>
              <div className={chatConfirmTitle}>
                <h1>Are you sure you want to call the doctor?</h1>
              </div>
              <button
                className={closeButtonStyle}
                type="button"
                onClick={handleCallTheDoctor}>
                Proceed
              </button>
              <button
                className={closeOutlinedButtonStyle}
                type="button"
                onClick={handleChangeConfirmModal(false)}>
                Close
              </button>
            </div>
          </ChatConfirmPopup>
        )}
        {showWidgetsMenu && <div className={menuBackgroundStyle} />}
        {showWidgetsMenu && (
          <ChatMenu>
            <div className={chatMenuStyle} ref={chatMenuRef}>
              <a
                href={`callto://${chatStore.currentChat.clientNumber}`}
                className={menuButton}>
                Call via Skype
              </a>
              {!smsSent && !loading && (
                <button
                  type="button"
                  className={menuButton}
                  onClick={() => {
                    setShowSmsTemplatesModal(true)
                    setShowWidgetsMenu(false)
                  }}>
                  Send SMS template
                </button>
              )}
              <button
                type="button"
                className={menuButton}
                onClick={() => {
                  setShowExportStats(true)
                  setShowWidgetsMenu(false)
                }}>
                Export by dates
              </button>
              {loading && <div className={smsSentStyle}>Sending SMS...</div>}
              {smsSent && <div className={smsSentStyle}>SMS sent</div>}
              {!docSent && !loading && (
                <button
                  type="button"
                  className={menuButton}
                  onClick={() => {
                    setShowConfirmModal(true)
                    setShowWidgetsMenu(false)
                  }}>
                  Call doctor
                </button>
              )}
              {loading && <div className={smsSentStyle}>Calling doc...</div>}
              {docSent && <div className={smsSentStyle}>Doc called</div>}
              <a
                className={menuButton}
                href={`${API_URL}v2/export/${chatStore.currentChat.clientNumber}`}>
                Export excel
              </a>
            </div>
          </ChatMenu>
        )}
        <div className={titleWrapperStyle}>
          <div
            onClick={handleBackBtn}
            className="font-medium text-gray-400 border-2 rounded-lg p-2 text-sm transition hover:opacity-70 border-gray-300 cursor-pointer">
            Back
          </div>
          <div className={testimonialWrapperStyle}>
            <Link to={`/stats/${chatStore.currentChat.clientNumber}`}>
              <div onClick={removeReplyChatMessage} className={titleStyle}>
                {`${chatStore.currentChat.dummyName || ''}`}
                {chatStore.currentChat.personalInfo?.clientName
                  ? ` (${chatStore.currentChat.personalInfo?.clientName})`
                  : ''}
              </div>
            </Link>
          </div>
          <div className="flex" role="group">
            <ChatClientInfo />
            <button
              type="button"
              className={actionsButton}
              onClick={() => {
                history.push(`/charts/${chatId}`)
              }}>
              Charts
            </button>
            <button
              ref={actionsButtonRef}
              type="button"
              className={chartsButton}
              onClick={handleChangeWidgetsMenu}>
              Actions
            </button>
            <ChatDashboard />
          </div>
        </div>
      </>
    )
  }
  if (isDoctor) {
    return (
      <div className={titleWrapperStyle}>
        <div
          onClick={handleBackBtn}
          className="font-medium text-gray-400 cursor-pointer">
          {'<'} Back
        </div>
        <div className={testimonialWrapperStyle}>
          <Link to={`/stats/${chatStore.currentChat.clientNumber}`}>
            <div className={titleStyle}>
              {`${chatStore.currentChat.dummyName || ''} (${
                chatStore.currentChat.personalInfo?.clientName || ''
              })`}
            </div>
          </Link>
        </div>
        <div />
      </div>
    )
  }

  return (
    <div className={userTitleWrapperStyle}>
      {chatStore.activeOperator.operatorAvatar ? (
        <div className="h-12 w-12 mr-2">
          <img
            className={avatarStyle}
            src={`${API_URL}static/${chatStore.activeOperator.operatorAvatar}`}
            alt=""
          />
        </div>
      ) : (
        <div className={noAvatarStyle}>
          {chatStore.activeOperator.operatorName.charAt(0)}
        </div>
      )}
      <div className={titleStyle}>
        {chatStore.activeOperator.operatorName}{' '}
        {chatStore.coachIsTyping ? (
          <span className={titleTypingStyle}>typing...</span>
        ) : chatStore.activeOperator.isOperatorStatus ? (
          <span className={titleOnlineStyle}>&bull; Online</span>
        ) : (
          <span className={titleOfflineStyle}>Offline</span>
        )}
      </div>
    </div>
  )
}

export default observer(ChatTitle, { forwardRef: true })
