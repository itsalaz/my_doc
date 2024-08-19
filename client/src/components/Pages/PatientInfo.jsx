import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


function PatientInfo() {
  const {id} = useParams()
  const [patient, setPatient] = useState([])

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
    <>
    <div className='patient-info-container'>
      <h1>{patient.name}</h1>
      <h3>{patient.dob}</h3>
      <h3>{patient.ssn}</h3>
      <p>{patient.address}</p>
      <p>{patient.phone_number}</p>
    </div>
    </>
  )
}

export default PatientInfo