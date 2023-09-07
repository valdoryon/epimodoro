import React, { useEffect, useState } from 'react'
import './Chrono.css'

const Chrono = () => {
  // Estos estados guardan el valor del timer para actualizarlo
  const [miliSeconds, setMiliSeconds] = useState(0)
  const [seconds, setSeconds] = useState(59)
  const [minutes, setMinutes] = useState(59)
  const [hours, setHours] = useState(99)
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
      const interval = setInterval(() => {
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
      , 10)
      return () => clearInterval(interval)
    }
  }, [isRunning, seconds, minutes, hours, miliSeconds])

  return (
    <main className='timer-main_container'>
      <div className='timer-container'>
        <h1 className='timer-text'>
          {(hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds + '.' + (miliSeconds < 10 ? '0' : '') + miliSeconds}
        </h1>
        <div className='timer-buttons_container'>
          <button onClick={() => handleStartClick()} className='timer-button'>{isRunning ? 'PARAR' : 'INICIAR'}</button>
          <button onClick={() => handleResetClick()} className='timer-button'>REINICIAR</button>
        </div>
      </div>

    </main>

  )
}

export default Chrono
