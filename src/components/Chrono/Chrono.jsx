import React, { useEffect, useState } from 'react'

import './Chrono.css'
import ChronoWorker from './chrono-worker?worker'
import { Navbar, Footer, Snow } from '../component-routes'

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
      const timeWorker = new ChronoWorker()
      timeWorker.postMessage('start')
      timeWorker.onmessage = (e) => {
        setMiliSeconds((miliSeconds) => miliSeconds + 1)
        if (miliSeconds >= 99) {
          setSeconds((seconds) => seconds + 1)
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
    <>
      <Navbar />
      <Snow />
      <section className='timer-wrapper'>
        <div className='chrono-main_container'>
          <div className='chrono-container'>
            <div className='chrono-text_container'>
              <span className='chrono-text'>{(hours < 10 ? '0' : '') + hours}</span>
              <span className='chrono-text'>:</span>
              <span className='chrono-text'>{(minutes < 10 ? '0' : '') + minutes}</span>
              <span className='chrono-text'>:</span>
              <span className='chrono-text'>{(seconds < 10 ? '0' : '') + seconds}</span>
              <span className='chrono-text'>.</span>
              <span className='chrono-text'>{(miliSeconds < 10 ? '0' : '') + miliSeconds}</span>
            </div>
            <div className='chrono-buttons_container'>
              <button onClick={() => handleStartClick()} className='timer-button'>{isRunning ? 'Parar' : 'Iniciar'}</button>
              <button onClick={() => handleResetClick()} className='timer-button'>Reiniciar</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Chrono
