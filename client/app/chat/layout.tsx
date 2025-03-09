import React from "react";
import PromptHistory from "../app_components/Prompt_History/history";
import App_Input from "../app_components/input";

export default function ChatLayout({children}:{children:React.ReactNode}){
  return(
    <div>
    <div className="flex ">
    <PromptHistory/>
    <App_Input/>
    </div>
    <main>{children}</main>
</div>
  )
}