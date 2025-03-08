"use client"
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

import React from 'react'

const Get_started = () => {
    const router=useRouter()
  return (
    <div className='flex justify-center items-center'>
     <Button

  variant="outlined"
  onClick={() => router.push("/chat")}
  sx={{ borderColor: 'gray', color: 'white',fontWeight:400,fontFamily:'inherit', '&:hover': { borderColor: 'white', backgroundColor: 'black' } }}
>
  Get started
</Button>

    </div>
  )
}

export default Get_started