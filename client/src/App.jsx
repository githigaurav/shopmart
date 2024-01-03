import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Signup from './components/seller/Signup'
import Login from './components/seller/Login'

const App = () => {
  return (
   <>
      <Router>
        <Routes>
          <Route path='/seller/signup' element={<Signup/>}/>
          <Route path='/seller/login' element={<Login/>}/>
        </Routes>
      </Router>
   </>
  )
}

export default App