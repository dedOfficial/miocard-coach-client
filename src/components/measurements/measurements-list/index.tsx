import React, { FC } from 'react'

import {
  MeasurementsChatsType,
  MeasurementsCoachesType,
} from '../../../store/measurementsStore/measurements.store.types'
import MeasurementsItem from './components/measurements-item'

interface MeasurementsListProps {
  allCoaches: MeasurementsCoachesType[] | MeasurementsChatsType[]
  routeUrl: string
}

const MeasurementsList: FC<MeasurementsListProps> = ({
  allCoaches,
  routeUrl,
}) => {
  return (
    <section>
      {allCoaches.map(
        ({ name, operatorId = '', shortKey = '', statistics }) => (
          <MeasurementsItem
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

export default MeasurementsList
