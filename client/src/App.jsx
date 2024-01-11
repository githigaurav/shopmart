import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Signup from './components/seller/Signup'
import Login from './components/seller/Login'
import Dashboard from './components/seller/Dashboard'
import PrivateRoutes from './PrivateRoutes'
import UserLogin from './components/user/Login'
import UserSignUp from './components/user/Signup'
import NavbarMenu from './components/default/Navbar'
import Home from './components/default/Home'



const App = () => {



  return (
   <>   
 
      <Router>
      <NavbarMenu/>
        <Routes>
         <Route path='/' element={<Home/>}/>
          <Route path='/seller/signup' element={<Signup/>}/>
          <Route path='/seller/login' element={<Login/>}/>
          <Route element={<PrivateRoutes/>}>
            <Route path="/seller/dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path='/user/login' element={<UserLogin/>}/>
          <Route path='/user/signup' element={<UserSignUp/>}/>
        </Routes>
      </Router>
   </>
  )
}

export default App