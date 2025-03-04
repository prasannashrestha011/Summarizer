import PromptHistory from "./app_components/history";
import App_Input from "./app_components/input";


export default function Home() {
  return (
  <div className="flex ">
    <PromptHistory/>

      
    <App_Input/>

  </div>
  );
}
