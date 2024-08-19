import React, { useState } from 'react'


function Signup({setCurrentUser}) {

  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    fetch('/api/users', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })

    .then((res) => {
      if(res.ok) {
        res.json()
        .then(data => setCurrentUser(data))
      } else {
        res.json()
        .then(data => alert(data.error))
      }
    })
  }

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input 
        type='text'
        onChange={e => setUsername(e.target.value)}
        value={username}
        placeholder='username'
      />
      <input type='text'
      onChange={e => setPassword(e.target.value)}
      value={password}
      placeholder='password'
      />
      <input 
      type='submit'
      value='signup'
      />
  
    </form>
  )
}

export default Signup