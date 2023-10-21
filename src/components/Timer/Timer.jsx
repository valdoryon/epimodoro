import React, { useEffect, useState } from 'react'
import './Timer.css'
import { Navbar, EditTimer, Footer, Snow } from '../component-routes'

const Timer = ({ timerWorker }) => {
  // Estos estados guardan el valor del timer para actualizarlo
  const [seconds, setSeconds] = useState(!window.localStorage.getItem('s') ? 0 : window.localStorage.getItem('s'))
  const [minutes, setMinutes] = useState(!window.localStorage.getItem('m') ? 25 : window.localStorage.getItem('m'))
  const [hours, setHours] = useState(!window.localStorage.getItem('h') ? 0 : window.localStorage.getItem('h'))
  const [isRunning, setIsRunning] = useState(!window.localStorage.getItem('r?') ? false : window.localStorage.getItem('r?') === 'true')

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

    window.localStorage.setItem('r?', !isRunning)

    if (!isRunning === true) {
      startTimer()
    } else if (!isRunning === false) {
      stopTimer()
    }
  }

  const startTimer = () => {
    timerWorker.postMessage(['start', hours, minutes, seconds])
  }

  const stopTimer = () => {
    timerWorker.postMessage(['stop'])
  }

  const handleCallback = (seconds, minutes, hours) => {
    setSeconds(seconds)
    setMinutes(minutes)
    setHours(hours)

    setSavedSeconds(seconds)
    setSavedMinutes(minutes)
    setSavedHours(hours)

    timerWorker.postMessage(['start', hours, minutes, seconds])
    setIsRunning(true)
  }

  const handleResetClick = () => {
    setSeconds(savedSeconds)
    setMinutes(savedMinutes)
    setHours(savedHours)

    window.localStorage.setItem('h', savedHours)
    window.localStorage.setItem('m', savedMinutes)
    window.localStorage.setItem('s', savedSeconds)

    timerWorker.postMessage(['reset', savedHours, savedMinutes, savedSeconds])
  }

  const handleModifyClick = () => {
    setIsShown((isShown) => !isShown)
  }

  const handleAtZeroState = () => {
    setStopAtZero((stopAtZero) => !stopAtZero)
  }

  useEffect(() => {
    if (isRunning) {
      timerWorker.postMessage(['start', hours, minutes, seconds])
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      timerWorker.onmessage = (e) => {
        window.localStorage.setItem('h', e.data[1])
        window.localStorage.setItem('m', e.data[2])
        window.localStorage.setItem('s', e.data[3])

        setHours(e.data[1])
        setMinutes(e.data[2])
        setSeconds(e.data[3])
        setIsRunning(e.data[0])
        console.log(stopAtZero && hours === 0 && minutes === 0 && seconds === 0)

        if (stopAtZero && hours === 0 && minutes === 0 && seconds === 0) {
          handleStartClick()
        } else if (!stopAtZero && hours === 0 && minutes === 0 && seconds === 0) {
          handleResetClick()
        }
      }
    }
  }, [isRunning, seconds, minutes, hours])

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

              <span className='timer-num_text'>
                :
              </span>

              <span className='timer-numbers'>
                {(minutes < 10 ? '0' : '') + minutes}
              </span>

              <span className='timer-num_text'>
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
