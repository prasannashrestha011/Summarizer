import ClientSession from "./app_components/auth/Client_Session";
import Get_started from "./app_components/links/get_started";


export default function Home() {
  return (
<div className="flex flex-col bg-[url('/images/1280.png')] bg-cover w-full h-svh">
<ClientSession/>
<div className="w-full h-4/6 
flex gap-3 justify-center items-center

 bg-gradient-to-b from-[#F1E6E6] to-[#666666] text-transparent bg-clip-text">
  <img src="/images/machine-learning.png" className="w-20" />
  <span  className="font-poppins font-semibold text-4xl">Echo bot</span>
  </div>
 <Get_started/>
</div>
  );
}
