import React, { useState } from "react";
import {useAxios} from './../useNetwork/useNetwork'

import { Button, Input, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useFormik } from 'formik'
import { loginVal } from './../validation/validation'
import {ToastContainer , Zoom, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
const Login = () => {
  const navigate=useNavigate()
  const[loading ,setLoding]=useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginVal,
    onSubmit: async (values) => {
      setLoding(true)
      const id= toast.loading("Signing in please wait")
      try {     
        const response = await useAxios("post", "seller/login", values , )
        toast.update(id, {render:response?.data?.message, type:'success', isLoading:false })   
        !Cookie.get("token") ? window.localStorage.setItem("token",response?.data?.data[0].token) : null
        navigate("/seller/dashboard")    
      }catch (error) {
        setLoding(true)
        toast.update(id, {render:error?.response.data?.message, type:'error', isLoading:false }) 
      }finally{
        setTimeout(()=>{
          setLoding(false)
          toast.dismiss(id)
        },2000)
      }
    }
  })

  return (
    <>
        <ToastContainer
              hideProgressBar={false}
              position="top-center"
              closeOnClick
              transition={Zoom}                     
      />

      <div className="flex items-center justify-center h-screen flex-col p-2">
        <div className="w-full max-w-2xl flex flex-col gap-5 px-3 py-10 bg-white h-fit items-center justify-center rounded-lg">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <div className="w-full max-w-2xl flex flex-col gap-5 p-3 items-center">
            
            <Input
              variant="standard"
              label={formik.errors?.email && formik.touched.email ? formik.errors.email : "Email"}
              placeholder="sample@gmail.com"
              size="lg"
              className="text-2xl"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.email && formik.touched.email ? true : false}
            />

            <Input
              variant="standard"
              type="password"
              label={formik.errors?.password && formik.touched.password ? formik.errors.password : "Password"}
              placeholder="*****"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors?.password && formik.touched.password ? true : false}
            />

            <Button color="blue" className="w-full" onClick={formik.handleSubmit} disabled={loading? true : false}> Login </Button>
            <Typography>Already have an account ?  <NavLink to={"/seller/signup"} className="text-blue-300">Signup</NavLink></Typography>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
