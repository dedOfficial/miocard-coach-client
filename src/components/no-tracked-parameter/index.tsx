import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

const NoTrackedParameter: FC = () => {
  return (
    <>
      <div className="font-semibold text-xl mt-6">
        There is no tracked parameter
      </div>
      <div className="text-lg font-medium mt-4">
        Set up the value or contact your coach manager
      </div>
    </>
  )
}

export default observer(NoTrackedParameter)
