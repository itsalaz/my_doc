import React from 'react'
import { Link } from 'react-router-dom'


    function PatientCard({patient}) {
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
          </tr>
      )
    }
    export default PatientCard;
