import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import StatsFields from '../../components/stats/StatsFields'
import StatsHeader from '../../components/stats/statsHeader/StatsHeader'
import StatsAddModal from '../../components/stats/StatsAddModal/StatsAddModal'
import StatsEditModal from '../../components/stats/StatsEditModal/StatsEditModal'
import Loader from '../../components/loader/loader'
import StatData from '../../components/stats/stats-data'
import statsStore from '../../store/statsStore/stats.store'
import chatStore from '../../store/chatStore/chat.store'
import useSocketEffects from '../operatorChatRoute/hooks/useSocketEffect'
import {
  initialSelectedHabit,
  initialSelectedMedication,
  initialSelectedRecommendation,
  SelectedHabitType,
  SelectedMedicationType,
  SelectedRecommendationType,
} from './constants'

import {
  headerWrapperStyle,
  statTitleStyle,
  statWrapperStyle,
  kitNameStyle,
} from './styles'

const StatsRoute: React.FC = () => {
  const [isShowAddModal, setIsShowAddModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [error, setError] = useState('')
  const [isError, isSetError] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')
  const [selectedCheckin, setSelectedCheckin] = useState('')
  const [editValue, setEditValue] = useState<any>(undefined)
  const [currentDate, setCurrentDate] = useState<string>(
    moment().format('DD-MM-YYYY')
  )
  const [selectedHabit, setSelectedHabit] =
    useState<SelectedHabitType>(initialSelectedHabit)
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<SelectedRecommendationType>(initialSelectedRecommendation)
  const [selectedMedication, setSelectedMedication] =
    useState<SelectedMedicationType>(initialSelectedMedication)

  const setCurrentDay = useCallback((date: Date) => {
    setCurrentDate(moment(date).format('DD-MM-YYYY'))
  }, [])

  const { clientNumber, shortKey } = chatStore.currentChat

  useSocketEffects(shortKey)

  const addStatsModalRef = useRef<HTMLDivElement>(null)
  const editStatsModalRef = useRef<HTMLDivElement>(null)

  const { fillingSuccess } = chatStore.currentChat.kit
  const currentFillingSuccessValue = useMemo(
    () => fillingSuccess.find((item) => item.date === currentDate)?.value,
    [currentDate, fillingSuccess]
  )
  const currentFillingSuccessTotal = useMemo(
    () => fillingSuccess.find((item) => item.date === currentDate)?.total,
    [currentDate, fillingSuccess]
  )
  const getOverlimit = () => {
    if (
      typeof currentFillingSuccessValue === 'number' &&
      typeof currentFillingSuccessTotal === 'number'
    ) {
      return currentFillingSuccessValue > currentFillingSuccessTotal
    }
    return undefined
  }
  const isOverLimit = getOverlimit()

  const [chartValue, setChartValue] = useState<{
    filledValue: number
    totalValue: number
  }>({
    filledValue: 0,
    totalValue: 0,
  })

  const handleAddModalTrue = (
    value?,
    checkin?,
    habitName?,
    habitId?,
    recommendationName?,
    recommendationId?,
    medicationName?,
    medicationId?
  ) => {
    isSetError(false)
    setIsShowAddModal(true)
    setSelectedValue(value)
    setSelectedCheckin(checkin)
    setSelectedHabit({ name: habitName, id: habitId })
    setSelectedRecommendation({
      name: recommendationName,
      id: recommendationId,
    })
    setSelectedMedication({
      name: medicationName,
      id: medicationId,
    })
  }

  const handleAddModalFalse = (
    value?,
    checkin?,
    habitName?,
    habitId?,
    recommendationName?,
    recommendationId?,
    medicationName?,
    medicationId?
  ) => {
    setIsShowAddModal(false)
    setSelectedValue(value)
    setSelectedCheckin(checkin)
    setSelectedHabit({ name: habitName, id: habitId })
    setSelectedRecommendation({
      name: recommendationName,
      id: recommendationId,
    })
    setSelectedMedication({
      name: medicationName,
      id: medicationId,
    })
  }

  const handleAddModal = useCallback(
    (
      isShow: boolean,
      value?: string,
      checkin?: string,
      habitName?: string,
      habitId?: string,
      recommendationName?: string,
      recommendationId?: string,
      medicationName?: string,
      medicationId?: string
    ) =>
      isShow
        ? handleAddModalTrue(
            value,
            checkin,
            habitName,
            habitId,
            recommendationName,
            recommendationId,
            medicationName,
            medicationId
          )
        : handleAddModalFalse(
            value,
            checkin,
            habitName,
            habitId,
            recommendationName,
            recommendationId,
            medicationName,
            medicationId
          ),
    []
  )

  const handleEditModalTrue = (value) => {
    setIsShowEditModal(true)
    setEditValue(value)
  }

  const handleEditModalFalse = (value) => {
    setIsShowEditModal(false)
    setEditValue(value)
  }

  const handleEditModal = useCallback(
    (isShow: boolean, value: any) =>
      isShow ? handleEditModalTrue(value) : handleEditModalFalse(value),
    []
  )

  useEffect(() => {
    setChartValue({
      filledValue:
        (isOverLimit === true
          ? currentFillingSuccessTotal
          : currentFillingSuccessValue) || 0,
      totalValue:
        currentFillingSuccessTotal ||
        fillingSuccess[fillingSuccess.length - 1]?.total ||
        0,
    })
  }, [
    currentDate,
    currentFillingSuccessTotal,
    currentFillingSuccessValue,
    fillingSuccess,
    isOverLimit,
  ])

  useEffect(() => {
    const handlerClickOutside = (event: any) => {
      if (
        addStatsModalRef.current &&
        !addStatsModalRef.current.contains(event.target)
      ) {
        setIsShowAddModal(false)
      }
      if (
        editStatsModalRef.current &&
        !editStatsModalRef.current.contains(event.target)
      ) {
        setIsShowEditModal(false)
      }
    }
    document.addEventListener('mousedown', handlerClickOutside)
    return () => {
      document.removeEventListener('mousedown', handlerClickOutside)
    }
  }, [])

  useEffect(() => {
    if (chatStore.currentChat.kit?.id) {
      chatStore.fetchKitOptions()
      statsStore.fetchCurrentStats(clientNumber, currentDate)
    }
  }, [clientNumber, currentDate])

  const kitName = chatStore.currentChat.kitCheckins?.name
  const firstCheckin = chatStore.currentChat.kitCheckins?.checkins.find(
    (checkin) => checkin.position === 1
  )?.options
  const secondCheckin = chatStore.currentChat.kitCheckins?.checkins.find(
    (checkin) => checkin.position === 2
  )?.options
  const statsTitles: string[] = Array.from(
    new Set(
      chatStore.currentChat.kitCheckins?.checkins.flatMap(({ options }) =>
        options.flatMap(({ title }) => title)
      )
    )
  )

  return (
    <div className="pb-10">
      {isShowAddModal && (
        <StatsAddModal
          error={error}
          setError={setError}
          isError={isError}
          isSetError={isSetError}
          addStatsModalRef={addStatsModalRef}
          handleAddModal={handleAddModal}
          selectedValue={selectedValue}
          selectedCheckin={selectedCheckin}
          selectedHabit={selectedHabit}
          selectedRecommendation={selectedRecommendation}
          selectedMedication={selectedMedication}
          currentDate={currentDate}
        />
      )}

      {isShowEditModal && (
        <StatsEditModal
          editStatsModalRef={editStatsModalRef}
          handleEditModal={handleEditModal}
          editValue={editValue}
          setEditValue={setEditValue}
        />
      )}

      <div className={headerWrapperStyle}>
        <StatsHeader
          chartValue={chartValue}
          currentDate={moment(currentDate, 'DD-MM-YYYY').toDate()}
          setCurrentDay={setCurrentDay}
        />

        <div className="pt-5">
          {statsStore.requestInitialState.loading && <Loader />}
        </div>

        {!chatStore.currentChat.kit?.id ? (
          <>
            <div className={kitNameStyle}>
              No data collection kit assigned to this chat
            </div>
            <div className="text-lg font-medium mt-4">
              Contact your coach manager, if necessary, to assign{'\n'}a data
              collection kit to this chat
            </div>
          </>
        ) : (
          <>
            <StatsFields />
            <>
              <div className={kitNameStyle}>{kitName}</div>
              {statsTitles.map((stat) => (
                <div key={stat}>
                  <div className={statTitleStyle}>{stat}</div>
                  {firstCheckin &&
                    firstCheckin
                      .filter((option) => option.title === stat)
                      .map((checkin) => (
                        <div className={statWrapperStyle} key={checkin.type}>
                          <StatData
                            clientNumber={clientNumber}
                            handleAddModal={handleAddModal}
                            handleEditModal={handleEditModal}
                            checkin="first"
                            storeStatsType={checkin.storeStatsType}
                            type={checkin.type}
                            text={checkin?.text}
                            title={checkin.title}
                            currentDate={currentDate}
                            selectedValue={stat}
                          />
                        </div>
                      ))}

                  {secondCheckin &&
                    secondCheckin
                      .filter((option) => option.title === stat)
                      .map((checkin) => (
                        <div className={statWrapperStyle} key={checkin.type}>
                          <StatData
                            clientNumber={clientNumber}
                            handleAddModal={handleAddModal}
                            handleEditModal={handleEditModal}
                            checkin="second"
                            storeStatsType={checkin.storeStatsType}
                            type={checkin.type}
                            text={checkin?.text}
                            title={checkin.title}
                            currentDate={currentDate}
                            selectedValue={stat}
                          />
                        </div>
                      ))}
                </div>
              ))}
            </>
          </>
        )}
      </div>
    </div>
  )
}

export default observer(StatsRoute)
