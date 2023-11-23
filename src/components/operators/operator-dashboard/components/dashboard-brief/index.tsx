import React from 'react'

const DashboardBrief: React.FC = () => {
  return (
    <>
      <div className="font-medium text-lg mt-6">
        Not all tracked parameters have been set. To view the dashboard, set up
        the following tracked parameters:
      </div>
      <ul className="text-lg font-medium ml-5 mt-1 list-disc">
        <li>Data collection</li>
        <li>Patient return</li>
        <li>BP measurement frequency</li>
        <li>Check-in problems</li>
      </ul>
      <div className="mt-4">
        Contact your coach manager, if necessary, to set up tracked parameteres.
      </div>
    </>
  )
}

export default DashboardBrief
