import React, { useEffect, useMemo, useState } from 'react'

import { ClientInfoType } from '../../constants'
import { CurrentNotesType, PickedDateType } from './constants'
import Header from './components/header'
import NotesList from './components/notes-list'
import { NotesType } from '../../../../../store/notes-store/notes.store.types'
import chatStore from '../../../../../store/chatStore/chat.store'
import { getNotes } from '../../../../../services/notes/notes.service'

interface NotesProps {
  clientInfo?: ClientInfoType
}

const Notes: React.FC<NotesProps> = () => {
  const [notes, setNotes] = useState<NotesType>({
    users: {
      operator: {
        name: null,
        avatar: null,
      },
      assistant: { name: null, avatar: null },
    },
    notes: [],
  })
  const [pickedDate, setPickedDate] = useState<PickedDateType>('Any date')
  const [currentNotes, setCurrentNotes] = useState<CurrentNotesType>({
    coach: true,
    assistant: true,
  })

  const coachNotes = useMemo(() => {
    return notes.notes.filter((item) => item.type === 'coach')
  }, [notes])

  const assistantNotes = useMemo(() => {
    return notes.notes.filter((item) => item.type === 'assistant')
  }, [notes])

  const selectedNotes = useMemo(() => {
    if (currentNotes.coach && currentNotes.assistant) {
      return notes
    }
    if (currentNotes.coach) {
      return { ...notes, notes: coachNotes }
    }
    if (currentNotes.assistant) {
      return { ...notes, notes: assistantNotes }
    }
    return { ...notes, notes: [] }
  }, [
    assistantNotes,
    coachNotes,
    currentNotes.assistant,
    currentNotes.coach,
    notes,
  ])

  useEffect(() => {
    const fetchNotes = async () => {
      if (pickedDate !== 'Any date') {
        const data = await getNotes(
          chatStore.currentChat.clientNumber,
          pickedDate.toUTCString()
        )
        setNotes(data)
      } else {
        const data = await getNotes(chatStore.currentChat.clientNumber, '')
        setNotes(data)
      }
    }
    fetchNotes()
  }, [pickedDate])

  return (
    <div className="w-11/12 text-lg mt-7 h-1/2">
      <Header
        pickedDate={pickedDate}
        setPickedDate={setPickedDate}
        currentNotes={currentNotes}
        setCurrentNotes={setCurrentNotes}
      />

      <NotesList
        selectedNotes={selectedNotes}
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  )
}

export default Notes
