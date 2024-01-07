import React, { useEffect, useState } from 'react'
import {Card, Input} from '@material-tailwind/react'
const Profile = (props=[]) => {
  const data=props.data[0]
  console.log(data)
  return (
    <>
       <Card className="w-72">
          <Input label="name" />
       </Card>  
    </>
  )
}

export default Profile