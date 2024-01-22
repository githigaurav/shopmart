import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import Signup from './components/seller/Signup'
import Login from './components/seller/Login'
import Dashboard from './components/seller/Dashboard'
import UserLogin from './components/user/Login'
import UserSignUp from './components/user/Signup'
// import NavbarMenu from './components/default/Navbar'
import Home from './components/default/Home'
import Cart from './components/default/Cart'
import Address from './components/default/Address'
import UserDashboard from './components/default/Dashboard'
import Cookies from 'js-cookie'
import Header from './components/default/Header'
const App = () => {

console.log(Cookies.get("token"))
  return (
   <>   
      <Router>
      {/* <NavbarMenu/> */}
      <Header/>
        <Routes>         
              <Route path='/' element={<Home/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/checkout' element={<Address/>}/>
              <Route path='/dashboard' element={<UserDashboard/>}/>         

              <Route path='/user/login' element={<UserLogin/>}/>
              <Route path='/user/signup' element={<UserSignUp/>}/>              

              <Route path='/seller/signup' element={<Signup/>}/> 
              <Route path='/seller/login' element={<Login/>}/> 
              <Route path="/seller/dashboard" element={<Dashboard/>}/>
              
              
            
        </Routes>
      </Router>
      
      <div className='fixed bottom-10 right-5'>
        <a href='/'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[50px] h-[50px] text-blue-800 bg-white rounded-full p-3 outline hover:bg-blue-600 hover:text-white hover:cursor-pointer">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
      </a>
      </div>
   </>
  )
}

export default App