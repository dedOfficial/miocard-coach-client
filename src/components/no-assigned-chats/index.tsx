import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

const NoAssignedChats: FC = () => {
  return (
    <>
      <div className="font-semibold text-xl mt-6">
        No chats are assigned to this operator
      </div>
      <div className="text-lg font-medium mt-4">
        Contact your coach manager, if necessary, to assign{'\n'}a chat to this
        operator
      </div>
    </>
  )
}

export default observer(NoAssignedChats)
