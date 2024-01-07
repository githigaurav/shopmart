import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Signup from './components/seller/Signup'
import Login from './components/seller/Login'
import Dashboard from './components/seller/Dashboard'
import PrivateRoutes from './PrivateRoutes'

const App = () => {
  return (
   <>
      <Router>
        <Routes>
          <Route path='/seller/signup' element={<Signup/>}/>
          <Route path='/seller/login' element={<Login/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/seller/dashboard" element={<Dashboard/>}/>
          </Route>
          {/* <Route path='/seller/dashboard' element={<Dashboard/>}/> */}
        </Routes>
      </Router>
   </>
  )
}

export default App