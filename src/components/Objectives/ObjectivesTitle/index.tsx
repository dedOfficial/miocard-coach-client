import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import BoardTitleNew from '../../board/board-title-new'
import ActionButton from '../../controls/action-btn'

const ObjectivesTitle: FC = () => {
  return (
    <>
      <BoardTitleNew title="Objectives" back />
      <Link to="/tracked-parameter/objectives/add">
        <ActionButton label="Add objective" />
      </Link>
    </>
  )
}

export default ObjectivesTitle
