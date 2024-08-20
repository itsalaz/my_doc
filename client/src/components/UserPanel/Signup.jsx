import { useState } from 'react'

function Signup({setCurrentUser}) {

  // STATE //

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // EVENTS //

  function handleSubmit(e) {
    e.preventDefault()

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({username, password})
    })
    .then( res => {
      if (res.ok) {
        res.json()
        .then( data => setCurrentUser(data) )
      } else {
        res.json()
        .then( data => alert( data.error ) )
      }
    })
  }

  // RENDER //

  return (
    <form className='user-form' onSubmit={handleSubmit}>

      <h2>Signup</h2>

      <input type="text"
      onChange={e => setUsername(e.target.value)}
      value={username}
      placeholder='username'
      />

      <input 
      type="text"
      onChange={e => setPassword(e.target.value.toString())}
      value={password}
      placeholder='password'
      />

      <input type="submit"
      value='Signup'
      />

    </form>
  )

}

export default Signup