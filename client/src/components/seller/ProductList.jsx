import React from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
const ProductList = () => {
  return (
    <>
        <div>
        <Card>
            <List>
                <ListItem>
                <ListItemPrefix>
                    <Avatar variant="rounded" alt="candice" src={"/product.png"}  />
                </ListItemPrefix>
                <div className='flex gap-5 items-center'>
                    <Typography variant="h6" color="blue-gray">
                      Puma Shoes
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                    Brand Name
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                    Brand Name
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                    Brand Name
                    </Typography>
                </div>
                </ListItem>
                
            </List>
         </Card>
        </div>
    </>
  )
}

export default ProductList