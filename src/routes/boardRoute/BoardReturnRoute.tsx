import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import NoTrackedParameter from '../../components/no-tracked-parameter'
import BoardFooter from '../../components/board/BoardFooter'
import BoardHeader from '../../components/board/BoardHeader'
import ReturnList from '../../components/patient-return/return-list'
import ReturnTitle from '../../components/patient-return/return-title'
import Loader from '../../components/loader/loader'
import accountStore from '../../store/accountStore/account.store'
import returnStore from '../../store/returnStore/return.store'

import { mainWrapperStyle } from './BoardRoute.styled'

const BoardReturnRoute: FC = () => {
  const {
    returnData: { coaches },
  } = returnStore

  const { loading } = returnStore.requestInitialState

  const isUser = !!accountStore.user.id.length

  const routeUrl = '/tracked-parameter/patient-return/'

  useEffect(() => {
    if (isUser) {
      returnStore.fetchReturnedCoaches()
    }
  }, [isUser])

  if (loading) return <Loader />

  return (
    <section className={mainWrapperStyle}>
      <BoardHeader />

      <ReturnTitle />

      {coaches.length > 0 ? (
        <ReturnList allCoaches={coaches} routeUrl={routeUrl} />
      ) : (
        <NoTrackedParameter />
      )}

      <BoardFooter />
    </section>
  )
}

export default observer(BoardReturnRoute)
