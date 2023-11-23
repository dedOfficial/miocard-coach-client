import React, { useCallback, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import accountStore from 'store/accountStore/account.store'
import OperatorInfo from './components/operator-info'

import { operatorWrapperStyle } from './styles'
import ListItem from '../../../../ListItem'
import CallCustomSelectBtn from '../../../../customSelect/CallCustomSelectBtn'
import CustomSelect from '../../../../customSelect/CustomSelect'
import useCloseByClickOutside from '../../../../../hooks/useCloseByClickOutside'

interface BoardOperatorsProps {
  name: string
  email: string
  id: string
  type: string
  avatar?: string
  href: string
  onDelete: (e?: any) => void
}

const OperatorItem: React.FC<BoardOperatorsProps> = ({
  name,
  email,
  id,
  type,
  avatar,
  href,
  onDelete,
}) => {
  const navigate = useHistory()

  const handleEditOperator = useCallback(() => {
    navigate.push(`operator/${id}/edit`)
  }, [id, navigate])

  const [isSelectActive, setIsSelectActive] = useState(false)

  const toggleSelect = () => {
    setIsSelectActive((prev) => !prev)
  }

  const customSelectActionRef = useRef<HTMLUListElement>(null)
  const callCustomSelectActionRef = useRef<HTMLButtonElement>(null)

  useCloseByClickOutside({
    mainRef: customSelectActionRef,
    handler: () => setIsSelectActive(false),
    dependentRefs: [callCustomSelectActionRef],
  })

  const handleEdit = () => {
    handleEditOperator()
    toggleSelect()
  }

  const handleDelete = () => {
    onDelete()
    toggleSelect()
  }

  return (
    <ListItem>
      <div className={operatorWrapperStyle} key={email}>
        <Link to={href}>
          <OperatorInfo
            id={id}
            type={type}
            name={name}
            email={email}
            avatar={avatar}
          />
        </Link>
        {accountStore.user.isSuperadmin && (
          <>
            <CallCustomSelectBtn
              onClick={toggleSelect}
              ref={callCustomSelectActionRef}
            />
            <CustomSelect
              ref={customSelectActionRef}
              isActiveState={isSelectActive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </ListItem>
  )
}

export default observer(OperatorItem)
