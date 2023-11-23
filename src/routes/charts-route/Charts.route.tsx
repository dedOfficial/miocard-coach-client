import React, { FC, useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useHistory, useParams } from 'react-router-dom'
import Loader from 'components/loader/loader'
import { useReactToPrint } from 'react-to-print'
import classNames from 'classnames'
import { api } from 'services/api-client'
import Pill from '../../assets/pill.svg'
import NoPill from '../../assets/no-pill.svg'
import Smile from '../../assets/smiling.svg'
import Sad from '../../assets/sad.svg'
import Heart from '../../assets/heart.svg'
import './styles.scss'

const ChartsRoute: FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const printRef = useRef(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getTime() + 24 * 4 * 60 * 60 * 1000)
  )
  const [data, setData] = useState<any>(null)

  const [bpw, setBpw] = useState<boolean>(true)
  const [aha, setAha] = useState<boolean>(true)
  const [overall, setOverall] = useState<boolean>(true)
  const [complaints, setComplaints] = useState<boolean>(true)
  const [drugs, setDrugs] = useState<boolean>(true)

  useEffect(() => {
    async function getData() {
      const response = await api
        .get(`charts/${id}?sd=${startDate}&ed=${endDate}`, {})
        .json()
      setData(response)
    }
    getData()
  }, [endDate, id, startDate])

  if (!data) {
    return <Loader />
  }

  return (
    <>
      <header className="header">
        <div className="header__inner">
          <div className="header__buttons">
            <button
              type="button"
              onClick={() => {
                history.goBack()
              }}
              className="button button--secondary">
              Back
            </button>
            <button type="button" onClick={handlePrint} className="button">
              Download
            </button>
          </div>
          <div className="header__title">Chart dashboard {id}</div>
          <div className="header__date">
            <div className="header__date_inner">
              <span className="header__date_title">From:</span>
              <DatePicker
                className="header__date_select"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date)
                }}
                dateFormat="MMMM, d"
              />
            </div>
            <div className="flex">
              <span className="header__date_title">To:</span>
              <DatePicker
                className="header__date_select"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date)
                }}
                dateFormat="MMMM, d"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <div className="flex space-x-2 text-sm items-center justify-center">
            <button
              type="button"
              onClick={() => {
                setBpw(!bpw)
              }}
              className={classNames('tab', {
                'tab--inactive': !bpw,
              })}>
              Blood pressure and weight
            </button>
            <button
              type="button"
              onClick={() => {
                setAha(!aha)
              }}
              className={classNames('tab', {
                'tab--inactive': !aha,
              })}>
              AHA classification
            </button>
            <button
              type="button"
              onClick={() => {
                setOverall(!overall)
              }}
              className={classNames('tab', {
                'tab--inactive': !overall,
              })}>
              Overall
            </button>
            <button
              type="button"
              onClick={() => {
                setComplaints(!complaints)
              }}
              className={classNames('tab', {
                'tab--inactive': !complaints,
              })}>
              Complaints
            </button>
            <button
              type="button"
              onClick={() => {
                setDrugs(!drugs)
              }}
              className={classNames('tab', {
                'tab--inactive': !drugs,
              })}>
              Medication
            </button>
          </div>
        </div>
        <div ref={printRef} className="wrapper">
          {/* Chart 1 */}
          {bpw && (
            <div className="chart">
              <h2 className="chart__title">
                Blood pressure and body weight measurements
              </h2>
              <div className="chart__inner">
                <div className="chart__column">
                  <div className="w-24 flex flex-col">
                    <div>Morning</div>
                    <div className="text-gray-400">06:00–12:00</div>
                  </div>
                  <div className="chart__column chart__column--dense">
                    {data.bpw.morning.map((d) => (
                      <>
                        <div className="bg-yellow-200 chart__cell">
                          {d === 'taken' && (
                            <img
                              src={Heart}
                              className="w-3 h-3"
                              alt="Pressure"
                            />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="chart__column">
                  <div className="w-24 flex flex-col">
                    <div>Afternoon</div>
                    <div className="text-gray-400">12:00–17:00</div>
                  </div>
                  <div className="chart__column chart__column--dense">
                    {data.bpw.afternoon.map((d) => (
                      <>
                        <div className="bg-green-200 chart__cell">
                          {d === 'taken' && (
                            <img
                              src={Heart}
                              className="w-3 h-3"
                              alt="Pressure"
                            />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="chart__column">
                  <div className="w-24 flex flex-col">
                    <div>Evening</div>
                    <div className="text-gray-400">17:00–22:00</div>
                  </div>
                  <div className="chart__column chart__column--dense">
                    {data.bpw.evening.map((d) => (
                      <>
                        <div className="bg-blue-200 chart__cell">
                          {d === 'taken' && (
                            <img
                              src={Heart}
                              className="w-3 h-3"
                              alt="Pressure"
                            />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="chart__column">
                  <div className="w-24 flex flex-col">
                    <div>Night</div>
                    <div className="text-gray-400">22:00–06:00</div>
                  </div>
                  <div className="chart__column chart__column--dense">
                    {data.bpw.night.map((d) => (
                      <>
                        <div className="bg-purple-200 chart__cell">
                          {d === 'taken' && (
                            <img
                              src={Heart}
                              className="w-3 h-3"
                              alt="Pressure"
                            />
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="w-24" />
                  <div className="chart__dates">
                    {data.dates.map((date) => (
                      <>
                        <div className="chart__dates_text">{date}</div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chart 2 */}
          {aha && (
            <div className="chart">
              <h2 className="chart__title">
                AHA Classification of Blood Pressure Indicators
              </h2>
              <div className="chart__inner chart__inner--dense">
                <div className="chart__column">
                  <div className="chart__aha-title">
                    <span className="bg-red-700 chart__circle" />
                    <div>Hypersensitive emergency</div>
                  </div>
                  <div className="flex flex-row space-x-1">
                    {data.aha.emergency.map((d) => (
                      <>
                        {d && (
                          <div className="bg-red-700 chart__cell">
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                        {!d && <div className="bg-red-700 chart__cell" />}
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="chart__aha-title">
                    <span className="bg-red-500 chart__circle" />
                    <div>High, hypertension stage 2</div>
                  </div>
                  <div className="flex flex-row space-x-1">
                    {data.aha.high_2.map((d) => (
                      <>
                        {d && (
                          <div className="bg-red-500 chart__cell">
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                        {!d && <div className="bg-red-500 chart__cell" />}
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="chart__aha-title">
                    <span className="bg-yellow-500 chart__circle" />
                    <div>High, hypertension stage 1</div>
                  </div>
                  <div className="flex flex-row space-x-1">
                    {data.aha.high_1.map((d) => (
                      <>
                        {d && (
                          <div className="bg-yellow-500 chart__cell">
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                        {!d && <div className="bg-yellow-500 chart__cell" />}
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="chart__aha-title">
                    <span className="bg-yellow-400 chart__circle" />
                    <div>Elevated</div>
                  </div>
                  <div className="flex flex-row space-x-1">
                    {data.aha.elevated.map((d) => (
                      <>
                        {d && (
                          <div className="bg-yellow-400 chart__cell">
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                        {!d && <div className="bg-yellow-400 chart__cell" />}
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="chart__aha-title">
                    <span className="bg-green-500 chart__circle" />
                    <div>Normal</div>
                  </div>
                  <div className="flex flex-row space-x-1">
                    {data.aha.normal.map((d) => (
                      <>
                        {d && (
                          <div className="bg-green-500 chart__cell">
                            <span className="w-3 h-3 rounded-full bg-white" />
                          </div>
                        )}
                        {!d && <div className="bg-green-500 chart__cell" />}
                      </>
                    ))}
                  </div>
                </div>

                <div className="chart__column">
                  <div className="w-40" />
                  <div className="chart__dates">
                    {data.dates.map((date) => (
                      <>
                        <div className="chart__dates_text">{date}</div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table 1 */}
          {overall && (
            <>
              <h2 className="chart__title">Overall average blood pressure</h2>
              <div className="pb-10">
                <div>
                  <span className="font-medium">Since monitoring began:</span>{' '}
                  {data.overall.start[0]}/{data.overall.start[1]}
                </div>
                <div>
                  <span className="font-medium">
                    {startDate.toISOString().slice(0, 10)} to{' '}
                    {endDate.toISOString().slice(0, 10)}:
                  </span>{' '}
                  {data.overall.average[0]}/{data.overall.average[1]}
                </div>
              </div>
            </>
          )}

          {/* Chart 3 */}
          {complaints && (
            <div className="chart">
              <h2 className="chart__title">Complaints indicators</h2>
              <div className="chart__inner">
                <div className="chart__block">
                  <h3 className="chart__subtitle">Cardiac CHF</h3>
                  <div className="chart__column chart__column--dense">
                    {data.cardiac.map((d: string) => (
                      <>
                        {d === 'none' && (
                          <div className="chart__icons">
                            <img
                              src={Smile}
                              alt="No complaints"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                        {d === 'has' && (
                          <div className="chart__icons">
                            <img
                              src={Sad}
                              alt="Has complaints"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="chart__dates">
                    {data.dates.map((date) => (
                      <>
                        <div className="chart__dates_text chart__dates_text--dense">
                          {date}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="chart__block">
                  <h3 className="chart__subtitle">
                    General complaints and secondary diseases
                  </h3>
                  <div className="chart__column chart__column--dense">
                    {data.nonCardiac.map((d: string) => (
                      <>
                        {d === 'none' && (
                          <div className="chart__icons">
                            <img
                              src={Smile}
                              alt="No complaints"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                        {d === 'has' && (
                          <div className="chart__icons">
                            <img
                              src={Sad}
                              alt="Has complaints"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="chart__dates">
                    {data.dates.map((date) => (
                      <>
                        <div className="chart__dates_text chart__dates_text--dense">
                          {date}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="chart__block">
                  <h3 className="chart__subtitle">
                    General psycho-emotional state
                  </h3>
                  <div className="chart__column chart__column--dense">
                    {data.moods.map((mood: string) => (
                      <>
                        {mood === 'good' && (
                          <div className="chart__icons">
                            <img
                              src={Smile}
                              alt="Good mood"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                        {mood === 'sad' && (
                          <div className="chart__icons">
                            <img
                              src={Sad}
                              alt="Sad mood"
                              className="chart__icons_image"
                            />
                          </div>
                        )}
                        {mood === 'none' && <div className="chart__icons" />}
                      </>
                    ))}
                  </div>
                  <div className="chart__dates">
                    {data.dates.map((date) => (
                      <>
                        <div className="chart__dates_text chart__dates_text--dense">
                          {date}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chart 4 */}
          {drugs && (
            <div className="chart">
              <h2 className="chart__title">Schedule of medication intake</h2>
              <div className="chart__inner">
                <div className="chart__column chart__column--dense">
                  {data.drugs.map((drug: string) => (
                    <>
                      {drug === 'not taken' && (
                        <div className="chart__icons">
                          <img
                            src={NoPill}
                            alt="Not taken meds"
                            className="chart__icons_image"
                          />
                        </div>
                      )}
                      {drug === 'taken' && (
                        <div className="chart__icons">
                          <img
                            src={Pill}
                            alt="Not taken meds"
                            className="chart__icons_image"
                          />
                        </div>
                      )}
                      {drug === 'none' && <div className="chart__icons" />}
                    </>
                  ))}
                </div>
                <div className="chart__dates">
                  {data.dates.map((date) => (
                    <>
                      <div className="chart__dates_text chart__dates_text--dense">
                        {date}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default ChartsRoute
