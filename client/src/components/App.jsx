
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Appointments from './Pages/Appointments';
import PatientInfo from './Pages/PatientInfo';
import PatientList from './Pages/PatientList';
import NewPatient from './Pages/NewPatient';
import Login from './UserPanel/Login';
import Signup from './UserPanel/Signup';
import NavBar from './NavBar';
import UserDetails from './UserPanel/UserDetails';

function App() {
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/check_session')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Failed to check session');
      })
      .then(data => {
        setCurrentUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error checking session:', error);
        setLoading(false);
      });
  }, []);

  function handleLogout() {
    fetch('/api/logout', { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          setCurrentUser(null);
        } else {
          console.error('Failed to logout');
        }
      })
      .catch(error => console.error('Error logging out:', error));
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='app App'>
      <NavBar currentUser={currentUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={currentUser ? <UserDetails currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
        <Route path="/patients" element={currentUser ? <PatientList search={search} /> : <Navigate to="/login" />} />
        <Route path="/patients/:id" element={currentUser ? <PatientInfo /> : <Navigate to="/login" />} />
        <Route path="/newpatient" element={currentUser ? <NewPatient /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={currentUser ? <Appointments /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;



