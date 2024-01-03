import React from 'react'
import {motion} from 'framer-motion'

const animate ={

    initial:{opacity:0, y:100},
    animate:{opacity:1, y:0},
    exit:{opacity:0, x:-100},
}
function Animation({children}) {
  return (
    <>
        <motion.div transition={{duration:0.5}} variants={animate} initial="initial" animate="animate" exit="exit" style={{width:'100%'}}  >
                {children}
        </motion.div>
    </>
  )
}

export default Animation