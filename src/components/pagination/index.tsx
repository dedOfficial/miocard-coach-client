import React, { FC } from 'react'

import accountStore from '../../store/accountStore/account.store'

import {
  paginationContainerStyle,
  paginationItemStyle,
  paginationPrevNextStyle,
} from './styles'

interface PaginationProps {
  countPerPage: number
  totalCount: number
  paginate: (newCurrent: number) => void
  currentPage: number
}

const Pagination: FC<PaginationProps> = ({
  countPerPage,
  totalCount,
  paginate,
  currentPage,
}) => {
  const { currentChatPage } = accountStore.userOptions

  const pageNumbers: number[] = []
  for (let i = 1; i <= Math.ceil(totalCount / countPerPage); i += 1) {
    pageNumbers.push(i)
  }

  function paginateByStep(step: number) {
    let newCurrent = currentPage + step
    if (newCurrent > pageNumbers.length || newCurrent < 1) {
      newCurrent = currentPage
    }
    paginate(newCurrent)
  }

  return (
    <div className="flex justify-center">
      <nav className={paginationContainerStyle} aria-label="Pagination">
        <button
          type="button"
          className={paginationPrevNextStyle}
          onClick={() => paginateByStep(-1)}>
          <span className="sr-only">Previous</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {pageNumbers.map((num) => (
          <button
            key={`${totalCount}-${currentPage}-${num}`}
            type="button"
            aria-current="page"
            className={
              num === currentChatPage
                ? `${paginationItemStyle} font-semibold text-gray-700`
                : paginationItemStyle
            }
            onClick={() => paginate(num)}>
            {num}
          </button>
        ))}

        <button
          type="button"
          className={paginationPrevNextStyle}
          onClick={() => paginateByStep(1)}>
          <span className="sr-only">Next</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination
