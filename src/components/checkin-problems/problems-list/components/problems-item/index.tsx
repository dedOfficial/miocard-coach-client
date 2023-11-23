import React from 'react'
import { Link } from 'react-router-dom'

import { ProblemsPeriodType } from '../../../../../store/checkinProblemsStore/checkinProblems.store.types'
import ProblemsStatsBlock from './components/problems-stats-block'

import { itemStyle, titleStyle, statsWrapperStyle } from './styles'

interface ProblemsItemProps {
  title: string
  url: string
  week: ProblemsPeriodType
  month: ProblemsPeriodType
}

const ProblemsItem: React.FC<ProblemsItemProps> = ({
  title,
  url,
  week,
  month,
}) => {
  return (
    <div className={itemStyle}>
      <h5 className={titleStyle}>
        <Link to={url}>{title}</Link>
      </h5>

      <div className={statsWrapperStyle}>
        <ProblemsStatsBlock title="Weekly" period={week} />
        <ProblemsStatsBlock title="Monthly" period={month} />
      </div>
    </div>
  )
}

export default ProblemsItem
