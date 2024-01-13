import ProductCard from './ProductCard'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';

// import required modules
import { Pagination, FreeMode } from 'swiper/modules';
import { getData } from '../useNetwork/useNetwork';
const ProductScroll = () => {
  const[data=[] , loading=false, error='']=getData('home/products')

  if(error){
    <h1>Something went wrong</h1>
  }
  if(loading){
    <h1>Data is being loaded </h1>
  }
  console.log(data)
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        freeMode={true}
        //  pagination={{
        //    clickable: true,
        //  }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {data?.map((product, index)=>{
        
          return(
                  <SwiperSlide key={index}>
                     <ProductCard data={product} />
                 </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default ProductScroll