import React from 'react'
import './Navbar.css'
import { RxLapTimer, RxTimer } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const PAGE_TITLE = 'Epimodoro'

  return (
    <header className='navbar-main_container'>
      <h1 className='navbar-title'>
        {PAGE_TITLE}
      </h1>
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
    </header>
  )
}

export default Navbar
