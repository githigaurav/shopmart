import React, { useState } from 'react'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
  Button ,

} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
 
} from "@heroicons/react/24/solid";
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import {ToastContainer , Zoom, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Orders from './Orders';


const Dashboard = () => {
  const[tab, setTab]=useState('orders')
  const [order , setOrder]=useState(0)
  const navigate = useNavigate()
  const handleLogout =()=>{
    Cookie.remove("token")
    Cookie.remove("role")
    const id = toast.success("Logout Successfully")
            setTimeout(()=>{
                toast.dismiss(id)
                navigate("/")
        },3000)
  }

 const handleOrders=(value)=>{
  setOrder(value)
 }

return (
    <>
             <ToastContainer
             autoClose={3000}
             hideProgressBar={false}
             position="top-center"
             closeOnClick={false}
             pauseOnHover={false}
             transition={Zoom}                     
            />
      <div className='flex'>
          <div className='hidden sm:block'>
                <Card className=" h-auto rounded-none w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                  <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                      Sidebar
                    </Typography>
                  </div>
                  <List>
                    <ListItem onClick={()=>{setTab('dashboard')}}>
                      <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Dashboard
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      E-Commerce
                    </ListItem>
                    <ListItem onClick={()=>{setTab('orders')}}>
                      <ListItemPrefix>
                        <InboxIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Orders
                      <ListItemSuffix>
                        <Chip value={order} size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                      </ListItemSuffix>
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Profile
                    </ListItem>
                    <ListItem>
                      <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Settings
                    </ListItem>
                    <ListItem onClick={handleLogout}>
                      <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      Log Out
                    </ListItem>
                  </List>
                </Card>
          </div>
          <div className='w-full'>
              {/* <Card className="m-2">
                <List>
                  <ListItem className='flex justify-around flex-col gap-2 md:flex-row h-fit'>
                    <ListItemPrefix>
                      <Avatar variant="circular" alt="candice" src={"./product.png"} className='w-[200px] sm:w-[250px] h-auto max-h-[300px] ' />
                    </ListItemPrefix>
                      <div className='flex flex-col gap-2 md:gap-4 lg:flex-row  items-center'>
                          <div>
                              <Typography variant="medium" color="gray" className="font-normal">
                                Product Name
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="small" color="gray" className="font-normal">
                                Product Status
                              </Typography>
                            </div>
                            <div>
                              <Button>Cancel</Button>
                            </div>
                      </div>
                  </ListItem>
                </List>
              </Card> */}

              {tab === 'orders' ? <Orders handleOrders={handleOrders} /> : null}
          </div>
      </div>
    </>
  )
}

export default Dashboard

