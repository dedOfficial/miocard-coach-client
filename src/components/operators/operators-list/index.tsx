import React, { FC } from 'react'

import {
  DeleteOperatorType,
  OperatorType,
} from '../../../store/operatorStore/operator.store.types'
import OperatorItem from './components/operator-item'

import { operatorsListWrapperStyles } from './styles'

interface OperatorsListProps {
  operators: Array<OperatorType>
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteData: React.Dispatch<React.SetStateAction<DeleteOperatorType>>
}

const OperatorsList: FC<OperatorsListProps> = ({
  operators,
  setDeleteModal,
  setDeleteData,
}) => {
  const handleDeleteOperator = (name, email, _id, type) => {
    setDeleteModal((state) => !state)
    setDeleteData({
      name,
      email,
      _id,
      type,
    })
  }

  return (
    <div className={operatorsListWrapperStyles}>
      {operators.map(({ email, name, _id, avatar, type }) => (
        <OperatorItem
          email={email}
          name={name}
          id={_id}
          type={type}
          key={_id}
          href={`operator/${_id}`}
          avatar={avatar}
          onDelete={() => handleDeleteOperator(name, email, _id, type)}
        />
      ))}
    </div>
  )
}

export default OperatorsList
