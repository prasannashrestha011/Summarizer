"use client"
import { TextField } from '@mui/material';

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { SubmitText } from '../fetchers/SendText';

import { RotatingLines } from "react-loader-spinner";
import { RenderSummarizedResponse } from './type_writer';
import { useSession } from 'next-auth/react';
interface summarize_type{
  user_text:string
  summarized_text:string 
}
const App_Input = () => {
    const {data:user}=useSession()
     
    const [text,setText]=useState<string>("")
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [summarized_text,setSummarizedText]=useState<string>("")

    const [responseList,setResponseList]=useState<summarize_type[]>([])

    const latestMessageRef=useRef<HTMLDivElement>(null)
    const handleSubmission=async(e:FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        if(!user?.accessToken) return
        setResponseList(prev => [...prev,{summarized_text:"loading...",user_text:"loading..."}]);
        
        const response_text=await SubmitText(text,user?.accessToken)
        setSummarizedText(response_text)
        setIsLoading(false)

        setResponseList(prev=>[...prev.slice(0,-1),{user_text:text,summarized_text:response_text}])
    }

    const scrollToBottom = () => {
      if (latestMessageRef.current) {
          latestMessageRef.current.scrollTo({
              top: latestMessageRef.current.scrollHeight,
              behavior: 'smooth'
            });
      }
    };
    useEffect(() => {
      scrollToBottom()
    }, [responseList, isLoading]);
  return (
    <div className=' flex-1 flex flex-col justify-between'>

      <div className='flex gap-2 justify-center items-center '>
        <img src='/images/machine-learning.png' className='w-8 h-8 ' draggable='false'/>
        <span className='w-fit   font-poppins text-4xl bg-gradient-to-b from-[#F1E6E6] to-[#666666] text-transparent bg-clip-text'>EchoBot</span>
      </div>

        <div className='   overflow-y-scroll h-96 ' ref={latestMessageRef}>
         {responseList.map((response,idx)=>(
          <div key={idx} className='p-2 font-poppins'>
             {idx==responseList.length-1 && isLoading?(
             <RotatingLines
             strokeColor="grey"
             strokeWidth="5"
             animationDuration="0.75"
             width="26"
             visible={true}
           />
            ):(<div className='flex flex-col gap-4'>
              <span className='flex justify-start  items-start gap-4 ' >
                <img src={`${user?.user?.image}`} className='w-8 h-8 rounded-full' draggable='false'/>
                {
                  response.user_text.length>350?`${response.user_text.substring(0,350)}...`:response.user_text
                }
              </span>
              <RenderSummarizedResponse key={idx} text={response.summarized_text} scrollToBtm={scrollToBottom}/>
              </div>)} 
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