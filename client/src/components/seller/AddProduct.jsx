import React, { useState } from 'react'
import {
    Button,
    Card,
    Input,
    Option,
    Select,
    Textarea
} from '@material-tailwind/react'
import Upload from './Upload'
import { addProduct } from '../validation/validation'
import Animation from './../animation/Animation'
import {useFormik} from 'formik'
import axios from 'axios'
const newCategory={
    shoes:["Male Shoes", "Female Shoes"],
    clothes:["male"]
}
import {ToastContainer , Zoom, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = (props) => {
    const[loading ,setLoding]=useState(false)
    const formik = useFormik({
        initialValues:{
            name:'' ,
            brand:'',
            price:'',
            category:'',
            subCategory:'',
            returnPolicy:'',
            warranty:'',
            paymentMethod:'',
            discount:'',
            quantity:'',
            discription:'',
            size:'',
            file:null
        },
        validationSchema:addProduct,
        onSubmit:async (value)=>{      
            setLoding(true)     
            const id= toast.loading("please wait") 
          try {
              const data = {...value, file: value.file[0]}
              const response = await  axios.post("http://localhost:3001/seller/addproduct", data , {headers: {'Content-Type': 'multipart/form-data'} , withCredentials:true})
              toast.update(id, {render:response?.data?.message, type:'success', isLoading:false })
              formik.handleReset()
          } catch (error) {
            setLoding(true)
            toast.update(id, {render:error?.response.data?.message, type:'error', isLoading:false })  
            
          } finally{
            setTimeout(()=>{
                setLoding(false)
                toast.dismiss(id)
              },2000)
          }
        }
    })

    console.log(props)
  return (
    <>  
         <ToastContainer
             hideProgressBar={false}
             position="top-center"
             closeOnClick
             transition={Zoom}                     
        />
        <Animation>
    
          <div className='flex items-center justify-center'>
              <Card className="w-full max-w-[40rem]  px-5 py-10 sm:px-10 sm:py-10   gap-5 rounded-md ">
                  <div className='flex flex-col sm:flex-row gap-10 items-center justify-center'>
                      <div className="flex flex-col gap-5 w-full">
                      {/* bug fixed , in order to do touched function work proerply you have to use it erro props as well so that components know well there is an error */}
                          <Input variant="standard" label={formik.touched.name && formik.errors.name  ? `${formik.errors.name}`: "Product Name"} placeholder="" name='name' onChange={formik.handleChange} error={formik.touched.name && formik.errors?.name ? true : false} onBlur={formik.handleBlur} />
                          <Input variant="standard" label={formik.touched.brand && formik.errors.brand ? `${formik.errors.brand}`: "Brand"} placeholder="" name='brand'  onChange={formik.handleChange} error={formik.touched.brand && formik.errors?.brand ? true : false} onBlur={formik.handleBlur} />
                          <Input variant="standard" label={formik.touched.price && formik.errors.price ? `${formik.errors.price}`: "Price"} placeholder="" name='price' onChange={formik.handleChange} error={formik.touched.price && formik.errors?.price ? true : false} onBlur={formik.handleBlur}   />
                          <Select label={formik.touched.category && formik.errors.category ? `${formik.errors.category}`: "Select Category"} name='category' onChange={(e)=>{formik.setFieldValue("category", e)}} error={formik.touched.category && formik.errors.category ? true : false} onBlur={formik.handleBlur} >
                              <Option value='shoes'>Shoes</Option>
                              <Option value='clothes'>Clothes</Option>
                          </Select>
                          <Select label={formik.touched.subCategory && formik.errors.subCategory ? `${formik.errors.subCategory}`: "Select Sub-Category"} name='subCategory' onChange={(e)=>{formik.setFieldValue("subCategory", e)}} error={formik.touched.subCategory && formik.errors.subCategory ? true : false} onBlur={formik.handleBlur} >
                              {formik.values.category && newCategory[formik.values.category].map((item, index)=>{
                                    return <Option value={item.toLowerCase()} key={index}>{item}</Option>
                                })}   
                          </Select>
                          <Select label={formik.touched.returnPolicy && formik.errors.returnPolicy ? `${formik.errors.returnPolicy}`: "Return Policy"} name='returnPolicy' onChange={(e)=>{formik.setFieldValue("returnPolicy", e)}} error={formik.touched.returnPolicy && formik.errors.returnPolicy ? true : false} onBlur={formik.handleBlur} >
                              <Option value='7'>7 Days</Option>
                              <Option value='15'>15 Days</Option>
                          </Select>
                          <Select label={formik.touched.warranty && formik.errors.warranty ? `${formik.errors.warranty}`: "warranty"} name='warranty' onChange={(e)=>{formik.setFieldValue("warranty", e)}} error={formik.touched.warranty && formik.errors.warranty ? true : false} onBlur={formik.handleBlur}>
                              <Option value='6'>6 Months</Option>
                              <Option value='12'>12 Months</Option>
                          </Select>
                          <Select label={formik.touched.paymentMethod && formik.errors.paymentMethod ? `${formik.errors.paymentMethod}`: "Payment Method"} name='paymentMethod' onChange={(e)=>{formik.setFieldValue("paymentMethod", e)}} error={formik.touched.paymentMethod && formik.errors.paymentMethod ? true : false} onBlur={formik.handleBlur}>
                              <Option value='online'>Online</Option>
                              <Option value='offline'>Offline</Option>
                          </Select>

                      </div>
                      <div className='flex flex-col gap-5 w-full'>
                          <Select label={formik.touched.discount && formik.errors.discount ? `${formik.errors.discount}`: "Discount"} name='discount' onChange={(e)=>{formik.setFieldValue("discount", e)}} error={formik.touched.discount && formik.errors.discount ? true : false} onBlur={formik.handleBlur}>
                              <Option value='10'>10%</Option>
                              <Option value='20'>20%</Option>
                              <Option value='50'>50%</Option>
                          </Select>

                          <Select label={formik.touched.size && formik.errors.size ? `${formik.errors.size}`: "Size"} name='size' onChange={(e)=>{formik.setFieldValue("size", e)}} error={formik.touched.size && formik.errors.size ? true : false} onBlur={formik.handleBlur}>
                              <Option value='m'>M</Option>
                              <Option value='l'>L</Option>
                              <Option value='xl'>XL</Option>
                              <Option value='xxl'>XXL</Option>
                          </Select>

                          <Input variant="standard" label={formik.touched.quantity && formik.errors.quantity ? `${formik.errors.quantity}`: "Quantity"} placeholder="" name='quantity' onChange={formik.handleChange} error={formik.touched.quantity && formik.errors.quantity ? true : false} onBlur={formik.handleBlur} />
                          <Textarea label={formik.touched.discription && formik.errors.discription ? `${formik.errors.discription}`: "Discriptions"} resize={true} name='discription' onChange={formik.handleChange} error={formik.touched.discription && formik.errors.discription ? true : false} onBlur={formik.handleBlur}/>
                          <div className='flex justify-center'>
                              <Upload
                                  uploadLable="Upload file"
                                //   onFileUpload={(file) => setFile(file)}
                                 onFileUpload={(file) => formik.setFieldValue('file', file)}
                                  uploadStyle=" w-full h-fit"
                                //   file={file !== null && file !== undefined && file["length"] === 1 ? (URL.createObjectURL(file[0])) : null}
                                file={formik.values.file !== null && formik.values.file !== undefined && formik.values.file["length"] === 1 ? (URL.createObjectURL(formik.values.file[0])) : null}
                              />
                          </div>
                      </div>
                  </div>
                  <button className={`  text-white py-2 rounded-xl cursor-pointer hover:bg-blue-800 ${loading ? "bg-gray-600 hover:bg-gray-600 cursor-wait" :'bg-blue-600'}`} onClick={formik.handleSubmit} type='submit' disabled={loading ? true : false}>Upload</button>
              </Card>
          </div>
        </Animation>
            
    </>
  )
}

export default AddProduct