/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import InputMask from 'react-input-mask'
import { observer } from 'mobx-react-lite'
import { isEmpty, omit, some } from 'lodash-es'

import operatorStore from 'store/operatorStore/operator.store'
import { addAvatar } from 'services/files/files.service'
import BoardTitleNew from '../../board/board-title-new'
import {
  OperatorForChat,
  OperatorWithAssignedType,
} from '../../../store/operatorStore/operator.store.types'
import Loader from '../../loader/loader'
import AvatarBig from '../../avatar/AvatarBig'
import useTimeout from '../../../hooks/useTimeout'

import {
  addBtnStyle,
  btnsWrapperStyle,
  cancelBtnStyle,
  coachEditAddPhotoStyle,
  coachEditBigBoxStyle,
  coachEditLinkPhotoStyle,
  coachEditSmallBoxStyle,
  coachEditWrapperStyle,
  errorStyle,
  inputStyle,
  labelStyle,
  textAreaStyle,
} from './styles'

interface OperatorNewEditProps {
  children?: any
}

const OperatorNewEdit: FC<OperatorNewEditProps> = () => {
  const [currentOperator, setCurrentOperator] =
    useState<OperatorWithAssignedType>({
      _id: '',
      assignedChats: [],
      basicInfo: '',
      email: '',
      name: '',
      avatar: '',
      phoneNumber: '',
      type: OperatorForChat.COACH,
    })
  const [isError, setIsError] = useState(false)
  const [selectedFile, setSelectedFile] =
    useState<React.ChangeEvent<HTMLInputElement>>()
  const [preview, setPreview] = useState<string>()

  const { id } = useParams<{ id: string }>()

  const inputFile = useRef() as React.MutableRefObject<HTMLInputElement>

  const {
    operatorWithAssign,
    requestInitialState: { loading },
  } = operatorStore

  const navigate = useHistory()

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    if (selectedFile.target.files?.[0]) {
      const objectUrl = URL.createObjectURL(selectedFile.target.files?.[0])
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  useEffect(() => {
    if (id) {
      const getOperator = async () => {
        await operatorStore.fetchOperatorWithAssign(id)
      }
      getOperator()
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setCurrentOperator({ ...operatorWithAssign })
    }
  }, [id, operatorWithAssign])

  const handleOperator = useCallback(
    (value: string) => (e) => {
      setCurrentOperator({ ...currentOperator, [value]: e.target.value })
    },
    [currentOperator]
  )

  const textAreaClassName = `${inputStyle} ${textAreaStyle}`

  const newOperatorValidation = useMemo(
    () =>
      !some(
        omit(currentOperator, [
          '_id',
          'assignedChats',
          'avatar',
          'phoneNumber',
          'basicInfo',
          'type',
        ]),
        isEmpty
      ),
    [currentOperator]
  )

  const handleCancelSubmit = () => {
    navigate.goBack()
  }

  const runWithDelay = useTimeout(() => setIsError(false))

  const handleSubmit = async () => {
    if (id && !selectedFile) {
      await operatorStore.editOperator(currentOperator)
      navigate.push('/operators')
    } else if (id && selectedFile) {
      await addAvatar(currentOperator._id, selectedFile, 'operator')
      await operatorStore.editOperator(currentOperator)
      navigate.push('/operators')
    } else if (newOperatorValidation) {
      await operatorStore.createNewOperator(
        omit(currentOperator, ['_id', 'assignedChats', 'avatar', 'phoneNumber'])
      )
      const newOperator = operatorStore.operators.find(
        (operator) => operator.email === currentOperator.email
      )
      if (newOperator && selectedFile) {
        await addAvatar(newOperator?._id, selectedFile, 'operator')
      }
      navigate.push('/operators')
    } else {
      setIsError(true)
      runWithDelay()
    }
  }

  if (loading) return <Loader />

  return (
    <>
      <BoardTitleNew
        title={id ? 'Add operator info' : 'Add new operator'}
        back
      />

      <div className={coachEditWrapperStyle}>
        <div className={coachEditBigBoxStyle}>
          <div className={coachEditAddPhotoStyle}>
            <span
              className={coachEditLinkPhotoStyle}
              onClick={() => inputFile.current.click()}
              onKeyPress={() => inputFile.current.click()}
              role="button"
              tabIndex={0}>
              {currentOperator.avatar || preview ? 'Change photo' : 'Add photo'}
            </span>
            <AvatarBig
              id={id}
              inputFile={inputFile}
              avatar={currentOperator.avatar}
              defaultAvatar={currentOperator.name.charAt(0)}
              setSelectedFile={setSelectedFile}
              preview={preview}
            />
          </div>

          <div className={coachEditSmallBoxStyle}>
            <div>
              <div className={labelStyle}>Name*:</div>
              <input
                type="text"
                className={inputStyle}
                placeholder="Operator's name"
                value={currentOperator.name}
                onChange={handleOperator('name')}
              />
            </div>
            <div className="mt-8">
              <div className={labelStyle}>Email*:</div>
              <input
                type="email"
                className={inputStyle}
                placeholder="Operator's email"
                value={currentOperator.email}
                onChange={handleOperator('email')}
              />
            </div>
            <div className="mt-8">
              <div className={labelStyle}>Type*:</div>
              <div>
                <button
                  onClick={() => {
                    setCurrentOperator({
                      ...currentOperator,
                      type: OperatorForChat.COACH,
                    })
                  }}
                  type="button"
                  className="font-bold border-b-2 border-dashed text-blue-600 border-blue-500 cursor-pointer">
                  coach
                </button>{' '}
                or{' '}
                <button
                  onClick={() => {
                    setCurrentOperator({
                      ...currentOperator,
                      type: OperatorForChat.ASSISTANT,
                    })
                  }}
                  type="button"
                  className="font-bold border-b-2 border-dashed text-blue-600 border-blue-500 cursor-pointer">
                  assistant
                </button>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className={inputStyle}
                  placeholder="Operator's type"
                  disabled
                  value={currentOperator.type}
                  onChange={handleOperator('type')}
                />
              </div>
            </div>
          </div>
        </div>

        {id && (
          <div className="w-2/5 mt-8">
            <div className={labelStyle}>Phone number:</div>
            <InputMask
              mask="+99999999999"
              type="text"
              className={inputStyle}
              placeholder="Operator's phone"
              value={currentOperator.phoneNumber || ''}
              onChange={handleOperator('phoneNumber')}
            />
          </div>
        )}

        <div className="mt-8">
          <div className={labelStyle}>Basic info:</div>
          <textarea
            className={textAreaClassName}
            placeholder="Basic information about operator"
            value={currentOperator.basicInfo}
            onChange={handleOperator('basicInfo')}
          />
        </div>

        {isError && (
          <div className={errorStyle}>You have not filled required* fields</div>
        )}

        <div className={btnsWrapperStyle}>
          <button className={addBtnStyle} type="button" onClick={handleSubmit}>
            Save
          </button>
          <button
            className={cancelBtnStyle}
            type="button"
            onClick={handleCancelSubmit}>
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default observer(OperatorNewEdit)
