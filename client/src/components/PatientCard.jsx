import React from 'react'
import { Link } from 'react-router-dom'



function PatientCard({patient}) {
  return(
    <>
    <li className='patient-card'>
      <Link to={`/patients/${patient.id}`}>
          <div>
            <h3>{patient.name}</h3>
            <p>Date of Birth: {patient.dob}</p>
            <p>SSN:{patient.ssn}</p>
          </div>
      </Link>
    </li>

    </>
  )
}

export default PatientCard