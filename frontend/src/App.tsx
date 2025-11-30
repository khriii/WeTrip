import React from 'react'
import './App.css'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <React.Fragment>
      <Navigate to={'/login'}></Navigate>
    </React.Fragment>
  )
}

export default App;
