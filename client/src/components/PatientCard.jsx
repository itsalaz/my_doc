import React from 'react'
import { Link } from 'react-router-dom'



function PatientCard({patient}) {
  return(
    
    <div className='patient-card'>
      <Link to={`/patients/${patient.id}`}>
          <div>
            <h3>{patient.name}</h3>
            
          </div>
      </Link>
    </div>

  
  )
}

export default PatientCard