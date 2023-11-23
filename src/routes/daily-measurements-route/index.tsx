import React from 'react'
import { observer } from 'mobx-react-lite'

import BoardHeader from '../../components/board/BoardHeader'
import BoardFooter from '../../components/board/BoardFooter'
import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import DailyMeasurements from '../../components/daily-measurements'

const DailyMeasurementsRoute: React.FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <BoardHeader />
      <DailyMeasurements />
      <BoardFooter />
    </div>
  )
}

export default observer(DailyMeasurementsRoute)
