import React from 'react';
import './Navbar.css';
import { RxLapTimer, RxTimer } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='navbar-main_container'>
      <h1 className='navbar-title'>Epimodoro</h1>
      <ul className='sidebar-elements'>
        <li className='chrono-element'>
          <Link to='/' id='chrono-link' className='chrono-link'>
            <RxTimer className='icon' />
            <span>Temporizador</span>
          </Link>
        </li>
        <li className='chrono-element'>
          <Link to='/cronometro' id='chrono-link' className='chrono-link'>
            <RxLapTimer className='icon' />
            <span>Cronometro</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
