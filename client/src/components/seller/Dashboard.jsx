import React,{useState} from 'react'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
    Avatar,
    Input
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import AddProduct from './AddProduct';
const Dashboard = () => {
    const [open, setOpen] = useState(0);
    const [tab , setTab]=useState('addproduct')
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    

    return (
        <>
            <div className='flex overflow-hidden   '>
                <div>
                    <Card className="w-full max-w-[20rem] hidden rounded-none h-dvh sm:flex p-4 shadow-xl shadow-blue-gray-900/5">
                        <div className="mb-2 p-4 flex items-center w-full justify-center flex-col gap-5">

                            <div className="flex w-max items-end gap-4  ">
                                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" />
                            </div>
                            <Typography variant="h5" color="blue-gray">
                                Seller
                            </Typography>
                        </div>
                        <List>
                            <Accordion
                                open={open === 1}
                            // icon={
                            //     <ChevronDownIcon
                            //         strokeWidth={2.5}
                            //         className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                            //     />
                            // }
                            >
                                <ListItem className="p-0" selected={open === 1} onClick={()=>{setTab('dashboard')}}>
                                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <PresentationChartBarIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal" >
                                            Dashboard
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                {/* <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Analytics
                                        </ListItem>
                                    </List>
                                </AccordionBody> */}
                            </Accordion>
                            <Accordion
                                open={open === 2}
                                icon={
                                    <ChevronDownIcon
                                        strokeWidth={2.5}
                                        className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                                    />
                                }
                            >
                                <ListItem className="p-0" selected={open === 2}>
                                    <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                                        <ListItemPrefix>
                                            <ShoppingBagIcon className="h-5 w-5" />
                                        </ListItemPrefix>
                                        <Typography color="blue-gray" className="mr-auto font-normal">
                                            Products
                                        </Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="py-1">
                                    <List className="p-0">
                                        <ListItem onClick={()=>{setTab('addproduct')}}>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Add Products
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Pending Products
                                        </ListItem>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Products List
                                        </ListItem>
                                    </List>
                                </AccordionBody>
                            </Accordion>
                            <ListItem>
                                <ListItemPrefix>
                                    <InboxIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Orders
                                <ListItemSuffix>
                                    <Chip value="0" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
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
                            <ListItem>
                                <ListItemPrefix>
                                    <PowerIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Log Out
                            </ListItem>
                        </List>
                    </Card>
                </div>

                <div className='flex-1 p-3 '>
                    <div className='flex flex-col gap-2'>
                        <div className="bg-white rounded-md  flex justify-between items-center p-3  ">
                            <div className="flex">
                                <Input variant="standard" label="Standard" placeholder="Standard" />
                            </div>
                            <div className="relative inline-flex mx-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                </svg>
                                <span
                                    className="absolute min-w-[12px] min-h-[12px] rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center bottom-[14%] right-[14%] translate-x-2/4 translate-y-2/4 bg-red-500 text-white">
                                    10
                                </span>
                            </div>
                        </div>
                    <div className=''>
                        {/* render your component here  */}
                        {
                            tab === 'dashboard' ?   <h1>This is Dashboard</h1> :  
                            tab === 'addproduct' ? <AddProduct/> : null
                        }
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard