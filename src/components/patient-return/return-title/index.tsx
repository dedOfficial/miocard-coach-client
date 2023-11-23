import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import BoardTitleNew from '../../board/board-title-new'
import ActionButton from '../../controls/action-btn'

const ReturnTitle: FC = () => {
  return (
    <>
      <BoardTitleNew title="Patient return" back />
      <Link to="/tracked-parameter/edit/patient-return">
        <ActionButton label="Edit tracked parameters" />
      </Link>
    </>
  )
}

export default ReturnTitle
