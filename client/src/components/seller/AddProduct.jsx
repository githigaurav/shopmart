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

import Animation from './../animation/Animation'
const AddProduct = () => {
    const[file, setFile]=useState(null)
    if(file !== undefined && file !==null){
        console.log(file["length"])
    }
  return (
    <>  
        <Animation>
          <div className='flex w-full items-center justify-center'>
              <Card className="w-full max-w-[40rem] flex flex-col p-2 ">
                  <div className='flex'>
                      <div className="flex w-72 flex-col gap-6 p-2 m-2 mx-10">
                          <Input variant="standard" label="Product Name" placeholder="" />
                          <Input variant="standard" label="Brand" placeholder="" />
                          <Input variant="standard" label="Price" placeholder="" />
                          <Select label="Select Category">
                              <Option>Shoes</Option>
                              <Option>Clothes</Option>
                          </Select>
                          <Select label="Select Sub-Category">
                              <Option>Man Shoes</Option>
                              <Option>Kids Shoes</Option>
                              <Option>Female Shoes</Option>
                          </Select>
                          <Select label="Return Policy">
                              <Option>7 Days</Option>
                              <Option>15 Days</Option>
                          </Select>
                          <Select label="Warranty">
                              <Option>6 Months</Option>
                              <Option>12 Months</Option>
                          </Select>
                          <Select label="Payment Method">
                              <Option>Cash on delivery</Option>
                              <Option>Online</Option>
                              <Option>Both</Option>
                          </Select>

                      </div>
                      <div className='flex w-72 flex-col gap-6 p-2 m-2 mx-10'>
                          <Select label="Discount">
                              <Option>10%</Option>
                              <Option>20%</Option>
                              <Option>50%</Option>
                          </Select>

                          <Input variant="standard" label="Quantity" placeholder="" />
                          <Textarea label="Product Discription" resize={true} />
                          <div>
                              <Upload
                                  uploadLable="Upload file"
                                  onFileUpload={(file) => setFile(file)}
                                  uploadStyle="max-w-[256px] max-h-[250px] py-20 text-center"
                                  file={file !== null && file !== undefined && file["length"] === 1 ? (URL.createObjectURL(file[0])) : null}
                              />
                          </div>
                      </div>
                  </div>
                  <Button>Upload</Button>
              </Card>
          </div>
          </Animation>
            
    </>
  )
}

export default AddProduct