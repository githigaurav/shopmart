import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Carousel,
    IconButton
} from "@material-tailwind/react";
import { useSelector, useDispatch } from 'react-redux'
import {addToCart} from './../../dataCenter/slice/cartSlice'

const ProductCard = (props) => {

  const {_id, name, price , file}=props.data
  const dispatch = useDispatch()
    return (
        <>
          <Card className="w-[200px] max-w-[300px] min-w-[200px] ">
       <CardHeader shadow={false} floated={false} className="h-[150px]">
         <img
           src={file}
           alt="card-image"
           className="h-full w-full object-cover hover:scale-150 transition"
         />
       </CardHeader>
       <CardBody>
         <div className="mb-2 flex items-center justify-between">
           <Typography color="blue-gray" className="font-medium">
             {name}
           </Typography>
           <Typography color="blue-gray" className="font-medium">
             {price}
           </Typography>
         </div>
         {/* <Typography
           variant="small"
           color="gray"
           className="font-normal opacity-75"
         >
           With plenty of talk and listen time, voice-activated 
         </Typography> */}
       </CardBody>
       <CardFooter className="pt-0">
         <Button
           ripple={false}
           fullWidth={true}
           className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
           onClick={()=>{dispatch(addToCart(props.data))}}
         >
           Add to Cart
         </Button>
       </CardFooter>
        </Card>
        </>
    )
}

export default ProductCard