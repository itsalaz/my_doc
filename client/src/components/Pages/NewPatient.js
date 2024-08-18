import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Header from './Header'
import { FormField, Input, Label } from '../styles'

function NewPatient() {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors ] = useState([])
  const history = useHistory()


  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [ssn, setSsn] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')


  function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    fetch('http://localhost:5555/patients', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify ({
        name,
        dob, 
        ssn, 
        email,
        address,
        phone_number
      }),
    }).then((res) => {
      setIsLoading(false)
      if(res.ok) {
        history.push('http:localhost:5555/patients')
      } else {
        res.json().then((err) => setErrors(err.errors))
      }
    })
  }


  return (
    <div>
      <Header/>
      <div className='create-patient-wrapper'>
      <h1>Create Patient</h1>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor='name'>Name</Label>
          <Input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor='dob'>Date of Birth</Label>
          <Input
          type='text'
          id='dob'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor='ssn'>Social Security Number</Label>
          <Input
            type='text'
            id='ssn'
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            />
        </FormField>
        <FormField>
          <Label htmlFor='email'>Email</Label>
          <Input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </FormField>
        <FormField>
          <Label htmlFor='address'>Address</Label>
          <Input
            type='text'
            id='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
        </FormField>
        <FormField>
          <Label htmlFor='phone-number'>Phone Number</Label>
          <Input
            type='text'
            id='phone-number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            />
        </FormField>
        <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Recipe"}
            </Button>
        </FormField>
        <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
      </form>
      </div>
    </div>
  )
}

export default NewPatient