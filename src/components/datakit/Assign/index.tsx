/* eslint-disable no-underscore-dangle */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import dataKitStore from '../../../store/datakitStore/datakit.store'
import chatStore from '../../../store/chatStore/chat.store'
import { ChatType } from '../../../store/chatStore/chat.store.types'
import accountStore from '../../../store/accountStore/account.store'
import Loader from '../../loader/loader'
import {
  chatNameStyle,
  filteredChatsItemStyle,
  styledCheckinCheckbox,
} from './styles'
import 'react-datepicker/dist/react-datepicker.css'
import ListItem from '../../ListItem'
import GroupButtons from '../../controls/submitCancelGroupBtn'
import ChatSearch from '../../ChatSearch'
import { listWrapper } from '../styles'

const AssignDataKit: React.FC = () => {
  const { currentDataKit, assignedChats, dataKits } = dataKitStore
  const { filteredChats } = chatStore

  const { id } = useParams<{ id: string }>()
  const [chatsFilter, setChatsFilter] = useState('')
  const [pickedDate, setPickedDate] = useState<'Any date' | Date>('Any date')

  const navigate = useHistory()

  const findChats = (e: ChangeEvent<HTMLInputElement>) => {
    setChatsFilter(e.target.value)
    chatStore.filterChats(e.target.value)
  }

  const assignedKit = useCallback(
    (idx) => {
      return dataKits.find((dataKit) => dataKit._id === idx)?.name
    },
    [dataKits]
  )

  const chats = useMemo(() => {
    return pickedDate === 'Any date'
      ? filteredChats
      : filteredChats.filter(
          (chat: ChatType) =>
            moment(chat.createdAt).format('MMM D, YY') ===
            moment(pickedDate).format('MMM D, YY')
        )
  }, [pickedDate, filteredChats])

  useEffect(() => {
    if (accountStore.userToken) {
      dataKitStore.fetchDataKitById(id)
    }
  }, [id])

  useEffect(() => {
    return () => dataKitStore.resetAssignedChats()
  }, [])

  useEffect(() => {
    chatStore.filterChats('')
    return () => chatStore.clearFilteredChats()
  }, [])

  const handleSubmit = useCallback(async () => {
    await dataKitStore.assignChats(id, assignedChats)
    await chatStore.fetchAllChats()
    navigate.push(`/data-kit/${id}`)
  }, [assignedChats, id, navigate])

  const disabled = useCallback(
    (_id) => currentDataKit.chats.findIndex((chat) => chat.id === _id) >= 0,
    [currentDataKit]
  )

  const checked = useCallback(
    (_id) =>
      disabled(_id) || assignedChats.findIndex((chat) => chat.id === _id) >= 0,
    [assignedChats, disabled]
  )

  const handleCancelSubmit = () => {
    navigate.push(`/data-kit/${id}`)
  }

  const handleChangeCheckin = (_id, name) => () =>
    dataKitStore.updateAssignedChats(_id, name)

  const handleClearFilter = () => {
    setChatsFilter('')
    chatStore.filterChats('')
  }
  return (
    <>
      <ChatSearch
        chatFilterValue={chatsFilter}
        chatFilterOnChange={findChats}
        chatFilterClear={handleClearFilter}
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
      />
      {dataKitStore.requestInitialState.loading && <Loader />}
      {filteredChats.length !== 0 && (
        <div className={listWrapper}>
          {chats.map((chat: ChatType) => {
            return (
              <ListItem key={chat._id}>
                <div className={filteredChatsItemStyle}>
                  <div
                    className="flex flex-row items-center gap-2"
                    key={chat.shortKey}>
                    <input
                      className={styledCheckinCheckbox}
                      type="checkbox"
                      checked={checked(chat._id)}
                      onChange={handleChangeCheckin(chat._id, chat.dummyName)}
                      disabled={disabled(chat._id)}
                    />
                    <span>{chat.dummyName}</span>
                  </div>
                  <>
                    {chat.kit?.id ? (
                      <span className="text-black">
                        Already assigned:
                        <Link to={`/data-kit/${chat.kit.id}`}>
                          <span className={chatNameStyle}>
                            {assignedKit(chat.kit.id)}
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
      {assignedChats.length !== 0 && (
        <GroupButtons
          onSubmit={handleSubmit}
          onSubmitLabel="Save changes"
          onCancel={handleCancelSubmit}
          onCancelLabel="Cancel"
        />
      )}
    </>
  )
}

export default observer(AssignDataKit)
