import React from 'react'

import CollectionItem from './components/collection-item'
import {
  CoachType,
  ChatType,
} from '../../../../store/data-collection-store/dataCollection.store.types'

interface CollectionListProps {
  coaches: CoachType[] | ChatType[]
  routeUrl?: string
}

const CollectionList: React.FC<CollectionListProps> = ({
  coaches,
  routeUrl,
}) => {
  return (
    <section>
      {coaches.map(({ name, operatorId = '', shortKey = '', statistics }) => (
        <CollectionItem
          title={name}
          key={name}
          url={operatorId === '' ? routeUrl + shortKey : routeUrl + operatorId}
          statistics={statistics}
        />
      ))}
    </section>
  )
}

export default CollectionList
