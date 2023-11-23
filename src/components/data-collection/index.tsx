import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Loader from '../loader/loader'
import BoardTitleNew from '../board/board-title-new'
import ActionButton from '../controls/action-btn'
import CollectionList from './components/collection-list'
import CollectionItem from './components/collection-list/components/collection-item'
import accountStore from '../../store/accountStore/account.store'
import dataCollectionStore from '../../store/data-collection-store/dataCollection.store'
import NoTrackedParameter from '../no-tracked-parameter'

const DataCollection: React.FC = () => {
  const { coaches, wholeProject } = dataCollectionStore.collectionData
  const { loading } = dataCollectionStore.requestInitialState
  const isUser = !!accountStore.user.id.length

  const routeUrl = '/tracked-parameter/data-collection/'

  useEffect(() => {
    if (isUser) {
      dataCollectionStore.fetchDataCollection()
    }
  }, [isUser])

  if (loading) return <Loader />

  return (
    <>
      <BoardTitleNew title="Data collection" back />
      <Link to="/tracked-parameter/edit/data-collection">
        <ActionButton label="Edit tracked parameters" />
      </Link>

      {coaches.length > 0 ? (
        <>
          {wholeProject.statistics.length > 0 && (
            <CollectionItem
              title="Average on the whole project"
              statistics={wholeProject.statistics}
            />
          )}
          <CollectionList coaches={coaches} routeUrl={routeUrl} />
        </>
      ) : (
        <NoTrackedParameter />
      )}
    </>
  )
}

export default observer(DataCollection)
