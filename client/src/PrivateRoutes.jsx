import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'
const PrivateRoutes = () => {
    const [auth , setAuth]=useState(Cookie.get("token"))
   
  return (
    <>
        {auth !==undefined ? <Outlet/> : <Navigate to="seller/login"/>}
    </>
  )
}

export default PrivateRoutes