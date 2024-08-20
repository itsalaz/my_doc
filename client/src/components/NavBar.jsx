

import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ currentUser, handleLogout }) {
  return (
    <nav role="navigation" className="navbar">
      
      {currentUser ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
         
          <h3 className='title'>DocAfile</h3>
         
        </>
      )}
    </nav>
  );
}

export default NavBar;

