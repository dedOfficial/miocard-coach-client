/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import Loader from 'components/loader/loader'
import objectivesStore from '../../store/objectiveStore/objectives.store'
import ObjectivesItem from './ObjectivesItem'

const Objectives: React.FC = () => {
  const {
    objectives,
    requestInitialState: { loading },
  } = objectivesStore

  useEffect(() => {
    const getObjectives = async () => {
      await objectivesStore.fetchAllObjectives()
    }
    getObjectives()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="mt-12">
      {objectives.map((objective) => (
        <ObjectivesItem objective={objective} key={objective._id} />
      ))}
    </div>
  )
}

export default observer(Objectives)
