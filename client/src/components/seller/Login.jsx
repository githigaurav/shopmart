import React from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
const Login = () => {
  return (
    <>
 
      <div className="flex items-center justify-center h-screen flex-col p-2">
        <div className="w-full max-w-2xl flex flex-col gap-5 px-3 py-10 bg-white h-fit items-center justify-center rounded-lg">
       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-400">
         <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <div className="w-full max-w-2xl flex flex-col gap-5 p-3 items-center">
          <Input
            variant="standard"
            label="Email"
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
          />

          <Input
            variant="standard"
            type="password"
            label="Password"
            placeholder="*****"
          />

          <Input
            variant="standard"
            type="password"
            label="Confirm Password"
            placeholder="*****"
          />

          <Button color="blue" className="w-full"> Login </Button>
          <Typography>Already have an account ?  <NavLink to={"/seller/signup"} className="text-blue-300">Signup</NavLink></Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
