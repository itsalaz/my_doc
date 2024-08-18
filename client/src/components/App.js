import React, { useState } from "react"
import { Route } from "react-router-dom"
import Appointments from '../pages/Appointments'
import PatientInfo from '../pages/PatientInfo'
import Patients from '../pages/Patients'
import Header from './Header'


function App() {

const [search, setSearch] = useState('')


  
  return (
    <div>
      <main>
      <Header 
      setSearch={setSearch}
      search={search}
      />
      </main>
      <Route path="/login" element={<App search={search}/> } />
      <Route path="/" element={<Patients search={search} />} />
      <Route path="/patients" element={<Patients/>} />
      <Route path="patients/:id" element={<PatientInfo />} />
      <Route path="appointments" element={<Appointments />} />
    </div>
  )
}

export default App;
