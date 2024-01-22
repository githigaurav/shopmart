import React, { useCallback, useEffect } from 'react'
import{Card, Typography, Button, Avatar} from '@material-tailwind/react'
import {getData} from './../useNetwork/useNetwork'
const Orders = ({handleOrders}) => {
    const[data=[] , loading=false, error='']=getData('user/history')

    
    if(loading){
        return <h1> Data is being loaded</h1>
    }

    if(error){
        return <h1>Something went wrong</h1>
    }    
    handleOrders(data.length)

  return (
    <>
        <div className='flex w-full justify-center'>
                    <div className='flex flex-col gap-3 m-3 '>
                    {data.map(({ product,deliveryAddress , orderStatus , paymentStatus }, index) => {
            
                        return (
                        
                            <Card className="flex-row items-center p-2 gap-20" key={index}>
                            <Avatar src={product.file} alt="avatar" />
                            <Typography>{product.name}</Typography>
                            <Typography>{product.price}</Typography>
                            <Typography>{orderStatus}</Typography>
                            <Typography>{paymentStatus}</Typography>
                            <Button>Cancel Order</Button>
                            </Card>
                                    
                        )
                    })}

                    </div>
        </div>
    </>
  )
}

export default Orders