import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Appointments from './Pages/Appointments';
import PatientInfo from './Pages/PatientInfo';
import PatientList from './Pages/PatientList';
import NewPatient from './Pages/NewPatient'
import Login from './UserPanel/Login';
import Signup from './UserPanel/Signup';
import NavBar from './NavBar'
import UserPanel from './UserPanel'


function App() {

const [search, setSearch] = useState('')
const [currentUser, setCurrentUser] = useState(null)
const[loading, setLoading] = useState(true)

  
useEffect(() => {
  fetch('/api/check_session')
  .then(res => {
    setLoading(false)
    if(res.status === 200) {
      res.json()
      .then(data => setCurrentUser(data))
    }
  })
}, [])

if(loading) {
  return <h1>Loading...</h1>
}

  return (

    <div className='app App'>
      <h1>Doctifile</h1>
      <NavBar/>
      <UserPanel currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
          <Route path="/" element= {<Login setCurrentUser={setCurrentUser}/> } />
          <Route path="/users" element={<Signup setCurrentUser={setCurrentUser}/>} />
          <Route path="/patients" element={<PatientList search={search} />} />
          <Route path="/patients/:id" element={<PatientInfo />} />
          <Route path="/newpatient" element ={<NewPatient />} />
          <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </div>
  )
}

export default App;
