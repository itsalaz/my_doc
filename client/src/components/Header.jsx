import React, { useState } from 'react'
import NavBar from './NavBar'
import UserDetails from './UserPanel/UserDetails' // confirm 


function Header() {

  return (
    <>
    <NavBar />
    <header className='header'>
      <UserDetails />
      <span className='header-logo'>
        <img src='logo.png' alt='company-logo' />
      </span>
    </header>
    </>
  )

}

export default Header 