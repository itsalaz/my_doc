import Signup from './Signup'
import Login from './Login'
import UserDetails from "./UserDetails"

function UserPanel({currentUser, setCurrentUser}) {



  if (!currentUser) { 

    return (
        
        <div className="flex-row">

          <Signup setCurrentUser={setCurrentUser} />

          <Login setCurrentUser={setCurrentUser} />

        </div>
    
    )

    } else { 
      
      return (
        <UserDetails currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )

    }

}

export default UserPanel
