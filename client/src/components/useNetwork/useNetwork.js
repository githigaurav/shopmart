import axios from 'axios'
import { useState , useEffect} from 'react'
const networkPath = window.location.host === 'localhost:3000' ? "http://localhost:3001" : "https://shopmart-server.vercel.app"
export const useAxios = async (
    type,
    networkURL,
    data
    )=>{
 
        return  await axios[type](`${networkPath}/${networkURL}`, JSON.stringify(data) , {headers:{"Content-Type":"application/json"}, withCredentials:true} )

    }

export const getDashboard = ()=>{
    const [data, setData]=useState([])
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState('')


    useEffect(()=>{
        ;(async()=>{
            try {
                setError('')
                setLoading(true)
                const respnse  = await axios.get(`${networkPath}/seller/dashboard` ,{withCredentials:true})
                setData(respnse?.data.data)
            } catch (error) {
                setLoading(true)
                setError(error?.response?.data?.message)                   
            }finally{
                setLoading(false)
            }
        })()        
    },[])

    return [data, loading , error]
}