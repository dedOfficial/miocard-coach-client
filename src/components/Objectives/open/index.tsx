import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

// import AchievementsList from './components/achievements-list'
import ResultsList from './components/results-list'
import Loader from '../../loader/loader'
import objectivesStore from '../../../store/objectiveStore/objectives.store'

import {
  wrapperStyle,
  // btnsWrapperStyle,
  // btnStyle,
  // activeBtnStyle,
} from './syles'

interface OpenObjectiveProps {
  objectiveId: string
}

const OpenObjective: React.FC<OpenObjectiveProps> = ({ objectiveId }) => {
  const { resultsAchievement } = objectivesStore
  const { loading } = objectivesStore.requestInitialState
  // const [currentTab, setCurrentTab] = useState('keyResults')

  useEffect(() => {
    const fetchResultsAchievement = async () => {
      await objectivesStore.fetchResultsAchievement(objectiveId)
    }
    fetchResultsAchievement()
  }, [objectiveId])

  if (loading) return <Loader />

  return (
    <div className={wrapperStyle}>
      {/* <div className={btnsWrapperStyle}>
        <button
          type="button"
          className={currentTab === 'objective' ? activeBtnStyle : btnStyle}
          onClick={() => {
            setCurrentTab('objective')
          }}>
          Objective achievement
        </button>
        <button
          type="button"
          className={currentTab === 'keyResults' ? activeBtnStyle : btnStyle}
          onClick={() => {
            setCurrentTab('keyResults')
          }}>
          Key results achievement
        </button>
      </div>

      {currentTab === 'objective' && (
        <AchievementsList achievements={achievementsByCoaches} />
      )}

      {currentTab === 'keyResults' && (
        <ResultsList results={resultsAchievement} objectiveId={objectiveId} />
      )} */}
      <ResultsList results={resultsAchievement} objectiveId={objectiveId} />
    </div>
  )
}

export default observer(OpenObjective)
