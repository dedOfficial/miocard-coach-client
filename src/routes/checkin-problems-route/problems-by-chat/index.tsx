/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from '../../../store/accountStore/account.store'
import chatStore from '../../../store/chatStore/chat.store'
import checkinProblemsStore from '../../../store/checkinProblemsStore/checkinProblems.store'
import BoardHeader from '../../../components/board/BoardHeader'
import BoardFooter from '../../../components/board/BoardFooter'
import BoardTitleNew from '../../../components/board/board-title-new'
import Loader from '../../../components/loader/loader'
import ProblemsByChatList from '../../../components/checkin-problems/problems-by-chat'

import { mainWrapperStyle } from '../../boardRoute/BoardRoute.styled'

const CheckinProblemsByChatRoute: React.FC = () => {
  const { problemsByChat } = checkinProblemsStore

  const { loading } = checkinProblemsStore.requestInitialState

  const { chatId } = useParams<{ chatId: string }>()

  const isUser = !!accountStore.user.id.length

  useEffect(() => {
    if (isUser) {
      checkinProblemsStore.fetchProblemsByChat(chatId)
    }
  }, [chatId, isUser])

  const chatName =
    chatStore.allChats.find((chat) => chat._id === chatId)?.dummyName || ''

  if (loading) return <Loader />

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title={`Check-in problems: ${chatName}`} back />

      {problemsByChat.length > 0 && (
        <ProblemsByChatList problems={problemsByChat} />
      )}

      <BoardFooter />
    </div>
  )
}

export default observer(CheckinProblemsByChatRoute)
