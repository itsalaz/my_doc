import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PatientInfo({loading, setLoading}) {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const [isEditable, setIsEditable] = useState(false)
  const [inputValues, setInputValues] = useState ({})

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
        setInputValues(data)
        // setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        // setLoading(false);
      });
  }, [id, setInputValues]);


  const handleInputChange = (key, value) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const toggleEditMode = () => {
    setIsEditable(!isEditable)
  }



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patient) return <p>No patient data found</p>;


  return (
    <div className='patient-info-container'>
      <thead></thead>
      <h1>
      { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              patient.name
            )}
      </h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              patient.name
            )}
          </td>
          </tr>
          <tr>
            <th>Date of Birth</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
              />
            ) : (
              patient.dob
            )}
          </td>
          </tr>
          <tr>
            <th>Address</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              />
            ) : (
              patient.address
            )}
          </td>
          </tr>
          <tr>
            <th>SSN</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.ssn}
              onChange={(e) => handleInputChange('ssn', e.target.value)}
              />
            ) : (
              patient.ssn
            )}
          </td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
              />
            ) : (
              patient.phone_number
            )}
          </td>
          </tr>
        </tbody>
      </table>
      <button onClick={toggleEditMode}>
        { isEditable ? 'Save' : 'Edit Data'}
      </button>
    </div>
  );
}

export default PatientInfo;
