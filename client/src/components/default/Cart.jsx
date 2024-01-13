import React, { useEffect } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import {addToCart, removeFromCart} from './../../dataCenter/slice/cartSlice'

const Cart = () => {
  const dispatch=useDispatch()
  const data = useSelector((state) => state.cart)
  const auth=Cookie.get('token')
  const TABLE_HEAD = ["Items", "Quantity", "Price", ""];
 
const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  
  {
    name: "Total",
    job: "25",
    date: "28,900",
  },
];
console.log(data)


  return (
    <>
      <div className='flex gap-3 w-full  justify-center mt-2 flex-col md:flex-row'>
        <div className='flex flex-col gap-3'>
         {data?.map((product, index)=>{
          const {_id ,name, price, file}=product
         
            return(
              <Card className="w-full flex flex-row max-w-[800px] min-w-[600px]  justify-between" key={index}>
              <CardHeader shadow={false} floated={false} className="h-[100px] w-[150px]  mt-0 mx-0 ">
                <img
                  src={file}
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody className='m-0 p-0 px-3 flex items-center justify-center '>
                <div className="flex items-center gap-10 justify-between">
                  <Typography color="blue-gray" className="font-medium">
                    {name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    {price}
                  </Typography>
                  {/* <Typography color="blue-gray" className="font-medium">
                    Quantity - $95.00 +
                  </Typography> */}
                </div>
              </CardBody>
              <CardFooter className="p-0 px-3 flex justify-center items-center">
                <Button
                  ripple={false}
                  fullWidth={true}
                  className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  onClick={()=>{dispatch(removeFromCart(_id))}}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
           
            )
         })}
        </div>
        <div>
          <div className=''>
            <Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ name, job, date }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {job}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date}
                          </Typography>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <CardFooter>
               {auth ?  <Button fullWidth>Checkout</Button> :  <Button fullWidth><Link to="/user/login">SignIn</Link></Button>}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart