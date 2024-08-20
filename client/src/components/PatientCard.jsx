import React from 'react'
import { Link } from 'react-router-dom'



function PatientCard({patient}) {
  return(
    
    <div className='patient-card'>
      <Link to={`/patients/${patient.id}`}>
           <h3>{patient.name}</h3>
       </Link>
    </div>
  )
}

export default PatientCard