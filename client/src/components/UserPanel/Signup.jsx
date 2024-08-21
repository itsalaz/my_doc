// 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ setCurrentUser }) {

  // STATE //
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // EVENTS //
  function handleSubmit(e) {
    e.preventDefault();

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          throw new Error(data.error);
        });
      }
    })
    .then(data => {
      setCurrentUser(data);
      navigate('/');
    })
    .catch(error => {
      alert(error.message);
    });
  }

  // RENDER //
  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>

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
        value='Signup'
      />
      
      <p>Already have an account?</p>
      <Link to='/login'>
        <button className='loginbtn'  type="button">Login</button>
      </Link>
    </form>
  );
}

export default Signup;
