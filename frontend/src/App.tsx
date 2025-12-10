import React from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import { useAuth } from './context/AuthContext'



function App() {
  const {logout } = useAuth();

  const handleLogout = async () => {
    // Call the context logout
    await logout();
  }

  return (
    <React.Fragment>
      <h1>
        Main Page
      </h1>

      <Link to='/create-join-group'>Create or Join Group Page</Link>

      <button
        className='btn btn-error'
        onClick={handleLogout}
      >
      Logout
      </button>
    </React.Fragment>
  )
}

export default App;
