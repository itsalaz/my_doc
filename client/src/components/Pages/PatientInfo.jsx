import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


function PatientInfo() {
  const {id} = useParams()
  const [patient, setPatient] = useState({})

  useEffect(() => {
  fetch(`api/patients/${id}`)
  .then((res) => {
    if(res.ok) {
      res.json()
  .then((data) => setPatient(data))
  .catch(error => console.error('Error fetching patient:', error))
    }
  })
  }, [id])

  return (
 <div className='patient-info-container'>
  <h1>{patient.name}</h1>
    <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{patient.name}</td>
          </tr>
           <tr>
            <th>Date of Birth</th>
            <td>{patient.dob}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{patient.address}</td>
          </tr>
          <tr>
            <th>SSN</th>
            <td>{patient.ssn}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{patient.phone_number}</td>
          </tr>
      {/* <h3>SSN:{patient.ssn}</h3>
      <p>Address:{patient.address}</p>
      <p>Phone Number:{patient.phone_number}</p> */}
    
       </tbody>
    </table>
 </div>
  )
}

export default PatientInfo