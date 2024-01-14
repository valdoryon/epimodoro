import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='navbar-main_container'>
      <h1 className='navbar-title'>Epimodoro</h1>
      <ul className='sidebar-elements'>
        <li className='chrono-element'>
          <Link to='/' id='timer-link' className='chrono-link'>
            <img src='/timer-icon.svg' className='icon' alt='timer icon' />
            <span>Temporizador</span>
          </Link>
        </li>
        <li className='chrono-element'>
          <Link to='/cronometro' id='chrono-link' className='chrono-link'>
            <img src='/chrono-icon.svg' className='icon' alt='chrono icon' />
            <span>Cronometro</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
