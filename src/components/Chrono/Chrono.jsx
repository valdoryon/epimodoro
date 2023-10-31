import React, { useEffect, useState } from 'react'

import './Chrono.css'
import { Navbar, Footer, Snow } from '../component-routes'

const Chrono = ({ chronoWorker }) => {
  // Estos estados guardan el valor del chrono para actualizarlo
  const [miliSeconds, setMiliSeconds] = useState(!window.localStorage.getItem('c-ml') ? 0 : window.localStorage.getItem('c-ml'))
  const [seconds, setSeconds] = useState(!window.localStorage.getItem('c-s') ? 0 : window.localStorage.getItem('c-s'))
  const [minutes, setMinutes] = useState(!window.localStorage.getItem('c-m') ? 0 : window.localStorage.getItem('c-m'))
  const [hours, setHours] = useState(!window.localStorage.getItem('c-h') ? 0 : window.localStorage.getItem('c-h'))
  const [isRunning, setIsRunning] = useState(!window.localStorage.getItem('c-r?') ? false : window.localStorage.getItem('c-r?') === 'true')

  const handleResetClick = () => {
    chronoWorker.postMessage(['reset'])
  }

  const handleStartClick = () => {
    setIsRunning((isRunning) => !isRunning)

    if (!isRunning === true) {
      chronoWorker.postMessage(['start', hours, minutes, seconds, miliSeconds])
    } else if (!isRunning === false) {
      chronoWorker.postMessage(['stop'])
    }

    window.localStorage.setItem('c-r?', !isRunning)
  }

  // Verifica si el cronometro estaba en funcionamiento segun el valor guardado en el localstorage y lo inicia acorde.
  useEffect(() => {
    if (window.localStorage.getItem('c-r?') === 'true') {
      chronoWorker.postMessage(['start', hours, minutes, seconds, miliSeconds])
    }
  }, [])

  useEffect(() => {
    if (isRunning) {
      if (hours === 99 && minutes === 59 && seconds === 59 && miliSeconds === 99) {
        handleStartClick()
      }
      chronoWorker.onmessage = (e) => {
        window.localStorage.setItem('c-h', e.data[0])
        window.localStorage.setItem('c-m', e.data[1])
        window.localStorage.setItem('c-s', e.data[2])
        window.localStorage.setItem('c-ml', e.data[3])
        // El + es un unary operator para convertirlo en number y funcione el condicional.
        setHours(+e.data[0])
        setMinutes(+e.data[1])
        setSeconds(+e.data[2])
        setMiliSeconds(+e.data[3])
      }
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
              <span className='chrono-number'>{(hours < 10 ? '0' : '') + hours}</span>
              <span className='chrono-text'>:</span>
              <span className='chrono-number'>{(minutes < 10 ? '0' : '') + minutes}</span>
              <span className='chrono-text'>:</span>
              <span className='chrono-number'>{(seconds < 10 ? '0' : '') + seconds}</span>
              <span className='chrono-text'>.</span>
              <span className='chrono-number milli'>{(miliSeconds < 10 ? '0' : '') + miliSeconds}</span>
            </div>
            <div className='chrono-buttons_container'>
              <button onClick={handleStartClick} className='timer-button'>{isRunning ? 'Parar' : 'Iniciar'}</button>
              <button onClick={handleResetClick} className='timer-button'>Reiniciar</button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Chrono
