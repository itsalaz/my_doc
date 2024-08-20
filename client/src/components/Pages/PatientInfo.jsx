

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PatientInfo() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch patient data');
        }
      })
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!patient) return <p>No patient data found</p>;

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
        </tbody>
      </table>
    </div>
  );
}

export default PatientInfo;
