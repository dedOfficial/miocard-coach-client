import React, { FC } from 'react'

import {
  ReturnChatsType,
  ReturnCoachesType,
} from '../../../store/returnStore/return.store.types'
import ReturnItem from './components/return-item'

interface ReturnListProps {
  allCoaches: ReturnCoachesType[] | ReturnChatsType[]
  routeUrl: string
}

const ReturnList: FC<ReturnListProps> = ({ allCoaches, routeUrl }) => {
  return (
    <section>
      {allCoaches.map(
        ({ name, operatorId = '', shortKey = '', statistics }) => (
          <ReturnItem
            title={name}
            key={name}
            url={
              operatorId === '' ? routeUrl + shortKey : routeUrl + operatorId
            }
            statistics={statistics}
          />
        )
      )}
    </section>
  )
}

export default ReturnList
