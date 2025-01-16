import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token){
            navigate('/user/login')
        }
    }, [token, navigate])

    return(
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
