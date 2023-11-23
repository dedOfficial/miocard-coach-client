/* eslint-disable no-underscore-dangle */
import React, { FC, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import ListItem from '../../ListItem'
import CallCustomSelectBtn from '../../customSelect/CallCustomSelectBtn'
import CustomSelect from '../../customSelect/CustomSelect'
import useCloseByClickOutside from '../../../hooks/useCloseByClickOutside'
import { ObjectivesListType } from '../../../store/objectiveStore/objectives.store.types'
import objectivesStore from '../../../store/objectiveStore/objectives.store'
import DeleteModal from '../../modals/delete-modal'

import * as S from './styles'

type ObjectivesItemType = {
  objective: ObjectivesListType
}

const ObjectivesItem: FC<ObjectivesItemType> = ({ objective }) => {
  const [isSelectActive, setIsSelectActive] = useState(false)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const navigate = useHistory()

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
    toggleSelect()
    navigate.push(`/tracked-parameter/objectives/${objective._id}/edit`)
  }

  const toggleDelete = () => {
    setIsDeleteModal((prev) => !prev)
    toggleSelect()
  }

  const handleDeleteObjective = () => {
    objectivesStore.removeObjective(objective._id)
    toggleDelete()
  }

  return (
    <>
      {isDeleteModal && (
        <>
          <DeleteModal
            name={objective.name}
            onClose={toggleDelete}
            onDelete={handleDeleteObjective}
          />
        </>
      )}
      <ListItem>
        <div className={S.objectiveItemWrapper}>
          <div className={S.objectiveItemBox}>
            <h5 className={S.objectiveItemTitle}>
              <Link to={`/tracked-parameter/objectives/${objective._id}`}>
                {objective.name}
              </Link>
            </h5>
            <div>
              <span className={S.objectiveItemAchievement}>
                Achievement (%):
              </span>{' '}
              <mark className={S.objectiveItemAchievementValue}>
                {objective.achievement}
              </mark>
            </div>
          </div>
          <CallCustomSelectBtn
            onClick={toggleSelect}
            ref={callCustomSelectActionRef}
          />
          <CustomSelect
            ref={customSelectActionRef}
            isActiveState={isSelectActive}
            onEdit={handleEdit}
            onDelete={toggleDelete}
          />
        </div>
      </ListItem>
    </>
  )
}

export default ObjectivesItem
