import React from 'react'
import { NavLink } from 'react-router-dom'


function NavBar() {
  return (
    <>
      <nav role="navigation" className="navbar">
      <NavLink to="/"></NavLink>
      <NavLink to="/appointments"></NavLink>
      <NavLink to="/patients"></NavLink>
      <NavLink to ="/patients/:id"></NavLink>
      <NavLink to="/notes"></NavLink>
    </nav>
    </>
  )
}

export default NavBar