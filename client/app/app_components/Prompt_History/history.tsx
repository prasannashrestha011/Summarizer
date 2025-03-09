import React from 'react'
import History_List from './History_List'
import New_Chat from '../Create_Chat/Create_New_Chat';
const historyList = [
  { chat_id: "12345", meta_data: "User asked about React" },
  { chat_id: "67890", meta_data: "User inquired about TypeScript" },
  { chat_id: "11223", meta_data: "User discussed database queries" },
];

const PromptHistory = () => {

  return (
    <div className='border-r border-gray-700 h-screen w-80'>
      <New_Chat/>
      <p className='w-fit  mx-auto'>History</p>
      <div className='flex flex-col '>
        <History_List history_list={historyList}/>
      </div>
    </div>
  )
}

export default PromptHistory