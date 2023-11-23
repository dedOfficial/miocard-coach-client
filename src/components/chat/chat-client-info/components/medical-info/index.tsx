import React, { useState, useCallback, useMemo } from 'react'
import { isEmpty, omit, some } from 'lodash-es'

import Basket from '../../../../../assets/trash.svg'
import Pencil from '../../../../../assets/pencil.svg'
import { ClientInfoType } from '../../constants'
import OptionModal from '../add-option-modal'
import { initialNewDrug } from './constants'
import { generateId } from '../../../../../helpers/chat/chat.helper'
import useTimeout from '../../../../../hooks/useTimeout'

import {
  itemStyle,
  labelStyle,
  inputStyle,
  smInputWrapperStyle,
  smInputStyle,
  smInputTextStyle,
  xsmInputStyle,
  textareaStyle,
  saveBtnStyle,
  checkboxWrapperStyle,
  checkboxStyle,
  addBtnStyle,
  removeBtnStyle,
} from './styles'
import MedicationModal from './components/add-medication-modal'

interface MedicalInfoProps {
  clientInfo: ClientInfoType
  setClientInfo: React.Dispatch<React.SetStateAction<ClientInfoType>>
  setHasUnsaved: React.Dispatch<React.SetStateAction<boolean>>
  cardioDiseases: string[]
  relativeDiseases: string[]
  chronicDiseases: string[]
  handleAdditionalInfo: (e: any) => void
  handleSave: () => void
}

const MedicalInfo: React.FC<MedicalInfoProps> = ({
  clientInfo,
  setClientInfo,
  setHasUnsaved,
  cardioDiseases,
  relativeDiseases,
  chronicDiseases,
  handleAdditionalInfo,
  handleSave,
}) => {
  const [isCardio, setIsCardio] = useState(false)
  const [isRelative, setIsRelative] = useState(false)
  const [isChronic, setIsChronic] = useState(false)
  const [isMedication, setIsMedication] = useState(false)
  const [isEdiMedication, setIsEditMedication] = useState(false)
  const [newCardio, setNewCardio] = useState('')
  const [newRelative, setNewRelative] = useState('')
  const [newChronic, setNewChronic] = useState('')

  const [newDrug, setNewDrug] = useState(initialNewDrug)
  const [editDrugId, setEditDrugId] = useState('')
  const [isError, setIsError] = useState(false)

  const newCardioValidation = useMemo(() => !isEmpty(newCardio), [newCardio])

  const newRelativeValidation = useMemo(
    () => !isEmpty(newRelative),
    [newRelative]
  )

  const newChronicValidation = useMemo(() => !isEmpty(newChronic), [newChronic])

  const newDrugValidation = useMemo(
    () => !some(omit(newDrug, ['id']), isEmpty),
    [newDrug]
  )

  const runWithDelay = useTimeout(() => setIsError(false))

  const onMedicationClose = useCallback(() => {
    setIsMedication(false)
    setNewDrug(initialNewDrug)
  }, [])
  const onEditMedicationClose = useCallback(() => {
    setIsEditMedication(false)
    setNewDrug(initialNewDrug)
  }, [])

  const handleNewCardio = useCallback(() => {
    if (newCardioValidation) {
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          cardiovascularDiseases: [
            ...(clientInfo?.diseases?.cardiovascularDiseases || []),
            newCardio,
          ],
        },
      })
      setNewCardio('')
      setIsCardio(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newCardio,
    newCardioValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleNewRelative = useCallback(() => {
    if (newRelativeValidation) {
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          relativeDiseases: [
            ...(clientInfo?.diseases?.relativeDiseases || []),
            newRelative,
          ],
        },
      })
      setNewRelative('')
      setIsRelative(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newRelative,
    newRelativeValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleNewChronic = useCallback(() => {
    if (newChronicValidation) {
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          chronicDiseases: [
            ...(clientInfo?.diseases?.chronicDiseases || []),
            newChronic,
          ],
        },
      })
      setNewChronic('')
      setIsChronic(false)
      setHasUnsaved(true)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newChronic,
    newChronicValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleNewDrug = useCallback(() => {
    if (newDrugValidation) {
      setClientInfo({
        ...clientInfo,
        drugs: [...(clientInfo?.drugs || []), newDrug],
      })
      setNewDrug({ ...initialNewDrug, id: generateId() })
      setHasUnsaved(true)
      setIsMedication(false)
    } else {
      setIsError(true)
      runWithDelay()
    }
  }, [
    clientInfo,
    newDrug,
    newDrugValidation,
    runWithDelay,
    setClientInfo,
    setHasUnsaved,
  ])

  const handleDeleteDrug = useCallback(
    (id) => {
      let newDrugs = [...(clientInfo?.drugs || [])]
      newDrugs = newDrugs.filter((drug) => drug.id !== id)
      setClientInfo({ ...clientInfo, drugs: newDrugs })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const openEditModal = useCallback(
    (id) => {
      const editableDrug = clientInfo?.drugs?.filter(
        (drug) => drug.id === id
      )[0]
      setEditDrugId(id)
      setNewDrug({
        name: editableDrug?.name || '',
        type: editableDrug?.type || '',
        id: generateId(),
        indication: editableDrug?.indication || '',
        frequency: {
          value: editableDrug?.frequency?.value || '',
          additional: editableDrug?.frequency?.additional || '',
        },
        regularity: {
          value: editableDrug?.regularity?.value || '',
          additional: editableDrug?.regularity?.additional || '',
        },
        dosage: editableDrug?.dosage || '',
      })
      setIsEditMedication(true)
    },
    [clientInfo.drugs]
  )

  const handleEditDrug = useCallback(
    (id) => {
      const nonEditedDrugs = clientInfo?.drugs?.filter((drug) => drug.id !== id)
      setClientInfo({
        ...clientInfo,
        drugs: [...(nonEditedDrugs || []), newDrug],
      })
      setIsEditMedication(false)
      setNewDrug({ ...initialNewDrug, id: generateId() })
    },
    [clientInfo, newDrug, setClientInfo]
  )

  const handleHeight = useCallback(
    (e) => {
      if (clientInfo?.weight?.current) {
        const bmi = Math.round(
          (703 * Number(clientInfo.weight.current)) /
            Number(e.target.value) ** 2
        )
        setClientInfo({
          ...clientInfo,
          height: e.target.value,
          bmi,
        })
      } else {
        setClientInfo({
          ...clientInfo,
          height: e.target.value,
        })
      }
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleWeight = useCallback(
    (e) => {
      if (clientInfo?.height) {
        const bmi = Math.round(
          (703 * Number(e.target.value)) / Number(clientInfo.height) ** 2
        )
        setClientInfo({
          ...clientInfo,
          weight: { ...clientInfo.weight, current: e.target.value },
          bmi,
        })
      } else {
        setClientInfo({
          ...clientInfo,
          weight: { ...clientInfo.weight, current: e.target.value },
        })
      }
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleCardiovascular = useCallback(
    (e) => {
      let newCardiovascular = [
        ...(clientInfo?.diseases?.cardiovascularDiseases || []),
        e.target.value,
      ]
      if (
        clientInfo?.diseases?.cardiovascularDiseases &&
        clientInfo.diseases.cardiovascularDiseases.includes(e.target.value)
      ) {
        newCardiovascular = newCardiovascular.filter(
          (desc) => desc !== e.target.value
        )
      }
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          cardiovascularDiseases: newCardiovascular,
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleRelative = useCallback(
    (e) => {
      let newRelatives = [
        ...(clientInfo?.diseases?.relativeDiseases || []),
        e.target.value,
      ]
      if (
        clientInfo?.diseases?.relativeDiseases &&
        clientInfo.diseases.relativeDiseases.includes(e.target.value)
      ) {
        newRelatives = newRelatives.filter((desc) => desc !== e.target.value)
      }
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          relativeDiseases: newRelatives,
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  const handleChronic = useCallback(
    (e) => {
      let newChronics = [
        ...(clientInfo?.diseases?.chronicDiseases || []),
        e.target.value,
      ]
      if (
        clientInfo?.diseases?.chronicDiseases &&
        clientInfo.diseases.chronicDiseases.includes(e.target.value)
      ) {
        newChronics = newChronics.filter((desc) => desc !== e.target.value)
      }
      setClientInfo({
        ...clientInfo,
        diseases: {
          ...clientInfo.diseases,
          chronicDiseases: newChronics,
        },
      })
      setHasUnsaved(true)
    },
    [clientInfo, setClientInfo, setHasUnsaved]
  )

  return (
    <div className="w-11/12 text-lg">
      <div className={itemStyle}>
        <div className={labelStyle}>Height:</div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            placeholder="inches"
            className={smInputStyle}
            value={clientInfo.height}
            onChange={handleHeight}
            min={0}
          />
          <div className={smInputTextStyle}>inches</div>
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Weight:</div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            placeholder="lbs"
            className={smInputStyle}
            value={clientInfo?.weight?.current}
            onChange={handleWeight}
            min={0}
          />
          <div className={smInputTextStyle}>lbs</div>
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>BMI:</div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            placeholder="BMI"
            className={smInputStyle}
            value={clientInfo?.bmi ? clientInfo.bmi : 0}
            disabled
          />
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>
          BP recommended by doctor (or comfortable BP):
        </div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            className={`${xsmInputStyle} ml-0`}
            value={clientInfo?.bloodPressure?.recommended?.sys}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                bloodPressure: {
                  ...clientInfo.bloodPressure,
                  recommended: {
                    ...(clientInfo?.bloodPressure?.recommended || {}),
                    sys: e.target.value,
                  },
                },
              })
            }
          />
          <div>/</div>
          <input
            type="number"
            className={xsmInputStyle}
            value={clientInfo?.bloodPressure?.recommended?.dia}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                bloodPressure: {
                  ...clientInfo.bloodPressure,
                  recommended: {
                    ...(clientInfo?.bloodPressure?.recommended || {}),
                    dia: e.target.value,
                  },
                },
              })
            }
          />
          <div className={smInputTextStyle}>mm Hg</div>
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>
          Heart rate recommended by doctor (or comfortable heart rate):
        </div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            className={`${xsmInputStyle} ml-0`}
            value={clientInfo?.heartRate?.recommended}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                heartRate: {
                  ...clientInfo.heartRate,
                  recommended: e.target.value,
                },
              })
            }
          />
          <div className={smInputTextStyle}>bpm</div>
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>BP comfortable for client:</div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            className={`${xsmInputStyle} ml-0`}
            value={clientInfo?.bloodPressure?.comfortable?.sys}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                bloodPressure: {
                  ...clientInfo.bloodPressure,
                  comfortable: {
                    ...(clientInfo?.bloodPressure?.comfortable || {}),
                    sys: e.target.value,
                  },
                },
              })
            }
          />
          <div>/</div>
          <input
            type="number"
            className={xsmInputStyle}
            value={clientInfo?.bloodPressure?.comfortable?.dia}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                bloodPressure: {
                  ...clientInfo.bloodPressure,
                  comfortable: {
                    ...(clientInfo?.bloodPressure?.comfortable || {}),
                    dia: e.target.value,
                  },
                },
              })
            }
          />
          <div className={smInputTextStyle}>mm Hg</div>
        </div>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Heart rate comfortable for client:</div>
        <div className={smInputWrapperStyle}>
          <input
            type="number"
            className={`${xsmInputStyle} ml-0`}
            value={clientInfo?.heartRate?.comfortable}
            min={0}
            onChange={(e) =>
              setClientInfo({
                ...clientInfo,
                heartRate: {
                  ...clientInfo.heartRate,
                  comfortable: e.target.value,
                },
              })
            }
          />
          <div className={smInputTextStyle}>bpm</div>
        </div>
      </div>

      <div className={itemStyle}>
        {isCardio && (
          <OptionModal
            value={newCardio}
            onChange={(e) => setNewCardio(e.target.value)}
            onHandle={handleNewCardio}
            onClose={() => setIsCardio(false)}
            isError={isError}
          />
        )}
        <div className={labelStyle}>
          Diseases/disorders of the cardiovascular system:
        </div>
        {cardioDiseases.map((cardioDisease) => (
          <div key={cardioDisease} className={checkboxWrapperStyle}>
            <input
              type="checkbox"
              id={cardioDisease}
              className={checkboxStyle}
              value={cardioDisease}
              checked={
                clientInfo?.diseases?.cardiovascularDiseases?.includes(
                  cardioDisease
                ) || false
              }
              onChange={handleCardiovascular}
            />
            <label htmlFor={cardioDisease}>{cardioDisease}</label>
          </div>
        ))}
        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsCardio(true)}>
          Add another option
        </button>
      </div>

      <div className={itemStyle}>
        {isRelative && (
          <OptionModal
            value={newRelative}
            onChange={(e) => setNewRelative(e.target.value)}
            onHandle={handleNewRelative}
            onClose={() => setIsRelative(false)}
            isError={isError}
          />
        )}
        <div className={labelStyle}>
          The presence of cardiovascular disease in relatives:
        </div>
        {relativeDiseases.map((relativeDisease) => (
          <div key={relativeDisease} className={checkboxWrapperStyle}>
            <input
              type="checkbox"
              id={relativeDisease}
              className={checkboxStyle}
              value={relativeDisease}
              checked={
                clientInfo?.diseases?.relativeDiseases?.includes(
                  relativeDisease
                ) || false
              }
              onChange={handleRelative}
            />
            <label htmlFor={relativeDisease}>{relativeDisease}</label>
          </div>
        ))}
        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsRelative(true)}>
          Add another option
        </button>
      </div>

      <div className={itemStyle}>
        {isChronic && (
          <OptionModal
            value={newChronic}
            onChange={(e) => setNewChronic(e.target.value)}
            onHandle={handleNewChronic}
            onClose={() => setIsChronic(false)}
            isError={isError}
          />
        )}
        <div className={labelStyle}>
          Chronic diseases/diseases that you have been ill for more than 3
          months:
        </div>
        {chronicDiseases.map((chronicDisease) => (
          <div key={chronicDisease} className={checkboxWrapperStyle}>
            <input
              type="checkbox"
              id={chronicDisease}
              className={checkboxStyle}
              value={chronicDisease}
              checked={
                clientInfo?.diseases?.chronicDiseases?.includes(
                  chronicDisease
                ) || false
              }
              onChange={handleChronic}
            />
            <label htmlFor={chronicDisease}>{chronicDisease}</label>
          </div>
        ))}

        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsChronic(true)}>
          Add another option
        </button>
      </div>

      <div className={itemStyle}>
        {isMedication && (
          <MedicationModal
            onHandle={handleNewDrug}
            nameValue={newDrug.name}
            onNameChange={(e) =>
              setNewDrug({ ...newDrug, name: e.target.value })
            }
            dosageValue={newDrug.dosage}
            onDosageChange={(e) =>
              setNewDrug({ ...newDrug, dosage: e.target.value })
            }
            indicationsValue={newDrug.indication}
            onIndicationsChange={(e) =>
              setNewDrug({ ...newDrug, indication: e.target.value })
            }
            regularityValue={newDrug.regularity}
            onRegularityChange={(e) =>
              setNewDrug({
                ...newDrug,
                regularity: {
                  ...newDrug.regularity,
                  additional: e.target.value,
                },
              })
            }
            onRegularityCheckChange={(e) =>
              setNewDrug({
                ...newDrug,
                regularity: {
                  ...newDrug.regularity,
                  value: e.target.value,
                },
              })
            }
            frequencyValue={newDrug.frequency}
            onFrequencyChange={(e) =>
              setNewDrug({
                ...newDrug,
                frequency: {
                  ...newDrug.frequency,
                  additional: e.target.value,
                },
              })
            }
            onFrequencyCheckChange={(e) =>
              setNewDrug({
                ...newDrug,
                frequency: {
                  ...newDrug.frequency,
                  value: e.target.value,
                },
              })
            }
            onClose={onMedicationClose}
            typeValue={newDrug.type}
            onTypeChange={(e) =>
              setNewDrug({ ...newDrug, type: e.target.value })
            }
            isError={isError}
          />
        )}
        {isEdiMedication && (
          <MedicationModal
            onHandle={() => handleEditDrug(editDrugId)}
            nameValue={newDrug.name}
            onNameChange={(e) =>
              setNewDrug({ ...newDrug, name: e.target.value })
            }
            dosageValue={newDrug.dosage}
            onDosageChange={(e) =>
              setNewDrug({ ...newDrug, dosage: e.target.value })
            }
            indicationsValue={newDrug.indication}
            onIndicationsChange={(e) =>
              setNewDrug({ ...newDrug, indication: e.target.value })
            }
            regularityValue={newDrug.regularity}
            onRegularityChange={(e) =>
              setNewDrug({
                ...newDrug,
                regularity: {
                  ...newDrug.regularity,
                  additional: e.target.value,
                },
              })
            }
            onRegularityCheckChange={(e) =>
              setNewDrug({
                ...newDrug,
                regularity: {
                  ...newDrug.regularity,
                  value: e.target.value,
                },
              })
            }
            frequencyValue={newDrug.frequency}
            onFrequencyChange={(e) =>
              setNewDrug({
                ...newDrug,
                frequency: {
                  ...newDrug.frequency,
                  additional: e.target.value,
                },
              })
            }
            onFrequencyCheckChange={(e) =>
              setNewDrug({
                ...newDrug,
                frequency: {
                  ...newDrug.frequency,
                  value: e.target.value,
                },
              })
            }
            onClose={onEditMedicationClose}
            typeValue={newDrug.type}
            onTypeChange={(e) =>
              setNewDrug({ ...newDrug, type: e.target.value })
            }
            isError={isError}
          />
        )}
        <div className={labelStyle}>Medications to take:</div>
        <table className="text-lg">
          <tbody>
            {clientInfo.drugs &&
              clientInfo?.drugs.map((drugItem) => (
                <>
                  <tr key={drugItem.id} className="grid-rows-1">
                    <td className="font-medium p-2">{drugItem.name}:</td>
                    <td>
                      <button
                        className={removeBtnStyle}
                        type="button"
                        onClick={() => openEditModal(drugItem.id)}>
                        <img src={Pencil} alt="Pencil" />
                      </button>
                      <button
                        className={removeBtnStyle}
                        type="button"
                        onClick={() => handleDeleteDrug(drugItem.id)}>
                        <img src={Basket} alt="Basket" />
                      </button>
                    </td>
                  </tr>
                  <div className="flex justify-between p-2">
                    <div className="flex flex-col">
                      <small>Indication:</small>
                      <small className="font-semibold">
                        {drugItem.indication}
                      </small>
                    </div>
                    <div className="flex flex-col">
                      <small>Regularity:</small>
                      <small className="font-semibold">
                        {drugItem.regularity?.value !== 'Other'
                          ? drugItem.regularity?.value
                          : drugItem.regularity?.additional}
                      </small>
                    </div>
                    <div className="flex flex-col">
                      <small>Medication Frequency:</small>
                      <small className="font-semibold">
                        {drugItem.frequency?.value !== 'Other'
                          ? drugItem.frequency?.value
                          : drugItem.frequency?.additional}
                      </small>
                    </div>
                  </div>
                  <div className="flex p-2">
                    <div className="flex flex-col mr-16">
                      <small>Type:</small>
                      <small className="font-semibold">{drugItem.type}</small>
                    </div>
                    <div className="flex flex-col">
                      <small>Dosage:</small>
                      <small className="font-semibold">{drugItem.dosage}</small>
                    </div>
                  </div>
                </>
              ))}
          </tbody>
        </table>
        <button
          className={addBtnStyle}
          type="button"
          onClick={() => setIsMedication(true)}>
          Add new medication
        </button>
      </div>

      <div className={itemStyle}>
        <div className={labelStyle}>Other diseases (Not chronic diseases):</div>
        <input
          type="text"
          className={inputStyle}
          placeholder="Write other diseases"
          value={clientInfo?.diseases?.otherDiseases}
          onChange={(e) =>
            setClientInfo({
              ...clientInfo,
              diseases: {
                ...clientInfo.diseases,
                otherDiseases: e.target.value,
              },
            })
          }
        />
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

export default MedicalInfo
