import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import MeasurementsList from '../../components/measurements/measurements-list'
import NoTrackedParameter from '../../components/no-tracked-parameter'
import MeasurementsTitle from '../../components/measurements/measurements-title'
import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import Loader from '../../components/loader/loader'
import accountStore from '../../store/accountStore/account.store'
import measurementsStore from '../../store/measurementsStore/measurements.store'

import { mainWrapperStyle } from './BoardRoute.styled'

const BoardReturnRoute: FC = () => {
  const {
    measurementsData: { coaches },
  } = measurementsStore

  const { loading } = measurementsStore.requestInitialState

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/tracked-parameter/measurements/'

  useEffect(() => {
    if (isUser) {
      measurementsStore.fetchMeasurementsCoaches()
    }
  }, [isUser])

  if (loading) return <Loader />

  return (
    <section className={mainWrapperStyle}>
      <BoardHeader />

      <MeasurementsTitle />

      {coaches.length > 0 ? (
        <MeasurementsList allCoaches={coaches} routeUrl={routeUrl} />
      ) : (
        <NoTrackedParameter />
      )}

      <BoardFooter />
    </section>
  )
}

export default observer(BoardReturnRoute)
