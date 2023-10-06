import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TokenLogic = () => {
    const navigate=useNavigate()

const tokens=!localStorage.getItem("token")
if(tokens){
    return navigate('/logic')
}
 return tokens
}
