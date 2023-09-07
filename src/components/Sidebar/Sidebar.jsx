import React from 'react'
import './Sidebar.css'
import { RxLapTimer, RxTimer } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar-main-container'>
      <ul className='sidebar-elements'>
        <li className='chrono-element'>
          <Link to='/temporizador' id='chrono-link' className='chrono-link'>
            <i className='chrono-icon'>
              <RxTimer className='icon' />
            </i>
            <span>Temporizador</span>
          </Link>
        </li>
        <li className='chrono-element'>
          <Link to='/cronometro' id='chrono-link' className='chrono-link'>
            <i className='chrono-icon'>
              <RxLapTimer className='icon' />
            </i>
            <span>Cronometro</span>
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar
