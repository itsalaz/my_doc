import React, { useState } from 'react'
import NavBar from './NavBar'


function Header() {

  return (
    <>
    <NavBar />
    <header className='header'>
      <span className='header-logo'>
        <img src='logo.png' alt='company-logo' />
      </span>
    </header>
    </>
  )

}

export default Header 