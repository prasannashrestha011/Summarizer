"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface PromptHistoryProp{
    chat_id:string 
    meta_data:string
}


const History_List = ({history_list}:{history_list:PromptHistoryProp[]}) => {
    const router=useRouter()
  return (

        <ul className='flex flex-col gap-2 p-3 '>
           {history_list&&history_list.map((history,idx)=>(
            <li key={idx} className='cursor-pointer'>
               <span onClick={()=>router.push(`/chat/${history.chat_id}`)}>{history.meta_data}</span>
            </li>
           ))}     
        </ul>
    
  )
}

export default History_List