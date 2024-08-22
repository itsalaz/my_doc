import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPatient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        dob,
        ssn,
        email,
        address,
        phone_number: phoneNumber,
      }),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => {
            setErrors(err.errors);
            throw new Error('Failed to add patient');
          });
        }
      })
      .then((newPatient) => {
        // Navigate to the patients page with the new patient data
        navigate('/patients', { state: { newPatient } });
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors(['Something went wrong! Please try again.']);
      });
  }

  


  return (
    <div>
      <div className='create-patient-wrapper'>
      <h1>Create Patient</h1>
      {errors.length > 0 && (
      <div className='error-messages'>
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='new-form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
          <div className='new-form-group'>
          <label htmlFor='dob'>Date of Birth</label>
          <input
          type='text'
          id='dob'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          />
          </div>
          <div className='new-form-group'>
          <label htmlFor='ssn'>SSN:</label>
          <input
            type='text'
            id='ssn'
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            />
          </div>
          <div className='new-form-group'>
          <label htmlFor='ssn'>Email:</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='new-form-group'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
            </div>
          <div className='new-form-group'>
          <label htmlFor='phone-number'>Phone Number:</label>
          <input
            type='text'
            id='phone-number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button color="primary" type="submit">
          {isLoading ? "Adding..." : "Add Patient"}
          </button>
      </form>
      </div>
    </div>
  )
}

export default NewPatient