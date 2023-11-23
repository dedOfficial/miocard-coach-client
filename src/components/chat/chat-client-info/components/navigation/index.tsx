import React from 'react'

import { CurrentSectionType } from '../../constants'

import { wrapperStyle, btnStyle, activeBtnStyle } from './styles'

interface NavigationProps {
  currentSection: CurrentSectionType
  handleSection: (section: string) => void
}

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  handleSection,
}) => {
  return (
    <div className={wrapperStyle}>
      <button
        className={currentSection.notes ? activeBtnStyle : btnStyle}
        type="button"
        onClick={() => handleSection('notes')}>
        Daily notes
      </button>
      <button
        className={currentSection.attendance ? activeBtnStyle : btnStyle}
        type="button"
        onClick={() => handleSection('attendance')}>
        Success and attendance
      </button>
      <button
        className={currentSection.personal ? activeBtnStyle : btnStyle}
        type="button"
        onClick={() => handleSection('personal')}>
        Personal info
      </button>
      <button
        className={currentSection.medical ? activeBtnStyle : btnStyle}
        type="button"
        onClick={() => handleSection('medical')}>
        Medical info
      </button>
    </div>
  )
}

export default Navigation
