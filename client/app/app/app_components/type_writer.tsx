import Typewriter from 'typewriter-effect';

export default function RenderSummarizedResponse(text:string){
    return(
        <div>
            <Typewriter
                options={{
                    strings:text,
                    autoStart:true,
                    loop:false,
                    delay:30
                }}
            />
        </div>
    )
}