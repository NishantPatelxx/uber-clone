import React from 'react'
import { useEffect , useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainDataProvider'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token){
            navigate('/captain/login')
        }
    } , [token , navigate])
  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectWrapper

// import React from 'react'
// import { useEffect , useContext } from 'react'
// import { CaptainDataContext } from '../context/CaptainDataProvider'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const CaptainProtectWrapper = ( { children }) => {
//     const token = localStorage.getItem('token')
//     const navigate = useNavigate()
//     const {captainData , setCaptainData} = useContext(CaptainDataContext)
//     const [isloading , setIsLoading] = React.useState(true)
    
//     useEffect(() => {
//         if(!token){
//             navigate('/captain/login')
//         }
//         axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(response => {
//             if(response.status === 201){
//                 const data = response.data
//                 setCaptainData(data)
//                 setIsLoading(false)
//             }
//         }).catch(error => {
//             localStorage.removeItem('token')
//             navigate('/captain/login')
//         })
//     }
//     , [token , navigate])
//     if(isloading){
//         return <div>Loading...</div>
//     }
       

//   return (
//   <>
//     {children}
//   </>
//   )
// }

// export default CaptainProtectWrapper

