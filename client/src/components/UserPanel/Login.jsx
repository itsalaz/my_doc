// import { useState } from 'react'
// import {link, useNavigate} from 'react-router-dom'

// function Login({ setCurrentUser }) {

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   function handleSubmit(e) {
//     e.preventDefault()

//     fetch('/api/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//       body: JSON.stringify( { username, password } )
//     })
//     .then( res => {
//       if (res.ok) {
//         res.json()
//         .then( data => { 
//           setCurrentUser(data)
//           navigate('/patients')
//         )}
//       } else {
//         alert('Invalid username or password')
//       }
//     })
//   }


//   return (
//     <form className='user-form' onSubmit={handleSubmit}>

//       <h2>Login</h2>

//       <input type="text"
//       onChange={e => setUsername(e.target.value)}
//       value={username}
//       placeholder='username'
//       />

//       <input type="text"
//       onChange={e => setPassword(e.target.value)}
//       value={password}
//       placeholder='password'
//       />

//       <input type="submit"
//       value='Login'
//       />
//      <Link to='/signup'>
//      <button>signup</button>
//      </Link>
//     </form>
//   )

// }

// export default Login
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      setCurrentUser(data);
      navigate('/patients');
    })
    .catch(error => {
      alert(error.message);
    });
  }

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="text"
        onChange={e => setUsername(e.target.value)}
        value={username}
        placeholder='Username'
      />

      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
        placeholder='Password'
      />

      <input
        type="submit"
        value='Login'
      />
      
      <Link to='/signup'>
        <button type="button" className="signup-button">Signup</button>
      </Link>
    </form>
  );
}

export default Login;

