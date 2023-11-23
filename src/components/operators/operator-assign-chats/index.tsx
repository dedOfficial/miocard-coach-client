/* eslint-disable no-underscore-dangle */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import 'react-datepicker/dist/react-datepicker.css'

import operatorStore from '../../../store/operatorStore/operator.store'
import { FilteredChatsType } from '../../../store/operatorStore/operator.store.types'
import BoardTitleNew from '../../board/board-title-new'
import Loader from '../../loader/loader'
import ConfirmModal from '../../modals/confirm-modal'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import ListItem from '../../ListItem'
import ChatSearch from '../../ChatSearch'
import chatStore from '../../../store/chatStore/chat.store'

import {
  filteredChatsItemStyle,
  operatorNameStyle,
  checkboxStyle,
  listWrapperStyle,
  checkboxWrapperStyle,
} from './styles'

const OperatorAssignChats: React.FC = () => {
  const [chatsFilter, setChatsFilter] = useState<string>('')
  const [pickedDate, setPickedDate] = useState<'Any date' | Date>('Any date')
  const [chatsToAssign, setChatsToAssign] = useState<string[]>([])
  const [chatsNameToAssign, setChatsNameToassign] = useState<string[]>([])
  const [isShowConfirmModal, setIsShowConfirmModal] = useState<boolean>(false)

  const {
    operatorWithAssign: { name, assignedChats, type },
    filteredChats,
    requestInitialState: { loading },
  } = operatorStore

  const { id } = useParams<{ id: string }>()

  const navigate = useHistory()

  const findChats = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatsFilter(e.target.value)
  }

  const defaultChecked = useCallback(
    (_id) => {
      return assignedChats.findIndex((chat) => chat._id === _id) >= 0
    },
    [assignedChats]
  )

  const checked = useCallback(
    (_id) => {
      return (
        chatsToAssign.findIndex((chatId) => chatId === _id) >= 0 ||
        defaultChecked(_id)
      )
    },
    [chatsToAssign, defaultChecked]
  )

  const handleSetChatsToAssign = useCallback(
    (newChat: FilteredChatsType) => {
      let newChatsToAssign = [...chatsToAssign]
      let newChatsNameToAssign = [...chatsNameToAssign]

      if (
        chatsToAssign.includes(newChat._id) &&
        chatsNameToAssign.includes(newChat.dummyName)
      ) {
        newChatsToAssign = newChatsToAssign.filter(
          (chatId) => chatId !== newChat._id
        )
        newChatsNameToAssign = newChatsNameToAssign.filter(
          (chatName) => chatName !== newChat.dummyName
        )
      } else {
        newChatsToAssign = [...chatsToAssign, newChat._id]
        newChatsNameToAssign = [...chatsNameToAssign, newChat.dummyName]
      }
      setChatsToAssign(newChatsToAssign)
      setChatsNameToassign(newChatsNameToAssign)
    },
    [chatsNameToAssign, chatsToAssign]
  )

  const chatNames = filteredChats
    .filter((chat) => chat.assigned?._id)
    .map((chat) => chat.dummyName)
    .filter((chat) => chatsNameToAssign.indexOf(chat) !== -1)

  const handleClearFilter = () => {
    setChatsFilter('')
  }

  const handleSubmit = useCallback(async () => {
    await operatorStore.updateAssignedChats(id, chatsToAssign)
    await chatStore.fetchAllChats()
    setChatsToAssign([])
    navigate.push(`/operator/${id}`)
  }, [chatsToAssign, id, navigate])

  const handleCancelSubmit = useCallback(() => {
    setChatsToAssign([])
    navigate.push(`/operator/${id}`)
  }, [id, navigate])

  useEffect(() => {
    const getOperator = async () => {
      await operatorStore.fetchOperatorWithAssign(id)
    }

    const getFilteredChats = async (chatName, date) => {
      await operatorStore.fetchFilteredChats(chatName, date)
    }

    getOperator()
    getFilteredChats('', '')
  }, [id])

  if (loading) return <Loader />

  return (
    <>
      {isShowConfirmModal && (
        <ConfirmModal
          onSave={handleSubmit}
          onClose={() => setIsShowConfirmModal(false)}
          operatorName={name}
          chatNames={chatNames}
        />
      )}

      <BoardTitleNew title={`${name}: Assign operators to the chats`} back />
      <ChatSearch
        chatFilterValue={chatsFilter}
        chatFilterOnChange={findChats}
        chatFilterClear={handleClearFilter}
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
      />
      {filteredChats.length !== 0 && (
        <div className={listWrapperStyle}>
          {filteredChats
            .filter((chat) => {
              const chatData = `${chat.dummyName?.toUpperCase()}`

              return chatData.indexOf(chatsFilter.toUpperCase()) > -1
            })
            .filter((chat) => chat.type === type)
            .map((chat: FilteredChatsType) => {
              return (
                <ListItem key={chat._id}>
                  <div className={filteredChatsItemStyle}>
                    <div className={checkboxWrapperStyle} key={chat.dummyName}>
                      <input
                        className={checkboxStyle}
                        type="checkbox"
                        checked={checked(chat._id)}
                        onChange={() => handleSetChatsToAssign(chat)}
                        disabled={defaultChecked(chat._id)}
                      />
                      <span>{chat.dummyName}</span>
                    </div>
                    <>
                      {chat.assigned?.name ? (
                        <span className="text-black">
                          Already assigned:
                          <Link to={`/operator/${chat.assigned._id}`}>
                            <span className={operatorNameStyle}>
                              {chat.assigned?.name}
                            </span>
                          </Link>
                        </span>
                      ) : null}
                    </>
                  </div>
                </ListItem>
              )
            })}
        </div>
      )}
      <GroupButtons
        onSubmit={() => setIsShowConfirmModal(true)}
        onSubmitLabel="Save changes"
        onCancel={handleCancelSubmit}
        onCancelLabel="cancel"
        disabled={chatsToAssign.length === 0}
      />
    </>
  )
}

export default observer(OperatorAssignChats)
