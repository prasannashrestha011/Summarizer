"use client"
import React, { useEffect } from 'react'
import {useSession,signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {signOut} from 'next-auth/react'
import { Button } from '@mui/material'

const AuthBtn = () => {
    const {data:session}=useSession()
    const router=useRouter()
    useEffect(()=>{
      if(session?.accessToken){
        router.push("/home")
      }
    },[session,router])
  return (
    <div className='bg-[url("/images/bg2.png")] bg-center bg-cover h-screen w-screen flex justify-center items-center'>
      {session?.accessToken?(
        <p>...Navigating to the home page</p>
      ):(
<button 
        className='bg-blue-700 text-blue-50 font-serif text-xl rounded-md mt-52'
        onClick={()=>signIn(undefined,{callbackUrl:"/home"})}>
            Sign in with Github
        </button>
      )}
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