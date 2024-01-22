import React, { useEffect, useState } from 'react'
import { Input , Button } from '@material-tailwind/react'
import {address} from './../validation/validation'
import { useFormik } from 'formik'
import { useDispatch , useSelector } from 'react-redux'
import {addDeliveryAddress , addToCheckOut, clearCart} from './../../dataCenter/slice/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer , Zoom, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useAxios} from './../useNetwork/useNetwork'
const Address = () => {

    const data = useSelector((state)=> state.cart.checkout)
    const cart = useSelector((state) => state.cart.cart)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            houseNo:'',
            location:'',
            city:'',
            state:'',
            pinCode:''
        },
        validationSchema: address,
        onSubmit: async (values) => {
          const id= toast.loading("Please wait your order is being placed")
            try {              
            dispatch(addDeliveryAddress(values))  
            const response = await useAxios("post", "user/order", data, )
            toast.update(id, {render:response?.data?.message, type:'success', isLoading:false })
            console.log(response)
           setTimeout(()=>{
            dispatch(clearCart())
            navigate("/")
           },3000)
            } catch (error) {
              console.log('working')
                
                toast.update(id, {render:error.response?.data?.message, type:'error', isLoading:false })
            }finally{           
              setTimeout(()=>{
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
        <div className='w-full flex justify-center items-center mt-5 p-2'>
        <div className="w-full bg-white  max-w-2xl flex flex-col gap-5 py-20 px-10 rounded-xl items-center">
          <Input
            name="houseNo"
            variant="standard"
            label={formik.errors?.houseNo && formik.touched.houseNo ? formik.errors.houseNo : "House No"}
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.houseNo && formik.touched.houseNo ? true : false}
          />
            <Input
            name="location"
            variant="standard"
            label={formik.errors?.location && formik.touched.location ? formik.errors.location : "Location"}
            placeholder="Near Hill view aprtment"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.location && formik.touched.location ? true : false}
          />
            <Input
            name="city"
            variant="standard"
            label={formik.errors?.city && formik.touched.city ? formik.errors.city : "City"}
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.city && formik.touched.city ? true : false}
          />
          <Input
            name="state"
            variant="standard"
            label={formik.errors?.state && formik.touched.state ? formik.errors.state : "State"}
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.state && formik.touched.state ? true : false}
          />
          <Input
            name="pinCode"
            variant="standard"
            label={formik.errors?.pinCode && formik.touched.pinCode ? formik.errors.pinCode : "Pin Code"}
            placeholder="sample@gmail.com"
            size="lg"
            className="text-2xl"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors?.pinCode && formik.touched.pinCode ? true : false}
          />

          <Button color="blue" className="w-full" onClick={formik.handleSubmit} type='submit'> Place Order </Button>
         
    </div>
        </div>
    </>
  )
}

export default Address