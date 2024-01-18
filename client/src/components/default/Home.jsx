import React from 'react'
// import ProductScroll from './ProductScroll'
import { getData } from '../useNetwork/useNetwork';
import CardSkelton from './CardSkelton'
import ProductCard from './ProductCard'
import Footer from './Footer';
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

console.log(data)
  return (
    <>
        <>
          <div className='mt-5 flex flex-col items-center justify-center gap-4'>
                <div className='max-w-[1600px]  flex gap-2 m-auto flex-wrap items-center justify-center'> 
                    {/* <ProductScroll data={data}/>   */}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}    
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                    {data.map((item , index)=>{
                      return <ProductCard data={item}/>
                    })}
                </div>   
                <div>
                    <Footer></Footer>
                </div>             
          </div>
          
        </>
    </>
  )
}

export default Home