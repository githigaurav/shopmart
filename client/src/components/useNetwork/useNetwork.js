import axios from 'axios'

const networkPath="http://localhost:3001"
export const useAxios = async (
    type,
    networkURL,
    data
    )=>{
 
        return  await axios[type](`${networkPath}/${networkURL}`, JSON.stringify(data) , {headers:{"Content-Type":"application/json"}, withCredentials:true} )

    }