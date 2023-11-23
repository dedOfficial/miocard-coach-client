import React from 'react'
import { useHistory } from 'react-router-dom'

import {
  backBtnStyle,
  titleWrapperStyle,
  titleStyle,
  subtitleStyle,
} from './styles'

interface BoardTitleNewProps {
  title: string
  subtitle?: string
  addControl?: JSX.Element | React.Component
  back?: boolean
}

const BoardTitleNew: React.FC<BoardTitleNewProps> = ({
  title,
  subtitle,
  addControl,
  back,
}) => {
  const navigate = useHistory()

  const renderBack = () => (
    <button
      type="button"
      className={backBtnStyle}
      onClick={() => navigate.goBack()}>
      Back
    </button>
  )

  return (
    <div className={titleWrapperStyle}>
      <h1 className={titleStyle}>
        {title} <span className={subtitleStyle}>{subtitle}</span>
      </h1>
      {back && renderBack()}
      {addControl}
    </div>
  )
}

export default BoardTitleNew
