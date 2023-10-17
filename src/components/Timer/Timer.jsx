import React, { useEffect, useState } from 'react'
import './Timer.css'
import TimeWorker from './timer-worker?worker'
import { Navbar, EditTimer, Footer, Snow } from '../component-routes'

const Timer = () => {
  // Estos estados guardan el valor del timer para actualizarlo
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [hours, setHours] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Estos estados guardan el valor del timer para cuando reinicies
  // se mantenga el valor puesto dentro de la edicion
  const [savedSeconds, setSavedSeconds] = useState(0)
  const [savedMinutes, setSavedMinutes] = useState(25)
  const [savedHours, setSavedHours] = useState(0)

  // Estado que indica si el cartel de edicion se ve
  const [isShown, setIsShown] = useState(false)

  const [stopAtZero, setStopAtZero] = useState(true)

  const handleStartClick = () => {
    setIsRunning((isRunning) => !isRunning)
  }

  const handleCallback = (seconds, minutes, hours) => {
    setSeconds(seconds)
    setMinutes(minutes)
    setHours(hours)

    setSavedSeconds(seconds)
    setSavedMinutes(minutes)
    setSavedHours(hours)

    setIsRunning(true)
  }

  const handleResetClick = () => {
    setSeconds(savedSeconds)
    setMinutes(savedMinutes)
    setHours(savedHours)
  }

  const handleModifyClick = () => {
    setIsShown((isShown) => !isShown)
  }

  const handleAtZeroState = () => {
    setStopAtZero((stopAtZero) => !stopAtZero)
  }

  useEffect(() => {
    if (isRunning) {
      const timeWorker = new TimeWorker()
      timeWorker.postMessage('start')
      timeWorker.onmessage = (e) => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1)
          setSeconds(59)
        } else if (hours > 0) {
          setHours((hours) => hours - 1)
          setMinutes(59)
          setSeconds(59)
        }

        if (stopAtZero && hours === 0 && minutes === 0 && seconds === 0) {
          handleStartClick()
        } else if (!stopAtZero && hours === 0 && minutes === 0 && seconds === 0) {
          handleResetClick()
        }
      }
      return () => { timeWorker.terminate() }
    }
  }, [isRunning, seconds, minutes, hours, stopAtZero])

  return (
    <>
      <Navbar />
      <Snow />
      <section className='timer-wrapper'>
        <div className='timer-main_container'>
          <div className='timer-container'>
            <div className='timer-text'>
              <span className='timer-numbers'>
                {(hours < 10 ? '0' : '') + hours}
              </span>

              <span className='timer-numbers'>
                :
              </span>

              <span className='timer-numbers'>
                {(minutes < 10 ? '0' : '') + minutes}
              </span>

              <span className='timer-numbers'>
                :
              </span>

              <span className='timer-numbers'>
                {(seconds < 10 ? '0' : '') + seconds}
              </span>
            </div>
            <div className='timer-buttons_container'>
              <button onClick={() => handleStartClick()} className='timer-button'>{isRunning ? 'Parar' : 'Iniciar'}</button>
              <button onClick={() => handleResetClick()} className='timer-button'>Reiniciar</button>
              <button onClick={() => handleModifyClick()} className='timer-button'>Modificar</button>
            </div>
          </div>
        </div>
        {isShown && <EditTimer handleAtZeroState={handleAtZeroState} handleIsShownState={handleModifyClick} parentCallback={handleCallback} />}
      </section>
      <Footer />
    </>
  )
}

export default Timer
