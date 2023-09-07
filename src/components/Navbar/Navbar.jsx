import React from 'react'
import './Navbar.css'

const Navbar = () => {
  const PAGE_TITLE = 'Epimodoro'

  return (
    <main className='navbar-main_container'>

      <h1 className='navbar-title'>
        {PAGE_TITLE}
      </h1>
    </main>
  )
}

export default Navbar
