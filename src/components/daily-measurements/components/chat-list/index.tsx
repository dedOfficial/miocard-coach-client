import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { DailyMeasurementType } from 'store/chatStore/chat.store.types'
import Checked from 'assets/checked.svg'
import {
  listTitleStyle,
  listHeaderStyle,
  listItemStyle,
  chatNameStyle,
  checkedStyle,
} from './styles'

interface ChatListProps {
  list: Array<DailyMeasurementType>
}

const ChatList: React.FC<ChatListProps> = ({ list }) => {
  return (
    <>
      <div className={listTitleStyle}>Results by chats</div>

      <div className={listHeaderStyle}>
        <div>Chat</div>
        <div>Made measurements today</div>
      </div>

      {list.map(({ shortKey, dummyName, measurement }) => (
        <div key={dummyName} className={listItemStyle}>
          <div className={chatNameStyle}>
            <Link to={`/operator/chat/${shortKey}`}>{dummyName}</Link>
          </div>
          {measurement && (
            <img src={Checked} alt="Checked" className={checkedStyle} />
          )}
        </div>
      ))}
    </>
  )
}

export default observer(ChatList)
