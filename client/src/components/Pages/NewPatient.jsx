import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPatient({ handleAddPatient}) {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    ssn: '',
    email: '',
    address: '',
    phone_number: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch('/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(err => {
            setErrors(err.errors || ['Failed to add patient']);
            throw new Error('Failed to add patient');
          });
        }
      })
      .then(newPatient => {
        handleAddPatient(newPatient); // Call the onAddPatient prop
        navigate('/patients');
      })
      .catch(error => {
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
              name='name'
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className='new-form-group'>
            <label htmlFor='dob'>Date of Birth:</label>
            <input
              type='date'
              id='dob'
              name='dob'
              value={form.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className='new-form-group'>
            <label htmlFor='ssn'>SSN:</label>
            <input
              type='text'
              id='ssn'
              name='ssn'
              value={form.ssn}
              onChange={handleChange}
              required
            />
          </div>
          <div className='new-form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='new-form-group'>
            <label htmlFor='address'>Address:</label>
            <input
              type='text'
              id='address'
              name='address'
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className='new-form-group'>
            <label htmlFor='phone_number'>Phone Number:</label>
            <input
              type='text'
              id='phone_number'
              name='phone_number'
              value={form.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit'>
            {isLoading ? 'Adding...' : 'Add Patient'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPatient;



