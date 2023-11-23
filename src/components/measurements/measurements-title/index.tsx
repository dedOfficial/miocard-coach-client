import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import BoardTitleNew from '../../board/board-title-new'
import ActionButton from '../../controls/action-btn'

const MeasurementsTitle: FC = () => {
  return (
    <>
      <BoardTitleNew title="BP measurements control frequency" back />

      <Link to="/tracked-parameter/edit/measurements">
        <ActionButton label="Edit tracked parameters" />
      </Link>
    </>
  )
}

export default MeasurementsTitle
