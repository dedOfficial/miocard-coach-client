/* eslint-disable import/no-named-as-default */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useCloseByClickOutside from 'hooks/useCloseByClickOutside'
import chatStore from '../../../store/chatStore/chat.store'
import {
  ClientInfoType,
  CurrentSectionType,
  initialSection,
  initialJobDescriptions,
  initialCardioDiseases,
  initialRelativeDiseases,
  initialChronicDiseases,
} from './constants'
import Header from './components/header'
import Navigation from './components/navigation'
import PersonalInfo from './components/personal-info'
import MedicalInfo from './components/medical-info'
import Notes from './components/notes'
import Attendance from './components/attendance'

import { clientInfoStyle, btnStyle, wrapperStyle } from './styles'
import {
  addBtnStyle,
  btnsWrapperStyle,
  cancelBtnStyle,
  overlayStyle,
  titleStyle,
  wrapperStyle as modalWrapper,
} from './components/add-option-modal/styles'

const ChatClientInfo: React.FC = () => {
  const [isShowClientInfo, SetIsShowClientInfo] = useState(false)
  const [currentSection, setCurrentSection] =
    useState<CurrentSectionType>(initialSection)
  const [clientInfo, setClientInfo] = useState<ClientInfoType>({})

  const [hasUnsaved, setHasUnsaved] = useState(false)
  const [isSaveModal, setIsSaveModal] = useState(false)

  const name = chatStore.currentChat?.personalInfo?.clientName || ''
  const chatName = chatStore.currentChat.dummyName
  const {
    personalInfo,
    additionalInformation,
    weight,
    height,
    habits,
    recommendations,
    bmi,
    drugs,
    diseases,
    checkinsPerWeek,
    assistantCheckinsPerWeek,
    selfEfficacy,
    testResults,
    bloodPressure,
    heartRate,
    food,
    stress,
    sleep,
    sport,
    badHabits,
    understanding,
    measurementErrors,
    eysenck1,
    eysenck2,
    eysenck3,
    eysenck4,
    lifestyleAssessment,
    generalHealthRisks,
    score,
    bipq,
  } = chatStore.currentChat

  useEffect(() => {
    const initialInfo: ClientInfoType = {}

    initialInfo.food = food
    initialInfo.stress = stress
    initialInfo.sleep = sleep
    initialInfo.sport = sport
    initialInfo.badHabits = badHabits
    initialInfo.understanding = understanding
    initialInfo.measurementErrors = measurementErrors
    initialInfo.eysenck1 = eysenck1
    initialInfo.eysenck2 = eysenck2
    initialInfo.eysenck3 = eysenck3
    initialInfo.eysenck4 = eysenck4
    initialInfo.lifestyleAssessment = lifestyleAssessment
    initialInfo.generalHealthRisks = generalHealthRisks
    initialInfo.score = score
    initialInfo.bipq = bipq

    if (personalInfo) {
      initialInfo.personalInfo = personalInfo
    }
    if (additionalInformation) {
      initialInfo.additionalInformation = additionalInformation
    }
    if (weight) {
      initialInfo.weight = {
        ...weight,
        current: String(weight.current),
      }
    }
    if (height || height === 0) {
      initialInfo.height = String(height)
    }
    if (habits) {
      initialInfo.habits = habits
    }
    if (recommendations) {
      initialInfo.recommendations = recommendations
    }
    if (bmi) {
      initialInfo.bmi = bmi
    }
    if (drugs) {
      initialInfo.drugs = drugs
    }
    if (diseases) {
      initialInfo.diseases = diseases
    }
    if (checkinsPerWeek || checkinsPerWeek === 0) {
      initialInfo.checkinsPerWeek = String(checkinsPerWeek)
    }
    if (assistantCheckinsPerWeek || assistantCheckinsPerWeek === 0) {
      initialInfo.assistantCheckinsPerWeek = String(assistantCheckinsPerWeek)
    }
    if (selfEfficacy) {
      initialInfo.selfEfficacy = {
        ...selfEfficacy,
        norm: String(selfEfficacy.norm),
        current: String(selfEfficacy.current),
      }
    }
    if (testResults) {
      initialInfo.testResults = testResults
    }
    if (bloodPressure) {
      initialInfo.bloodPressure = {
        comfortable: {
          sys: String(bloodPressure.comfortable?.sys),
          dia: String(bloodPressure.comfortable?.dia),
        },
        recommended: {
          sys: String(bloodPressure.recommended?.sys),
          dia: String(bloodPressure.recommended?.dia),
        },
      }
    }
    if (heartRate) {
      initialInfo.heartRate = {
        comfortable: String(heartRate.comfortable),
        recommended: String(heartRate.recommended),
      }
    }

    setClientInfo(initialInfo)
  }, [
    additionalInformation,
    assistantCheckinsPerWeek,
    badHabits,
    bipq,
    bloodPressure,
    bmi,
    checkinsPerWeek,
    diseases,
    drugs,
    eysenck1,
    eysenck2,
    eysenck3,
    eysenck4,
    food,
    generalHealthRisks,
    habits,
    heartRate,
    height,
    lifestyleAssessment,
    measurementErrors,
    personalInfo,
    recommendations,
    score,
    selfEfficacy,
    sleep,
    sport,
    stress,
    testResults,
    understanding,
    weight,
  ])

  const toggleWindow = useCallback(
    (flag: boolean) => () => {
      if (hasUnsaved && isShowClientInfo) setIsSaveModal(true)
      SetIsShowClientInfo(flag)
    },
    [hasUnsaved, isShowClientInfo]
  )

  const handleSection = (section: string) => {
    switch (section) {
      case 'notes':
        setCurrentSection({
          notes: true,
          attendance: false,
          personal: false,
          medical: false,
        })
        break
      case 'attendance':
        setCurrentSection({
          notes: false,
          attendance: true,
          personal: false,
          medical: false,
        })
        break
      case 'personal':
        setCurrentSection({
          notes: false,
          attendance: false,
          personal: true,
          medical: false,
        })
        break
      case 'medical':
        setCurrentSection({
          notes: false,
          attendance: false,
          personal: false,
          medical: true,
        })
        break
      default:
        setCurrentSection({
          notes: false,
          attendance: false,
          personal: true,
          medical: false,
        })
    }
  }

  const handleAdditionalInfo = useCallback(
    (e) => {
      setClientInfo({
        ...clientInfo,
        additionalInformation: e.target.value,
      })
    },
    [clientInfo]
  )

  const handleSave = useCallback(() => {
    setHasUnsaved(false)
    setIsSaveModal(false)
    chatStore.patchChat({
      ...clientInfo,
      height: Number(clientInfo.height),
      weight: {
        ...clientInfo.weight,
        current: Number(clientInfo.weight?.current),
      },
      food: clientInfo?.food,
      stress: clientInfo?.stress,
      sleep: clientInfo?.sleep,
      sport: clientInfo?.sport,
      badHabits: clientInfo?.badHabits,
      understanding: clientInfo?.understanding,
      measurementErrors: clientInfo?.measurementErrors,
      eysenck1: clientInfo?.eysenck1,
      eysenck2: clientInfo?.eysenck2,
      eysenck3: clientInfo?.eysenck3,
      eysenck4: clientInfo?.eysenck4,
      lifestyleAssessment: clientInfo?.lifestyleAssessment,
      generalHealthRisks: clientInfo?.generalHealthRisks,
      score: clientInfo?.score,
      bipq: clientInfo?.bipq,
      bloodPressure: {
        comfortable: {
          sys: Number(clientInfo.bloodPressure?.comfortable?.sys),
          dia: Number(clientInfo.bloodPressure?.comfortable?.dia),
        },
        recommended: {
          sys: Number(clientInfo.bloodPressure?.recommended?.sys),
          dia: Number(clientInfo.bloodPressure?.recommended?.dia),
        },
      },
      heartRate: {
        comfortable: Number(clientInfo.heartRate?.comfortable),
        recommended: Number(clientInfo.heartRate?.recommended),
      },
      selfEfficacy: {
        current: Number(clientInfo.selfEfficacy?.current),
        norm: Number(clientInfo.selfEfficacy?.norm),
      },
      checkinsPerWeek: Number(clientInfo.checkinsPerWeek),
      assistantCheckinsPerWeek: Number(clientInfo.assistantCheckinsPerWeek),
    })
    // toggleWindow(false)()

    SetIsShowClientInfo(false)
  }, [clientInfo])

  const jobDescriptions = Array.from(
    new Set(
      initialJobDescriptions.concat(
        clientInfo?.personalInfo?.jobDescription || []
      )
    )
  )

  const cardioDiseases = Array.from(
    new Set(
      initialCardioDiseases.concat(
        clientInfo?.diseases?.cardiovascularDiseases || []
      )
    )
  )

  const relativeDiseases = Array.from(
    new Set(
      initialRelativeDiseases.concat(
        clientInfo?.diseases?.relativeDiseases || []
      )
    )
  )

  const chronicDiseases = Array.from(
    new Set(
      initialChronicDiseases.concat(clientInfo?.diseases?.chronicDiseases || [])
    )
  )

  const optionModalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: optionModalRef,
    handler: () => setIsSaveModal(true),
  })

  return (
    <>
      {isSaveModal && (
        <>
          <div className={overlayStyle} />
          <div
            className={`${modalWrapper} top-1/3 left-1/3`}
            ref={optionModalRef}>
            <div className={titleStyle}>Are you sure?</div>
            <p>You have unsaved changes. Would you like to save?</p>
            <div className={btnsWrapperStyle}>
              <button
                className={addBtnStyle}
                type="button"
                onClick={handleSave}>
                SAVE
              </button>
              <button
                className={cancelBtnStyle}
                type="button"
                onClick={() => {
                  setIsSaveModal(false)
                  setHasUnsaved(true)
                  toggleWindow(true)()
                }}>
                CONTINUE
              </button>
            </div>
          </div>
        </>
      )}

      <button type="button" className={btnStyle} onClick={toggleWindow(true)}>
        Client Info
      </button>

      {isShowClientInfo && (
        <div className={wrapperStyle}>
          <div className={clientInfoStyle}>
            <Header
              chatName={chatName}
              patientName={name}
              toggleWindow={toggleWindow}
            />

            <Navigation
              currentSection={currentSection}
              handleSection={handleSection}
            />

            {currentSection.notes && <Notes clientInfo={clientInfo} />}

            {currentSection.attendance && (
              <Attendance
                clientInfo={clientInfo}
                setClientInfo={setClientInfo}
                handleAdditionalInfo={handleAdditionalInfo}
                handleSave={handleSave}
                setHasUnsaved={setHasUnsaved}
              />
            )}

            {currentSection.personal && (
              <PersonalInfo
                clientInfo={clientInfo}
                setClientInfo={setClientInfo}
                jobDescriptions={jobDescriptions}
                handleAdditionalInfo={handleAdditionalInfo}
                handleSave={handleSave}
                setHasUnsaved={setHasUnsaved}
              />
            )}

            {currentSection.medical && (
              <MedicalInfo
                clientInfo={clientInfo}
                setClientInfo={setClientInfo}
                cardioDiseases={cardioDiseases}
                relativeDiseases={relativeDiseases}
                chronicDiseases={chronicDiseases}
                handleAdditionalInfo={handleAdditionalInfo}
                handleSave={handleSave}
                setHasUnsaved={setHasUnsaved}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default observer(ChatClientInfo)
