import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from 'formik'
import { signupVal } from './../validation/validation'

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: signupVal,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  console.log(formik.values)
  return (
    <div className="flex items-center justify-center h-screen flex-col p-2">

      <div className="w-full max-w-2xl flex flex-col gap-5 px-3 py-10 bg-white h-fit items-center justify-center rounded-lg">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 text-blue-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>

        <div className="w-full max-w-2xl flex flex-col gap-5 p-3 items-center">
          <Input
            name="email"
            variant="standard"
            label={formik.errors?.email && formik.touched.email ? formik.errors.email : "Email"}
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.email && formik.touched.email ? true : false}
          />

          <Input
            name="password"
            variant="standard"
            type="password"
            label={formik.errors?.password && formik.touched.password ? formik.errors.password : "Password"}
            placeholder="*****"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.password && formik.touched.password ? true : false}
          />

          <Input
            name="confirmPassword"
            variant="standard"
            type="password"
            label={formik.errors?.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : "Confirm Password"}
            placeholder="*****"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.confirmPassword && formik.touched.confirmPassword ? true : false}

          />

          <Button color="blue" className="w-full"> Signup </Button>
          <Typography>Already have an account ?  <NavLink to={"/seller/login"} className="text-blue-300 ">Logn</NavLink></Typography>
        </div>
      </div>
    </div>
  );
};

export default Signup;
