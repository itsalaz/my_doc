import React from 'react'
import { Link } from 'react-router-dom'



function PatientCard({patient}) {
  return(
    <>
    <li className='patient-card'>
      <Link to={`/patients/${patient.id}`}>
          <tr>
            <th>{patient.name}</th>
            <th>{patient.dob}</th>
            <th>{patient.ssn}</th>
          </tr>
      </Link>
    </li>

    </>
  )
}

export default PatientCard