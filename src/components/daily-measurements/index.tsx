import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from 'store/chatStore/chat.store'
import Loader from 'components/loader/loader'
import BoardTitleNew from 'components/board/board-title-new/index'
import ChatList from './components/chat-list'

const DailyMeasurements: React.FC = () => {
  const {
    dailyMeasurements,
    requestInitialState: { loading },
  } = chatStore

  useEffect(() => {
    const getDailyMeasurements = async () => {
      await chatStore.fetchDailyMeasurements()
    }
    getDailyMeasurements()
  }, [])

  if (loading) return <Loader />

  return (
    <>
      <BoardTitleNew title="Daily BP measurements" back />
      <ChatList list={dailyMeasurements} />
    </>
  )
}

export default observer(DailyMeasurements)
