import axios from "axios";
interface ResponseText{
    text:string
}
export async function SubmitText(text:string):Promise<string>{
   try{
    const response=await axios.post<ResponseText>("http://127.0.0.1:8000/summary",
    {text:text},{
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(response.status!==200) throw new Error("failed to submit the text")
     return response.data.text
   }catch(err){
     const error_details=err as Error
     console.error(err)
     return Promise.reject(error_details.message)
   }

}