import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Signup from './components/seller/Signup'
import Login from './components/seller/Login'
import Dashboard from './components/seller/Dashboard'

const App = () => {
  return (
   <>
      <Router>
        <Routes>
          <Route path='/seller/signup' element={<Signup/>}/>
          <Route path='/seller/login' element={<Login/>}/>
          <Route path='/seller/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
   </>
  )
}

export default App