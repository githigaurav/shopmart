import ProductCard from './ProductCard'
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';


import { Pagination, FreeMode } from 'swiper/modules';
// import product from './Data'

const ProductScroll = (props) => {

  const data = props.data || []

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
            
                  <SwiperSlide key={index} className='flex gap-2'>
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                     <ProductCard data={product} />
                 </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default ProductScroll