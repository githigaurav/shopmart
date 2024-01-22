import React from 'react'
import images from './Gallery';
import { Carousel } from "@material-tailwind/react";
const Carosoul = () => {
  return (
    <>
        <Carousel
      className=""
      autoplay={true}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {images?.map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      
     {images.map((image, index)=>{
        return  <img
        src={image}
        alt={`image ${index}`}
        className="h-full w-full object-cover"
      />
     })}
    </Carousel>
    </>
  )
}

export default Carosoul