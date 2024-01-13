import React from 'react'
import ProductScroll from './ProductScroll'

const Home = () => {
  return (
    <>
        <>
          <div className='max-w-[1600px] m-auto'>
          <h1 className='font-bold uppercase text-xl'>Category</h1>
          <div className=' w-full p-3  m-auto  text-center max-w-[1600px] border '>            
             <ProductScroll/>
          </div>
          </div>
          
        </>
    </>
  )
}

export default Home