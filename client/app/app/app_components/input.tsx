"use client"
import { TextField } from '@mui/material';

import React, { FormEvent, useState } from 'react'
import { SubmitText } from '../fetchers/SendText';
import RenderSummarizedResponse from './type_writer';

const App_Input = () => {
    const [text,setText]=useState<string>("")
    const [summarized_text,setSummarizedText]=useState<string>("")
    const handleSubmission=async(e:FormEvent)=>{
        e.preventDefault()
        const response_text=await SubmitText(text)
        setSummarizedText(response_text)
    }
  return (
    <div className=' flex-1 flex flex-col justify-between'>
        <div className=' flex-1 border'>
        {RenderSummarizedResponse(summarized_text)}
        </div>
  
        <form className='flex justify-center items-center h-28' onSubmit={handleSubmission}>
        <TextField type='text'
        value={text}
        onChange={(e)=>setText(e.target.value)}
        variant='outlined' className='w-8/12 ' 
        sx={{
            input: { color: "white" }, 
            "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "wheat" }, 
                "&:hover fieldset": { borderColor: "gray" }, 
                "&.Mui-focused fieldset": { borderColor: "blue" }, 
              },
          }}  />
        </form>
        
    </div>
  )
}

export default App_Input