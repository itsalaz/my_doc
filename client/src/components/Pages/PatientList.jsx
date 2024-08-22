import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PatientCard from '../PatientCard'

function PatientList({ search }) {
  const [patients, setPatients] = useState([])
  const location = useLocation()

  useEffect(() => {
    fetch('/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])


  useEffect(() => {
    if(location.state?.newPatient) {
      setPatients((prevPatients) => [location.state.newPatient, ...prevPatients])
    }
  }, [location.state])

    const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id) => {
    let newList = patients.filter((patient) => patient.id != id)
    setPatients(newList)
  }

  return (
    <main className="patient-container">
      <div className="patient-list">
        <Link to='/newpatient'>
          <button className='new-patient-button'>Add New Patient</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} handleDelete={() => handleDelete(patient.id)}/>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
export default PatientList;

