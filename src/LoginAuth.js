import React from 'react'
import { Outlet } from 'react-router-dom';
import { useEffect,useState } from 'react';

export default function LoginAuth() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
   
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])
  return (
    <>
    {
        isLoading
       ? <p>Loading...</p>
       : <Outlet />

    }
    
    </>
  )
}
