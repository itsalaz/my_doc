import React from 'react';
import { NavLink } from 'react-router-dom';
import UserDetails from './UserPanel/UserDetails'


function NavBar({ currentUser, handleLogout }) {
  return (
    <nav role="navigation" className="navbar">
      
      {currentUser ? (
        <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
        </>
      ) : (
        <div className="parent-container">
          <h3 className='title'>Doctafile</h3>
        </div>
         
      )}
    </nav>
  );
}

export default NavBar;

