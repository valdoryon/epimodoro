import React, { useEffect, useState } from 'react'

import './Chrono.css'
import ChronoWorker from './chrono-worker?worker'

const Chrono = () => {
  // Estos estados guardan el valor del chrono para actualizarlo
  const [miliSeconds, setMiliSeconds] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const handleResetClick = () => {
    setMiliSeconds(0)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
  }

  const handleStartClick = () => {
    if (hours === 99 && minutes === 59 && seconds === 59 && miliSeconds === 99) {
      setMiliSeconds(0)
      setSeconds(0)
      setMinutes(0)
      setHours(0)
      setIsRunning((isRunning) => !isRunning)
    } else {
      setIsRunning((isRunning) => !isRunning)
    }
  }

  useEffect(() => {
    if (isRunning) {
      const timeWorker = new ChronoWorker(/* webpackChunkName: "timeWorker" */ new URL('./chrono-worker.js', import.meta.url))

      timeWorker.onmessage = (e) => {
        setMiliSeconds((miliSeconds) => miliSeconds + 1)
        if (miliSeconds >= 99) {
          setSeconds((seconds) => seconds + e.data)
          setMiliSeconds(0)
        } else if (seconds === 60) {
          setMinutes((minutes) => minutes + 1)
          setSeconds(0)
          setMiliSeconds(0)
        } else if (minutes === 60) {
          setHours((hours) => hours + 1)
          setMinutes(0)
          setSeconds(0)
          setMiliSeconds(0)
        }
        if (hours === 99 && minutes === 59 && seconds === 59 && miliSeconds === 98) {
          setIsRunning(false)
        }
      }
      return () => timeWorker.terminate()
    }
  }, [isRunning, seconds, minutes, hours, miliSeconds])

  return (
    <section className='timer-wrapper'>
      <div className='chrono-main_container'>
        <div className='chrono-container'>
          <h1 className='chrono-text'>
            {(hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '.' + (miliSeconds < 10 ? '0' : '') + miliSeconds}
          </h1>
          <div className='chrono-buttons_container'>
            <button onClick={() => handleStartClick()} className='chrono-button'>{isRunning ? 'PARAR' : 'INICIAR'}</button>
            <button onClick={() => handleResetClick()} className='chrono-button'>REINICIAR</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chrono
