import { Badge, Button, Collapse, Input, Navbar, Typography } from '@material-tailwind/react'
import React from 'react'
import {Link, useLocation} from 'react-router-dom'
const path =["/seller","/user"]
import { useSelector, useDispatch } from 'react-redux'
import Cookie from 'js-cookie'

const Header = () => {
    const [openNav, setOpenNav] = React.useState(false)
    const cart = useSelector((state) => state.cart.cart)
    const location = useLocation()
    const shouldRenderNavbar = path.some(path => {
      return location.pathname.startsWith(path);  
    });


   const navLink = (
     <>     <Input
            variant='standard'
            placeholder='Product name...'
            label='Search'
            />
            <Link to="/cart" className='flex justify-center items-center'>
            <Badge content={cart?.length ? cart.length : 0}>
                <Button
                variant="text"
                className="flex mt-1 p-0 items-center justify-center gap-2 text-md font-normal hover:bg-transparent hover:text-blue-600  "
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                </svg>
                Cart
                </Button>
            </Badge>
            </Link>
            <div>         

                {
                     Cookie.get("token") === undefined || Cookie.get("token") === '' && !Cookie.get("role") === 'user' ?
                     <Link to="user/login">
                     <Button
                     variant="text"
                     className="flex m-0 p-0 items-center justify-center gap-2 text-md font-normal hover:bg-transparent hover:text-blue-600 w-fit"
                       >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                     Login
                     </Button>
                     </Link>
                   
                     :
                     <Link to="/dashboard">
                     <Button
                     variant="text"
                     className="flex m-0 p-0 items-center justify-center gap-2 text-md font-normal hover:bg-transparent hover:text-blue-600 w-fit"
                       >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                       </svg>
                     Dashboard
                     </Button>
                     </Link>
                   
                    }
                
            
            </div>
           <div>
            <Link to="/seller/login">
            <Button variant='outlined'>
                      Seller
            </Button>
            </Link>
            </div>
     </>
   );
   React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
  if(shouldRenderNavbar){
    return null
  }
  return (
    <>
   
        <div className='flex items-start sticky top-0 w-full z-50 bg-white'>
            <Navbar className='w-full max-w-full rounded-none bg-transparent'>
                <div className='flex items-center m-auto  justify-between max-w-[1200px] '>
                        <Typography
                        className="mr-4 cursor-pointer py-1.5 font-bold sm:text-md md:text-xl lg:text-2xl uppercase text-balance"
                        >
                    <Link to="/" className='text-black'>ShopMart</Link>
                    </Typography>
                    <div className="hidden lg:flex lg:gap-5  justify-center items-center">{navLink}</div>
                    <div className='text-black block lg:hidden cursor-pointer transition-all' onClick={()=>{setOpenNav((prev)=> !prev)}}>
                   
                    {openNav ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                   </svg>
                   
                      
                    ):
                    (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    )
                    
                    }
                    </div>
                  
                </div>
                <Collapse open={openNav} className='m-0 p-0 w-full max-w-full'>
                 <div className="container w-full  gap-5 flex flex-col items-start py-5">
                {navLink}
                </div>                    
                </Collapse>
          
            </Navbar>
        </div>
    </>
  )
}

export default Header