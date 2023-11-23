import React from 'react'
import { btnStyle, textStyle, timeStyle, wrapperStyle } from './styles'
import Pen from '../../../../../../assets/pencil.svg'
import Basket from '../../../../../../assets/trash.svg'

interface ElementBoxProps {
  time: string
  value?: string
  onClickEdit: () => void
  onClickDelete: () => void
}

const ElementBox: React.FC<ElementBoxProps> = ({
  time,
  value,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div className="flex flex-row items-center">
      <div className={wrapperStyle}>
        <div className={textStyle}>{value}</div>
        <button className={btnStyle} type="button" onClick={onClickEdit}>
          <img src={Pen} alt="Pen" />
        </button>
        <button className={btnStyle} type="button" onClick={onClickDelete}>
          <img src={Basket} alt="Basket" />
        </button>
      </div>
      <div className={timeStyle}>{time.toUpperCase()}</div>
    </div>
  )
}

export default ElementBox
