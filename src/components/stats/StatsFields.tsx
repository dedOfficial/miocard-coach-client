import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

const StatsFields: FC = () => {
  return (
    <div className="flex items-center mt-10">
      <div className="flex justify-center items-center mr-14">
        <div className="w-16 h-5 bg-green-600 mr-4" />
        <span className="text-green-600 font-light">
          Required fields filled
        </span>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-16 h-5 bg-red-500 mr-4" />
        <span className="text-red-500 font-light">
          Required fields unfilled{' '}
        </span>
      </div>
    </div>
  )
}
export default observer(StatsFields)
