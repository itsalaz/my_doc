

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PatientInfo({loading, setLoading}) {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState(false)
  const [inputValues, setInputValues] = useState ({
    name: '', 
    dob: '',
    ssn: '',
    email: '',
    address: '',
    phone_number:'',
  })

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
      })
      .catch(error => {
        setError(error.message);
        // setLoading(false);
      });
  }, [id]);


  const handleInputChange = (key, value) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value,
    }))
  }


  const handleSave = () => {
    fetch(`/api/patients/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputValues),
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      throw new Error('Failed to update patient data');
    })
    .then(updatedPatient => {
      setPatient(updatedPatient)
      setIsEditable(false)
    })
    .catch(error => {
      setError(error.message)
    })
  }

  const toggleEditMode = () => {
    if (isEditable) {
      handleSave()
    } else {
      setIsEditable(true)
    }
  }


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!patient) return <p>No patient data found</p>;


  return (
    <div className='patient-info-container'>
      <table>
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
        <tbody>
          <tr>
            <th>Name</th>
            <td>
            { isEditable ? (
              <input 
              name='name'
              type='text'
              value={inputValues.name || ''}
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
              value={inputValues.dob || ''}
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
              value={inputValues.address || ''}
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
              value={inputValues.ssn || ''}
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
              value={inputValues.phone_number || ''}
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
