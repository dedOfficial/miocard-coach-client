import React from 'react'
import { observer } from 'mobx-react-lite'

import Checkin from './components/checkin'

export interface CheckinProblemsProps {
  currentCheckin: string
  clientNumber: string
  currentDate: string
}

const CheckinProblems: React.FC<CheckinProblemsProps> = ({
  currentCheckin,
  clientNumber,
  currentDate,
}) => {
  return (
    <div className="pb-6 mt-5">
      <div className="space-y-3.5 mt-3.5">
        <Checkin
          currentCheckin={currentCheckin}
          clientNumber={clientNumber}
          currentDate={currentDate}
        />
      </div>
    </div>
  )
}

export default observer(CheckinProblems)
