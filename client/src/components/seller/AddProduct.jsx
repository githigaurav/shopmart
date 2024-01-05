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
    
  return (
    <>  
        <Animation>
          <div className='flex items-center justify-center'>
              <Card className="w-full max-w-[40rem] max-h-[700px] px-5 py-10 sm:px-10 sm:py-20 overflow-auto ">
                  <div className='flex flex-col sm:flex-row gap-10'>
                      <div className="flex flex-col gap-5">
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
                      <div className='flex flex-col gap-5'>
                          <Select label="Discount">
                              <Option>10%</Option>
                              <Option>20%</Option>
                              <Option>50%</Option>
                          </Select>

                          <Input variant="standard" label="Quantity" placeholder="" />
                          <Textarea label="Product Discription" resize={true} />
                          <div className='flex justify-center'>
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