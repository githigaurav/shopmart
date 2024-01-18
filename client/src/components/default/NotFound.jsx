import React from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate=useNavigate()
    return(
        <>
            {navigate("/")}
        </>
    )
}

export default NotFound