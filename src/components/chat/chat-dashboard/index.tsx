import React, { useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import chatStore from '../../../store/chatStore/chat.store'
import Header from './components/header'
import MainStats from './components/main-stats'
import AdditionalMetrics from './components/additional-metrics'
import Loader from '../../loader/loader'

import { btnStyle, dashboardStyle, wrapperStyle } from './styles'
import {
  EAllowedDashboardType,
  TChatCombineDashboard,
  TChatDashboard,
} from '../../../store/chatStore/chat.store.types'
import AdditionalMultipleMetrics from './components/additional-multiple-metrics'

const ChatDashboard: React.FC = () => {
  const [isDashboard, setIsDashboard] = useState(false)

  const chatName = chatStore.currentChat.dummyName
  const { dashboardStats } = chatStore.currentChat
  const { loading } = chatStore.requestInitialState
  const mainStats = dashboardStats?.filter(
    (item) => item.type === EAllowedDashboardType.LARGE
  ) as TChatDashboard[]
  const additionalMetrics = dashboardStats?.filter(
    (item) => item.type === EAllowedDashboardType.SMALL
  ) as TChatDashboard[]
  const additionalMultipleMetrics = dashboardStats?.filter(
    (item) => item.type === EAllowedDashboardType.SMALL_MULTIPLE
  ) as TChatCombineDashboard[]

  const toggleWindow = useCallback(
    (flag: boolean) => () => {
      setIsDashboard(flag)
    },
    []
  )

  useEffect(() => {
    const fetchDashboard = async () => {
      await chatStore.fetchDashboard()
    }
    fetchDashboard()
  }, [isDashboard])

  return (
    <>
      <button type="button" className={btnStyle} onClick={toggleWindow(true)}>
        Dashboard
      </button>

      {isDashboard && (
        <div className={wrapperStyle}>
          <div className={dashboardStyle}>
            <Header chatName={chatName} toggleWindow={toggleWindow} />

            {loading && <Loader />}

            {!loading && dashboardStats && dashboardStats?.length > 0 && (
              <>
                <MainStats mainStats={mainStats} />{' '}
                <AdditionalMultipleMetrics
                  additionalMultipleMetrics={additionalMultipleMetrics}
                />{' '}
                <AdditionalMetrics additionalMetrics={additionalMetrics} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default observer(ChatDashboard)
