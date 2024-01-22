import React from 'react'
// import ProductScroll from './ProductScroll'
import { getData } from '../useNetwork/useNetwork';
import CardSkelton from './CardSkelton'
import ProductCard from './ProductCard'
import Footer from './Footer';
import Carosoul from './Carosoul';

const Home = () => {

  const[data=[] , loading=false, error='']=getData('home/products')
{  
  if(error){
   return <CardSkelton/>
  }
  if(loading){
    return  <CardSkelton/>
  }
}


  return (
    <>
        <>
          <div className='mt-5 flex flex-col  justify-center gap-4 w-full'>
                <div className='p-2 sm:p-0'>
                  <Carosoul/>
                </div>
                <div className='p-3'>
                  <h1 className='text-xl sm:text-3xl font-semibold text-blue-gray-800 '>MEDAL WORTHY BRANDS TO BAG </h1>
                </div>
                <div className='max-w-[1600px]  flex gap-2 m-auto flex-wrap items-center justify-center'> 
                    {/* <ProductScroll data={data}/>   */}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}    
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item} key={index}/>
                    })}
                </div>   
                <div className='w-full'>
                    <Footer/>
                </div>             
          </div>
          
        </>
    </>
  )
}

export default Home