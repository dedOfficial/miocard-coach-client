/* eslint-disable no-underscore-dangle */
import React from 'react'
import { observer } from 'mobx-react-lite'

import CheckinProblems from '../checkin-problems'
import statsStore from '../../../store/statsStore/stats.store'
import chatStore from '../../../store/chatStore/chat.store'
import StatElement from './components/stat-element'
import StatNoData from './components/stat-no-data'
import EditStatNoData from './components/edit-stat-no-data'
import { StatDataProps } from './constants'

import { greenStyle, redStyle } from './styles'

const StatData: React.FC<StatDataProps> = ({
  clientNumber,
  currentDate,
  selectedValue,
  checkin,
  title,
  storeStatsType,
  type,
  text,
  handleAddModal,
  handleEditModal,
}) => {
  const firstNoData =
    statsStore[storeStatsType].filter(
      (el) =>
        el?.clientNumber === clientNumber &&
        el.day === currentDate &&
        el.checkin === 'first'
    ).length < 1 &&
    type !== 'habit' &&
    type !== 'checkin' &&
    type !== 'recommendation' &&
    type !== 'drug'

  const secondNoData =
    statsStore[storeStatsType].filter(
      (el) =>
        el.clientNumber === clientNumber &&
        el.day === currentDate &&
        el.checkin === 'second'
    ).length < 1 &&
    type !== 'habit' &&
    type !== 'checkin' &&
    type !== 'recommendation' &&
    type !== 'drug'

  const markNotReceivedFirst = statsStore[storeStatsType].filter(
    (el) =>
      el.notReceivedReason &&
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'first'
  )

  const markNotReceivedSecond = statsStore[storeStatsType].filter(
    (el) =>
      el.notReceivedReason &&
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'second'
  )

  const habitsLength = chatStore.currentChat?.habits?.length

  const habitsStoreLengthFirst = statsStore.habits.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'first'
  ).length

  const habitsStoreLengthSecond = statsStore.habits.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'second'
  ).length

  const recommedationsLength = chatStore.currentChat?.recommendations?.length

  const recommendationsStoreLengthFirst = statsStore.recommendations.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'first'
  ).length

  const recommendationsStoreLengthSecond = statsStore.recommendations.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'second'
  ).length

  const medicationsLength = chatStore.currentChat?.drugs?.length

  const medicationsStoreLengthFirst = statsStore.drugs.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'first'
  ).length

  const medicationsStoreLengthSecond = statsStore.drugs.filter(
    (el) =>
      el.clientNumber === clientNumber &&
      el.day === currentDate &&
      el.checkin === 'second'
  ).length

  if (checkin === 'first') {
    if (firstNoData) {
      return (
        <>
          <div className={redStyle}>First check-in</div>
          <StatNoData
            handleAddModal={handleAddModal}
            selectedValue={selectedValue}
            currentDate={currentDate}
            checkin="first"
          />
        </>
      )
    }

    if (type === 'habit') {
      if (habitsLength === 0)
        return <div>No habits were added to client info</div>

      return (
        <>
          <div
            className={
              habitsStoreLengthFirst === habitsLength ? greenStyle : redStyle
            }>
            First check-in
          </div>

          {chatStore.currentChat?.habits?.map((habit) => (
            <div key={habit.id} className="mb-3">
              <div className="font-semibold text-lg">
                {habit.name} (Times today)
              </div>
              {statsStore.habits
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'first' &&
                    el.habitId === habit.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="habit"
                        storeStatsType="habits"
                        repeatability={el.repeatability}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: habit.name,
                            type: 'habit',
                            storeStatsType: 'habits',
                          })
                        }
                      />
                    )
                )}

              {statsStore.habits.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'first' &&
                  el.habitId === habit.id
              ).length < 1 &&
              markNotReceivedFirst.filter((el) => el.habitId === habit.id)
                .length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="first"
                  habitName={habit.name}
                  habitId={habit.id}
                />
              ) : (
                markNotReceivedFirst
                  .filter((el) => el.habitId === habit.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      habitId={habit.id}
                      habitName={habit.name}
                      type="habit"
                      storeStatsType="habits"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="first"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'recommendation') {
      if (recommedationsLength === 0)
        return <div>No recommendations added to client info</div>

      return (
        <>
          <div
            className={
              recommendationsStoreLengthFirst === recommedationsLength
                ? greenStyle
                : redStyle
            }>
            First check-in
          </div>
          {chatStore.currentChat?.recommendations?.map((recommendation) => (
            <div key={recommendation.id} className="mb-3">
              <div className="font-semibold text-lg">
                {recommendation.name} (Times today)
              </div>
              {statsStore.recommendations
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'first' &&
                    el.recommendationId === recommendation.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="recommendation"
                        storeStatsType="recommendations"
                        repeatability={el.repeatability}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: recommendation.name,
                            type: 'recommendation',
                            storeStatsType: 'recommendations',
                          })
                        }
                      />
                    )
                )}
              {statsStore.recommendations.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'first' &&
                  el.recommendationId === recommendation.id
              ).length < 1 &&
              markNotReceivedFirst.filter(
                (el) => el.recommendationId === recommendation.id
              ).length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="first"
                  recommendationName={recommendation.name}
                  recommendationId={recommendation.id}
                />
              ) : (
                markNotReceivedFirst
                  .filter((el) => el.recommendationId === recommendation.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      recommendationId={recommendation.id}
                      recommendationName={recommendation.name}
                      type="recommendation"
                      storeStatsType="recommendations"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="first"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'drug') {
      if (medicationsLength === 0)
        return <div>No medications were added to client info</div>

      return (
        <>
          <div
            className={
              medicationsStoreLengthFirst === medicationsLength
                ? greenStyle
                : redStyle
            }>
            First check-in
          </div>

          {chatStore.currentChat?.drugs?.map((drug) => (
            <div key={drug.id} className="mb-3">
              <div className="font-semibold text-lg">{drug.name}</div>
              {statsStore.drugs
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'first' &&
                    el.drugId === drug.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="drug"
                        storeStatsType="drugs"
                        drug={el.drug}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: drug.name,
                            type: 'drug',
                            storeStatsType: 'drugs',
                          })
                        }
                      />
                    )
                )}

              {statsStore.drugs.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'first' &&
                  el.drugId === drug.id
              ).length < 1 &&
              markNotReceivedFirst.filter((el) => el.drugId === drug.id)
                .length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="first"
                  medicationName={drug.name}
                  medicationId={drug.id}
                />
              ) : (
                markNotReceivedFirst
                  .filter((el) => el.drugId === drug.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      medicationId={drug.id}
                      medicationName={drug.name}
                      type="drug"
                      storeStatsType="drugs"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="first"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'cardio') {
      return (
        <>
          <div className={greenStyle}>First check-in</div>

          {statsStore.cardio
            .filter((el) => el.isReceived)
            .map(
              (el) =>
                el.clientNumber === clientNumber &&
                el.day === currentDate &&
                el.checkin === 'first' && (
                  <StatElement
                    key={el._id}
                    element={el}
                    type="cardio"
                    storeStatsType="cardio"
                    pressure={el.pressure}
                    pulse={el.pulse}
                    timeOfDay={el.timeOfDay}
                    handleEditModal={() =>
                      handleEditModal(true, {
                        ...el,
                        title,
                        type,
                        storeStatsType,
                      })
                    }
                  />
                )
            )}
          {markNotReceivedFirst?.length ? (
            markNotReceivedFirst.map((el) => (
              <EditStatNoData
                key={el._id}
                element={el}
                id={el._id}
                type="cardio"
                storeStatsType="cardio"
                handleAddModal={handleAddModal}
                selectedValue={selectedValue}
                checkin="first"
              />
            ))
          ) : (
            <StatNoData
              handleAddModal={handleAddModal}
              selectedValue={selectedValue}
              currentDate={currentDate}
              checkin="first"
            />
          )}
        </>
      )
    }

    if (type === 'checkin') {
      return (
        <>
          <CheckinProblems
            currentCheckin="first"
            clientNumber={clientNumber}
            currentDate={currentDate}
          />
        </>
      )
    }

    return (
      <>
        <div className={greenStyle}>First check-in</div>

        {statsStore[storeStatsType]
          .filter((el) => el.isReceived)
          .map(
            (el) =>
              el.clientNumber === clientNumber &&
              el.day === currentDate &&
              el.checkin === 'first' && (
                <StatElement
                  key={el._id}
                  element={el}
                  type={type}
                  text={text}
                  storeStatsType={storeStatsType}
                  handleEditModal={() =>
                    handleEditModal(true, {
                      ...el,
                      title,
                      type,
                      storeStatsType,
                    })
                  }
                />
              )
          )}
        {markNotReceivedFirst?.length ? (
          markNotReceivedFirst.map((el) => (
            <EditStatNoData
              key={el._id}
              element={el}
              id={el._id}
              type={type}
              storeStatsType={storeStatsType}
              handleAddModal={handleAddModal}
              selectedValue={selectedValue}
              checkin="first"
            />
          ))
        ) : (
          <StatNoData
            handleAddModal={handleAddModal}
            selectedValue={selectedValue}
            currentDate={currentDate}
            checkin="first"
          />
        )}
      </>
    )
  }

  if (checkin === 'second') {
    if (secondNoData) {
      return (
        <>
          <div className={redStyle}>Second check-in</div>
          <StatNoData
            handleAddModal={handleAddModal}
            selectedValue={selectedValue}
            currentDate={currentDate}
            checkin="second"
          />
        </>
      )
    }

    if (type === 'habit') {
      if (habitsLength === 0)
        return <div>No habits were added to client info</div>
      return (
        <>
          <div
            className={
              habitsStoreLengthSecond === habitsLength ? greenStyle : redStyle
            }>
            Second check-in
          </div>

          {chatStore.currentChat?.habits?.map((habit) => (
            <div key={habit.id} className="mb-3">
              <div className="font-semibold text-lg">
                {habit.name} (Times today)
              </div>
              {statsStore.habits
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'second' &&
                    el.habitId === habit.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="habit"
                        storeStatsType="habits"
                        repeatability={el.repeatability}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: habit.name,
                            type: 'habit',
                            storeStatsType: 'habits',
                          })
                        }
                      />
                    )
                )}
              {statsStore.habits.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'second' &&
                  el.habitId === habit.id
              ).length < 1 &&
              markNotReceivedSecond.filter((el) => el.habitId === habit.id)
                ?.length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="second"
                  habitName={habit.name}
                  habitId={habit.id}
                />
              ) : (
                markNotReceivedSecond
                  .filter((el) => el.habitId === habit.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      habitId={habit.id}
                      habitName={habit.name}
                      type="habit"
                      storeStatsType="habits"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="second"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'recommendation') {
      if (recommedationsLength === 0)
        return <div>No recommendations added to client info</div>

      return (
        <>
          <div
            className={
              recommendationsStoreLengthSecond === recommedationsLength
                ? greenStyle
                : redStyle
            }>
            Second check-in
          </div>
          {chatStore.currentChat?.recommendations?.map((recommendation) => (
            <div key={recommendation.id} className="mb-3">
              <div className="font-semibold text-lg">
                {recommendation.name} (Times today)
              </div>
              {statsStore.recommendations
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'second' &&
                    el.recommendationId === recommendation.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="recommendation"
                        storeStatsType="recommendations"
                        repeatability={el.repeatability}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: recommendation.name,
                            type: 'recommendation',
                            storeStatsType: 'recommendations',
                          })
                        }
                      />
                    )
                )}
              {statsStore.recommendations.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'second' &&
                  el.recommendationId === recommendation.id
              ).length < 1 &&
              markNotReceivedSecond.filter(
                (el) => el.recommendationId === recommendation.id
              ).length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="second"
                  recommendationName={recommendation.name}
                  recommendationId={recommendation.id}
                />
              ) : (
                markNotReceivedSecond
                  .filter((el) => el.recommendationId === recommendation.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      recommendationId={recommendation.id}
                      recommendationName={recommendation.name}
                      type="recommendation"
                      storeStatsType="recommendations"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="second"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'drug') {
      if (medicationsLength === 0)
        return <div>No medications were added to client info</div>
      return (
        <>
          <div
            className={
              medicationsStoreLengthSecond === medicationsLength
                ? greenStyle
                : redStyle
            }>
            Second check-in
          </div>

          {chatStore.currentChat?.drugs?.map((drug) => (
            <div key={drug.id} className="mb-3">
              <div className="font-semibold text-lg">{drug.name}</div>
              {statsStore.drugs
                .filter((el) => el.isReceived)
                .map(
                  (el) =>
                    el.day === currentDate &&
                    el.checkin === 'second' &&
                    el.drugId === drug.id && (
                      <StatElement
                        key={el._id}
                        element={el}
                        type="drug"
                        storeStatsType="drugs"
                        drug={el.drug}
                        handleEditModal={() =>
                          handleEditModal(true, {
                            ...el,
                            title: drug.name,
                            type: 'drug',
                            storeStatsType: 'drugs',
                          })
                        }
                      />
                    )
                )}
              {statsStore.habits.filter(
                (el) =>
                  el.day === currentDate &&
                  el.checkin === 'second' &&
                  el.habitId === drug.id
              ).length < 1 &&
              markNotReceivedSecond.filter((el) => el.drugId === drug.id)
                ?.length < 1 ? (
                <StatNoData
                  handleAddModal={handleAddModal}
                  selectedValue={selectedValue}
                  currentDate={currentDate}
                  checkin="second"
                  medicationName={drug.name}
                  medicationId={drug.id}
                />
              ) : (
                markNotReceivedSecond
                  .filter((el) => el.drugId === drug.id)
                  .map((el) => (
                    <EditStatNoData
                      key={el._id}
                      id={el._id}
                      element={el}
                      medicationId={drug.id}
                      medicationName={drug.name}
                      type="drug"
                      storeStatsType="drugs"
                      handleAddModal={handleAddModal}
                      selectedValue={selectedValue}
                      checkin="second"
                    />
                  ))
              )}
            </div>
          ))}
        </>
      )
    }

    if (type === 'cardio') {
      return (
        <>
          <div className={greenStyle}>Second check-in</div>

          {statsStore.cardio
            .filter((el) => el.isReceived)
            .map(
              (el) =>
                el.clientNumber === clientNumber &&
                el.day === currentDate &&
                el.checkin === 'second' && (
                  <StatElement
                    key={el._id}
                    element={el}
                    type="cardio"
                    timeOfDay={el.timeOfDay}
                    storeStatsType="cardio"
                    pressure={el.pressure}
                    pulse={el.pulse}
                    handleEditModal={() =>
                      handleEditModal(true, {
                        ...el,
                        title,
                        type,
                        storeStatsType,
                      })
                    }
                  />
                )
            )}
          {markNotReceivedSecond?.length ? (
            markNotReceivedSecond.map((el) => (
              <EditStatNoData
                key={el._id}
                element={el}
                id={el._id}
                type="cardio"
                storeStatsType="cardio"
                handleAddModal={handleAddModal}
                selectedValue={selectedValue}
                checkin="second"
              />
            ))
          ) : (
            <StatNoData
              handleAddModal={handleAddModal}
              selectedValue={selectedValue}
              currentDate={currentDate}
              checkin="second"
            />
          )}
        </>
      )
    }

    if (type === 'checkin') {
      return (
        <>
          <CheckinProblems
            currentCheckin="second"
            clientNumber={clientNumber}
            currentDate={currentDate}
          />
        </>
      )
    }

    return (
      <>
        <div className={greenStyle}>Second check-in</div>
        {statsStore[storeStatsType]
          .filter((el) => el.isReceived)
          .map(
            (el) =>
              el.clientNumber === clientNumber &&
              el.day === currentDate &&
              el.checkin === 'second' && (
                <StatElement
                  key={el._id}
                  element={el}
                  type={type}
                  text={text}
                  storeStatsType={storeStatsType}
                  handleEditModal={() =>
                    handleEditModal(true, {
                      ...el,
                      title,
                      type,
                      storeStatsType,
                    })
                  }
                />
              )
          )}
        {markNotReceivedSecond?.length ? (
          markNotReceivedSecond.map((el) => (
            <EditStatNoData
              key={el._id}
              element={el}
              id={el._id}
              type={type}
              storeStatsType={storeStatsType}
              handleAddModal={handleAddModal}
              selectedValue={selectedValue}
              checkin="second"
            />
          ))
        ) : (
          <StatNoData
            handleAddModal={handleAddModal}
            selectedValue={selectedValue}
            currentDate={currentDate}
            checkin="second"
          />
        )}
      </>
    )
  }

  return null
}

export default observer(StatData)
