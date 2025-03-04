"use client"
import { TextField } from '@mui/material';

import React, { FormEvent, useState } from 'react'
import { SubmitText } from '../fetchers/SendText';

import { RotatingLines } from "react-loader-spinner";
import { RenderSummarizedResponse } from './type_writer';
const App_Input = () => {
    
    const [text,setText]=useState<string>("")
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [summarized_text,setSummarizedText]=useState<string>("")

    const [responseList,setResponseList]=useState<string[]>([])
    const handleSubmission=async(e:FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)

        setResponseList(prev => [...prev, "loading..."]);
        const response_text=await SubmitText(text)
        setSummarizedText(response_text)
        setIsLoading(false)

        setResponseList(prev=>[...prev.slice(0,-1),response_text])
    }
  return (
    <div className=' flex-1 flex flex-col justify-between'>

      <div>
        <span>Summarizer</span>
      </div>
        <div className='  border overflow-y-scroll h-96 '>
         {responseList.map((response,idx)=>(
          <div key={idx} className='p-2'>
             {idx==responseList.length-1 && isLoading?(
             <RotatingLines
             strokeColor="grey"
             strokeWidth="5"
             animationDuration="0.75"
             width="26"
             visible={true}
           />
            ):(<RenderSummarizedResponse key={idx} text={response}/>)} 
          </div>
         ))}
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