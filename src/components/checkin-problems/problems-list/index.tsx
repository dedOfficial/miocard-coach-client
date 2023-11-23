import React from 'react'

import { ProblemsType } from '../../../store/checkinProblemsStore/checkinProblems.store.types'
import ProblemsItem from './components/problems-item'

interface ProblemsListProps {
  allCoaches: ProblemsType[]
  routeUrl: string
}

const ProblemsList: React.FC<ProblemsListProps> = ({
  allCoaches,
  routeUrl,
}) => {
  return (
    <section>
      {allCoaches.map(({ dummyName, _id = '', week, month }) => (
        <ProblemsItem
          title={dummyName}
          key={_id}
          url={routeUrl + _id}
          week={week}
          month={month}
        />
      ))}
    </section>
  )
}

export default ProblemsList
