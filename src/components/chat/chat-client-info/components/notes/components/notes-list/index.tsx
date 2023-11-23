/* eslint-disable no-underscore-dangle */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from 'store/chatStore/chat.store'
import moment from 'moment'
import accountStore from '../../../../../../../store/accountStore/account.store'
import Send from '../../../../../../../assets/newSend.svg'
import NotesItem from './components/notes-item'
import {
  NotesType,
  NoteType,
} from '../../../../../../../store/notes-store/notes.store.types'
import { createNote } from '../../../../../../../services/notes/notes.service'

import {
  notesWrapper,
  notesFooterStyle,
  inputStyle,
  sendBtnStyle,
  dateStyle,
} from './styles'

interface NotesListProps {
  selectedNotes: NotesType
  notes: NotesType
  setNotes: React.Dispatch<React.SetStateAction<NotesType>>
}

const NotesList: React.FC<NotesListProps> = ({
  selectedNotes,
  notes,
  setNotes,
}) => {
  const [message, setMessage] = useState('')
  const { type } = accountStore.user
  type GroupedNotes = Array<[string, Array<NoteType>]>
  const groupedNotes: GroupedNotes = Object.entries(
    selectedNotes.notes.reduce((acc, elem) => {
      const date = moment(elem.createdAt).format('MMM Do YYYY')
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(elem)
      return acc
    }, {})
  )

  const handleMessage = useCallback((e) => {
    setMessage(e.target.value)
  }, [])

  const sendNote = useCallback(async () => {
    if (message) {
      const data = await createNote(
        chatStore.currentChat.clientNumber,
        type,
        message
      )
      setNotes({ ...notes, notes: [...notes.notes, data] })
      setMessage('')
    }
  }, [message, notes, setNotes, type])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendNote()
    }
  }

  return (
    <>
      <div className={`${notesWrapper}`}>
        {groupedNotes.map((group) => {
          return (
            <div key={group[0]}>
              <div className={dateStyle}>{group[0]}</div>
              {group[1].map((item) => (
                <NotesItem
                  key={item._id}
                  item={item}
                  name={
                    item.type === 'coach'
                      ? notes.users.operator.name
                      : notes.users.assistant.name
                  }
                  avatar={
                    item.type === 'coach'
                      ? notes.users.operator.avatar
                      : notes.users.assistant.avatar
                  }
                />
              ))}
            </div>
          )
        })}
      </div>

      <div className={notesFooterStyle}>
        <textarea
          className={inputStyle}
          placeholder="Type your note here"
          value={message}
          onChange={handleMessage}
          onKeyDown={handleKeyDown}
        />
        <button className={sendBtnStyle} type="button" onClick={sendNote}>
          <img src={Send} alt="send" />
        </button>
      </div>
    </>
  )
}

export default observer(NotesList)
