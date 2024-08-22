import React from 'react'
import { Link } from 'react-router-dom'


    function PatientCard({patient, handleDelete}) {
      
      
      return(
          <tr>
            <td>
            <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
            </td>
            <td>
            <Link to={`/patients/${patient.id}`}>{patient.dob}</Link>
            </td>
            <td>
            <Link to={`/patients/${patient.id}`}>{patient.phone_number}</Link>
            </td>
            <td>
            <button onClick={handleDelete}>x</button>
            </td>
          </tr>
      )
    }
    export default PatientCard;
