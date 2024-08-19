import { useState, useEffect } from 'react'
import UserPanel from "./UserPanel"

function App() {

  const [currentUser, setCurrentUser] = useState(null) 

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/check_session')
    .then(res => {
      setLoading(false)
      if (res.status === 200) {
        res.json()
        .then(data => setCurrentUser(data))
      }
    })
  }, [])

  if (loading) {
    return <h1>LOADING.....</h1>
  }

  return (
    <div className="App">

      <h1>Doctifile</h1>

      <UserPanel currentUser={currentUser} setCurrentUser={setCurrentUser} />

    </div>
  );
}

export default App;