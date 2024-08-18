import React, { useEffect, useState } from "react"
import PatientCard from '../PatientCard'

export default function PatientList({search}) {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState([])

  useEffect(() => {
    fetch('/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching data:', error))
  }, [])


    const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <main className="patient-container">
        <ul className="patient-list">
          {filteredPatients.map(patient => (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Patient DOB</th>
                  <th>Patient SSN</th>
                </tr>
              </thead>
              <tbody>
              <PatientCard key={patient.id} patient={patient} />
              </tbody>
            </table>
          ))}
        </ul>
      </main>
      
    </>
  );
}