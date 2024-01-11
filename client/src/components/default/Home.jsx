import React from 'react'
import ProductScroll from './ProductScroll'

const Home = () => {
  return (
    <>
        <>
          <div className='max-w-[1600px] m-auto'>
          <h1 className='font-bold uppercase p-2 text-xl'>Category</h1>
          <div className=' w-full  m-auto mt-3 text-center max-w-[1600px] bg-blue-200 pt-5 pb-5'>            
             <ProductScroll/>
          </div>
          </div>
          <div className=' w-full border m-auto mt-3 text-center max-w-[1600px] '>
             <ProductScroll/>
          </div>
          <div className=' w-full border m-auto mt-3 text-center max-w-[1600px] '>
             <ProductScroll/>
          </div>
        </>
    </>
  )
}

export default Home