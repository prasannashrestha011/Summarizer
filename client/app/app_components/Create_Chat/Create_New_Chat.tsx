"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const New_Chat = () => {
    const router=useRouter()
  return (
    <div 
     onClick={()=>router.push('/chat/new')}
    className='font-poppins text-sm p-2 flex gap-2 items-center justify-start hover:bg-[#191c20] transition-colors duration-300'>
        <img src='/images/machine-learning.png' className='w-7 rounded-full' />
        <span>Echo bot</span>
    </div>
  )
}

export default New_Chat