/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import BoardHeader from '../../../components/board/BoardHeader'
import BoardTitleNew from '../../../components/board/board-title-new'
import BoardFooter from '../../../components/board/BoardFooter'
import Loader from '../../../components/loader/loader'
import ResultsByOperators from '../../../components/Objectives/open/components/results-by-operators-list'
import objectivesStore from '../../../store/objectiveStore/objectives.store'

import { mainWrapperStyle } from '../../boardRoute/BoardRoute.styled'

const KeyResultRoute: React.FC = () => {
  const { id, keyResultName } =
    useParams<{ id: string; keyResultName: string }>()

  const { resultsByOperators } = objectivesStore
  const { loading } = objectivesStore.requestInitialState

  useEffect(() => {
    objectivesStore.fetchKeyResult(id, keyResultName)
  }, [id, keyResultName])

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitleNew title="Key result:" subtitle={`${keyResultName}`} back />
      {loading ? (
        <Loader />
      ) : (
        <ResultsByOperators results={resultsByOperators} />
      )}
      <BoardFooter />
    </div>
  )
}

export default observer(KeyResultRoute)
