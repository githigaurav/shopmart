import axios from 'axios'
const networkPath=window.location.host === 'localhost:3000' ? "http://localhost:3001" : "https://shopmart-server.vercel.app"
export const useAxios = async (
    type,
    networkURL,
    data
    )=>{
 
        return  await axios[type](`${networkPath}/${networkURL}`, JSON.stringify(data) , {headers:{"Content-Type":"application/json"}, withCredentials:true} )

    }