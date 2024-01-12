import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,

} from "@material-tailwind/react";
import ListSkelton from './skelton/List';
import axios from 'axios'
import Animation from './../animation/Animation'

const Orders = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    if (!data.length) {
      ; (async () => {
        try {
          setLoading(true)
          setError('')
          const response = await axios.get('http://localhost:3001/seller/orders', { withCredentials: true },)
          setData(response?.data.data)
        } catch (error) {
          setLoading(true)
          setError(error?.response?.data?.message)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [])


  if (loading) {
    return <ListSkelton />
  }
  if (error) {
    return <h1>Something went wrong please retry</h1>
  }
  console.log(data)
  return (
    <>
     <Animation>
      <div className='flex flex-col gap-2 '>

        {data?.map((item, index) => {
          const {deliveryAddress , product , orderStatus , paymentStatus} = item
          return (
            <Card className="w-full flex flex-col justify-center items-center md:flex-row min-w-[350px] overflow-hidden " key={index}>
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0  shrink-0 rounded-r-none"
              >
                <img
                  src={product.file}
                  alt="card-image"
                  className="h-fit w-full object-cover max-w-[300px] min-w-[250px] bg-contain p-2 "
                />
              </CardHeader>
              <CardBody className='w-full flex justify-between min-w-[250px]'>
               <div className='flex-1 p-1'>
               <Typography variant="h6" color="gray" className="mb-4 uppercase">
                  {product.brand}
                </Typography>
                <div className='flex gap-2'>
                    <Typography variant="h6" color="gray" className=" ">
                      {product.category} /
                    </Typography>
                    <Typography variant="h6" color="gray" className=" ">
                      {product.subCategory}
                    </Typography>
                  </div>
                  <Typography variant="h4" color="blue-gray" className="mb-2 uppercase">
                  {product.name}
                  </Typography>
               <div className='flex gap-2 mb-2'>
                  <Typography color="gray" className=" font-normal">    
                    {product.price} Rs.
                    </Typography>
                  <Typography color="gray" className=" font-normal text-green-600 ">    
                  {product.discount} %
                  </Typography>
               </div>              
                  <Typography color="gray" className=" font-normal ">    
                  {deliveryAddress.city}
                  </Typography>
                  <Typography color="gray" className=" font-normal ">    
                  {deliveryAddress.state} Month warranty 
                  </Typography>
                  <Typography color="gray" className=" font-normal ">    
                  {deliveryAddress.location}
                  </Typography>
              
               </div>
               <div className='flex flex-col gap-2'>
                <Button onClick={() => setUpdate((prev)=> !prev)}>Edit</Button>
                <Button>Delete</Button>
               </div>
              </CardBody>
            </Card>
          )
        })}

      </div>
      </Animation>
    </>
  )
}

export default Orders