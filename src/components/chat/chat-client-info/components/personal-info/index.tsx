import React, { useCallback, useState, useMemo } from 'react'
import moment from 'moment'
import { isEmpty } from 'lodash-es'

import { ClientInfoType } from '../../constants'
import OptionModal from '../add-option-modal'
import Input from './components/input'
import useTimeout from '../../../../../hooks/useTimeout'

import {
  itemStyle,
  labelStyle,
  selectStyle,
  selectBgStyle,
  textareaStyle,
  saveBtnStyle,
  checkboxWrapperStyle,
  checkboxStyle,
  addBtnStyle,
  inputStyle,
} from './styles'

interface PersonalInfoProps {
  clientInfo: ClientInfoType
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfoType>>
  setHasUnsaved: React.Dispatch<React.SetStateAction<boolean>>
  jobDescriptions: string[]
  handleAdditionalInfo: (e: any) => void
  handleSave: () => void
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  clientInfo,
  setClientInfo,
  setHasUnsaved,
  jobDescriptions,
  handleAdditionalInfo,
  handleSave,
}) => {
  const [isJobDescription, setIsJobDescription] = useState(false)
  const [newJobDescription, setNewJobDescription] = useState('')
  const [isError, setIsError] = useState(false)

  const diffInYears = useCallback((date1, date2) => {
    return moment(date1).diff(moment(date2), 'years')
  }, [])

  const handleDateOfBirth = useCallback(
    (e) => {
      const age = diffInYears(new Date(), e.target.value)
      setClientInfo({
        ...clientInfo,
        personalInfo: {
          ...clientInfo.personalInfo,
          dateOfBirth: e.target.value,
          age: String(age),
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, diffInYears, setClientInfo, setHasUnsaved]
  )

  const handleAdditionalPersonalInfo = useCallback(
    (value: string) => (e) => {
      if (
        value === 'score' &&
        (Number(e.target.value) > 50 || Number(e.target.value) < 0)
      ) {
        return
      }
      if (
        value === 'bipq' &&
        (Number(e.target.value) > 100 || Number(e.target.value) < 0)
      ) {
        return
      }
      setClientInfo({
        ...clientInfo,
        [value]: e.target.value,
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handlePersonalInfo = useCallback(
    (value: string) => (e) => {
      setClientInfo({
        ...clientInfo,
        personalInfo: {
          ...clientInfo.personalInfo,
          [value]: e.target.value,
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleJobDescription = useCallback(
    (e) => {
      let newDescription = [
        ...(clientInfo?.personalInfo?.jobDescription || []),
        e.target.value,
      ]
      if (
        clientInfo?.personalInfo?.jobDescription &&
        clientInfo.personalInfo.jobDescription.includes(e.target.value)
      ) {
        newDescription = newDescription.filter(
          (desc) => desc !== e.target.value
        )
      }
      setClientInfo({
        ...clientInfo,
        personalInfo: {
          ...clientInfo.personalInfo,
          jobDescription: newDescription,
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const newJobValidation = useMemo(
    () => !isEmpty(newJobDescription),
    [newJobDescription]
  )

  const runWithDelay = useTimeout(() => setIsError(false))

  const handleNewJobDescription = useCallback(() => {
    if (newJobValidation) {
      setClientInfo({
        ...clientInfo,
        personalInfo: {
          ...clientInfo.personalInfo,
          jobDescription: [
            ...(clientInfo?.personalInfo?.jobDescription || []),
            newJobDescription,
          ],
        },
      })
      setNewJobDescription('')
      setIsJobDescription(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newJobDescription,
    newJobValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  return (
    <div className="w-11/12 text-lg">
      <Input
        type="text"
        label="Name:"
        placeholder="Write patient's name"
        value={clientInfo?.personalInfo?.clientName}
        onChange={handlePersonalInfo('clientName')}
      />

      <div className={itemStyle}>
        <div className={labelStyle}>Sex:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.personalInfo?.sex || 'default'}
          onChange={handlePersonalInfo('sex')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <Input
        type="date"
        value={clientInfo?.personalInfo?.dateOfBirth}
        label="Date of Birth:"
        onChange={handleDateOfBirth}
      />

      <div className={itemStyle}>
        <div className={labelStyle}>Age:</div>
        <input
          type="text"
          className={inputStyle}
          value={
            clientInfo?.personalInfo?.age
              ? clientInfo.personalInfo.age
              : 'Automatically calculated from date of birth data'
          }
          disabled
        />
      </div>

      <Input
        type="text"
        label="Nation:"
        placeholder="Write patient's nation"
        value={clientInfo?.personalInfo?.nation}
        onChange={handlePersonalInfo('nation')}
      />

      <Input
        type="text"
        label="City:"
        placeholder="Write patient's city"
        value={clientInfo?.personalInfo?.city}
        onChange={handlePersonalInfo('city')}
      />

      <div className={itemStyle}>
        <div className={labelStyle}>Family status:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.personalInfo?.familyStatus || 'default'}
          onChange={handlePersonalInfo('familyStatus')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Married">Married</option>
          <option value="Civil marriage">Civil marriage</option>
          <option value="Dating">Dating</option>
          <option value="Single">Single</option>
          <option value="Divorced">Divorced</option>
          <option value="Widower/widow">Widower/widow</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Input
        type="text"
        label="Lives with:"
        placeholder="Write, who lives with patient"
        value={clientInfo?.personalInfo?.livesWith}
        onChange={handlePersonalInfo('livesWith')}
      />

      <div className={itemStyle}>
        <div className={labelStyle}>Food test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.food || 'default'}
          onChange={handleAdditionalPersonalInfo('food')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Stress test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.stress || 'default'}
          onChange={handleAdditionalPersonalInfo('stress')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Sleep test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.sleep || 'default'}
          onChange={handleAdditionalPersonalInfo('sleep')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Sport test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.sport || 'default'}
          onChange={handleAdditionalPersonalInfo('sport')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Bad habits test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.badHabits || 'default'}
          onChange={handleAdditionalPersonalInfo('badHabits')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Understanding test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.understanding || 'default'}
          onChange={handleAdditionalPersonalInfo('understanding')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Measurements errors test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.measurementErrors || 'default'}
          onChange={handleAdditionalPersonalInfo('measurementErrors')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Positive">Positive</option>
          <option value="positive">positive</option>
          <option value="Negative">Negative</option>
          <option value="negative">negative</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Eysenck 1 test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.eysenck1 || 'default'}
          onChange={handleAdditionalPersonalInfo('eysenck1')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Reliable result">Reliable result</option>
          <option value="Doubtfull result">Doubtfull result</option>
          <option value="Unreliable result">Unreliable result</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Eysenck 2 test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.eysenck2 || 'default'}
          onChange={handleAdditionalPersonalInfo('eysenck2')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="introvert">introvert</option>
          <option value="extrovert">extrovert</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Eysenck 3 test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.eysenck3 || 'default'}
          onChange={handleAdditionalPersonalInfo('eysenck3')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="emotionally stable">emotionally stable</option>
          <option value="emotionally unstable">emotionally unstable</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Eysenck 4 test:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.eysenck4 || 'default'}
          onChange={handleAdditionalPersonalInfo('eysenck4')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="Phlegmatic">Phlegmatic</option>
          <option value="Melancholic">Melancholic</option>
          <option value="Sanguine">Sanguine</option>
          <option value="Choleric">Choleric</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Lifestyle assessment:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.lifestyleAssessment || 'default'}
          onChange={handleAdditionalPersonalInfo('lifestyleAssessment')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="general/average need">general/average need</option>
          <option value="narrow necessity">narrow necessity</option>
          <option value="high need">high need</option>
        </select>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>General health risks:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.generalHealthRisks || 'default'}
          onChange={handleAdditionalPersonalInfo('generalHealthRisks')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="low level">low level</option>
          <option value="general level">general level</option>
          <option value="high level">high level</option>
          <option value="very high level">very high level</option>
        </select>
      </div>

      <Input
        type="number"
        label="SCORE (Systematic Coronary Risk Evaluation):"
        placeholder="SCORE (Systematic Coronary Risk Evaluation)"
        value={clientInfo?.score}
        onChange={handleAdditionalPersonalInfo('score')}
      />

      <Input
        type="number"
        label="BiPQ ( The Brief Illness Perception Questionnaire):"
        placeholder="BiPQ ( The Brief Illness Perception Questionnaire)"
        value={clientInfo?.bipq}
        onChange={handleAdditionalPersonalInfo('bipq')}
      />

      <div className={itemStyle}>
        <div className={labelStyle}>The level of education:</div>
        <select
          className={selectStyle}
          style={selectBgStyle}
          defaultValue={clientInfo?.personalInfo?.levelOfEducation || 'default'}
          onChange={handlePersonalInfo('levelOfEducation')}>
          <option disabled hidden value="default">
            Choose
          </option>
          <option value="School education">School education</option>
          <option value="College education">College education</option>
          <option value="Univercity graduate">Univercity graduate</option>
          <option value="Univercity postgraduate">
            Univercity postgraduate
          </option>
          <option value="Other">Other</option>
        </select>
      </div>

      <Input
        type="text"
        label="Job profession:"
        placeholder="Write patient's profession"
        value={clientInfo?.personalInfo?.jobProfession}
        onChange={handlePersonalInfo('jobProfession')}
      />

      <div className={itemStyle}>
        {isJobDescription && (
          <OptionModal
            value={newJobDescription}
            onChange={(e) => setNewJobDescription(e.target.value)}
            onHandle={handleNewJobDescription}
            onClose={() => setIsJobDescription(false)}
            isError={isError}
          />
        )}
        <div className={labelStyle}>Job description:</div>
        {jobDescriptions.map((jobDesc) => (
          <div key={jobDesc} className={checkboxWrapperStyle}>
            <input
              type="checkbox"
              id={jobDesc}
              value={jobDesc}
              className={checkboxStyle}
              onChange={handleJobDescription}
              checked={clientInfo?.personalInfo?.jobDescription?.includes(
                jobDesc
              )}
            />
            <label htmlFor={jobDesc}>{jobDesc}</label>
          </div>
        ))}
        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsJobDescription(true)}>
          Add another option
        </button>
      </div>

      <div className={`${itemStyle} mt-10`}>
        <div className={labelStyle}>Additional information:</div>
        <textarea
          className={textareaStyle}
          placeholder="Additional information about the patient"
          value={clientInfo?.additionalInformation}
          onChange={handleAdditionalInfo}
        />
      </div>

      <div className={itemStyle}>
        <button type="submit" className={saveBtnStyle} onClick={handleSave}>
          SAVE
        </button>
      </div>
    </div>
  )
}

export default PersonalInfo
