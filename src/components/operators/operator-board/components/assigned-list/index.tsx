/* eslint-disable no-underscore-dangle */
import { observer } from 'mobx-react-lite'
import React from 'react'

import { OperatorChatLinkType } from 'store/operatorStore/operator.store.types'
import AssignedItem from './components/assigned-item'

interface AssignedListProps {
  list: Array<OperatorChatLinkType>
}

const AssignedList: React.FC<AssignedListProps> = ({ list }) => {
  return (
    <ul>
      {list.map(({ _id, shortKey, dummyName }) => (
        <AssignedItem
          key={_id}
          href={`/operator/chat/${shortKey}`}
          chatName={dummyName}
        />
      ))}
    </ul>
  )
}

export default observer(AssignedList)
