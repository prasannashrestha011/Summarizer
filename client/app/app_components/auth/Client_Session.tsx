"use client"
import React, { useEffect } from 'react'

import {useSession} from 'next-auth/react'
import { SignoutBtn } from './AuthBtn'

const ClientSession = () => {
  
    const {data:session}=useSession()
    useEffect(()=>{
      console.log(session?.accessToken)
    },[session])
  return (
    <div className='flex justify-end  w-full border'>
        <div className='flex gap-2 justify-center items-center'>
        {session?.user?.image&&(
            <img src={session.user.image} className='w-8 rounded-full' alt={session.user.name as string} />
        )}
        
        </div>
        <SignoutBtn/>
        
  </div>
  )
}

export default ClientSession