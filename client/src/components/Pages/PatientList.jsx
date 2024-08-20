import React, { useEffect, useState } from "react"
import PatientCard from '../PatientCard'

export default function PatientList({ search }) {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch('/api/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])


    const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    
      <main className="patient-container">
        <div className="patient-list">
           <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                 </tr>
              </thead>
              <tbody>
              {filteredPatients.map(patient => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
              </tbody>
            </table>
          </div>
      </main>
    );
}