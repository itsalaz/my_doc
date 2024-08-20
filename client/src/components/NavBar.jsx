// import React from 'react'
// import { NavLink } from 'react-router-dom'


// function NavBar() {
//   return (
//     <>
//       <nav role="navigation" className="navbar">
//       <NavLink to="/"></NavLink>
//       <NavLink to="/appointments"></NavLink>
//       <NavLink to="/patients"></NavLink>
//       <NavLink to ="/patients/:id"></NavLink>
//       <NavLink to="/notes"></NavLink>
//     </nav>
//     </>
//   )
// }

// export default NavBar

import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar({ currentUser, handleLogout }) {
  return (
    <nav role="navigation" className="navbar">
      <NavLink to="/">Home</NavLink>
      {currentUser ? (
        <>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/appointments">Appointments</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Sign In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )}
    </nav>
  );
}

export default NavBar;

