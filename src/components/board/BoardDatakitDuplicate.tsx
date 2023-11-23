import React, { FC, useRef } from 'react'
import { classnames } from 'tailwindcss-classnames'

import ModalPopup from '../modals/components/popup'
import GroupButtons from '../controls/submitCancelGroupBtn'
import useCloseByClickOutside from '../../hooks/useCloseByClickOutside'

const inputStyle = classnames(
  'border',
  'border-gray-300',
  'rounded-md',
  'p-2',
  'focus:outline-none',
  'focus:border-blue-400',
  'hover:border-blue-300',
  'transition'
)

type BoardDatakitDuplicateProp = {
  newDatakitNameState: string
  onClose: () => void
  onInputChange: (name: string) => void
  onSave: () => void
}

const BoardDatakitDuplicate: FC<BoardDatakitDuplicateProp> = ({
  onClose,
  newDatakitNameState,
  onInputChange,
  onSave,
}) => {
  const selectInputThenActive = (e) => {
    const t = e.target as HTMLInputElement
    t.select()
  }

  const setNewDatakitName = (e) => {
    onInputChange(e.target.value)
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useCloseByClickOutside({
    mainRef: modalRef,
    handler: onClose,
  })

  return (
    <ModalPopup ref={modalRef}>
      <div className="flex-col w-80 items-stretch py-7">
        <h1 className="font-bold">Duplicate data collection kit</h1>

        <div className="flex flex-col gap-1 mt-6">
          <span className="text-sm font-semibold">New kit name</span>
          <input
            type="text"
            id="data-kit-title"
            name="data-kit-title"
            placeholder="Data kit's title"
            className={inputStyle}
            onChange={setNewDatakitName}
            onFocus={selectInputThenActive}
            value={newDatakitNameState}
          />
        </div>
      </div>

      <hr className="w-11/12" />

      <GroupButtons
        onSubmit={onSave}
        onSubmitLabel="SAVE"
        onCancel={onClose}
        onCancelLabel="CANCEL"
      />
    </ModalPopup>
  )
}

export default BoardDatakitDuplicate
