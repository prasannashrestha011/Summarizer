"use client"
import React, { useEffect } from 'react'
import {useSession,signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {signOut} from 'next-auth/react'
import { Button } from '@mui/material'
import { useUserStore } from '@/app/stores/userStore'

const AuthBtn = () => {
    const {data:session}=useSession()
    const router=useRouter()
useEffect(()=>{
  if (session) {  
    console.log(session.accessToken)
  }
},[session])
  return (
    <div className=' bg-center bg-cover h-screen w-screen flex justify-center items-center'>
    
<button 
        className='bg-blue-700 text-blue-50 font-serif text-xl rounded-md mt-52'
        onClick={()=>signIn('google',{callbackUrl:"/"})}>
            Sign in with Github
        </button>
     
    </div>
  )
}



export const SignoutBtn = () => {
  return (
    <Button 
    className='bg-red-700 text-blue-50  text-medium w-24 rounded-md h-10 hover:bg-red-500'
    onClick={()=>signOut({callbackUrl:"/login"})}>
        Sign out
    </Button>
  )
}



export default AuthBtn