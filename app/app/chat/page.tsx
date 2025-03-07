import React from 'react'
import PromptHistory from '../app_components/history'
import App_Input from '../app_components/input'


const page = () => {
  return (
    <div className="flex ">
      
    <PromptHistory/>

      
    <App_Input/>

  </div>
  )
}

export default page