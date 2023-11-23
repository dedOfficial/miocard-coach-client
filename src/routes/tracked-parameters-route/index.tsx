import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import BoardHeader from '../../components/board/BoardHeader'
import BoardTitle from '../../components/board/BoardTitle'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import BoardFooter from '../../components/board/BoardFooter'
import ListItem from '../../components/ListItem'

type List = {
  path: string
  linkName: string
}

const TrackedParametersRoute: FC = () => {
  const list: List[] = [
    {
      path: '/tracked-parameter/objectives',
      linkName: 'Objectives',
    },
    {
      path: '/tracked-parameter/data-collection',
      linkName: 'Data collection',
    },
    {
      path: '/tracked-parameter/patient-return',
      linkName: 'Patient return',
    },
    {
      path: '/tracked-parameter/measurements',
      linkName: 'BP measurement frequency',
    },
    {
      path: '/tracked-parameter/daily-measurements',
      linkName: 'Daily BP measurements',
    },
    {
      path: '/data-kits',
      linkName: 'Data collection Kits',
    },
    {
      path: '/tracked-parameter/checkin-problems',
      linkName: 'Check-in problems',
    },
  ]

  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <BoardTitle title="Tracked parameters" />
      <ul className="ddd">
        {list.map((el) => {
          return (
            <ListItem key={el.linkName}>
              <Link to={el.path}>{el.linkName}</Link>
            </ListItem>
          )
        })}
      </ul>
      <BoardFooter />
    </div>
  )
}

export default TrackedParametersRoute
