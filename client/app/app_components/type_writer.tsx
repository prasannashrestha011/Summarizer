import { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';


export const  RenderSummarizedResponse = ({ text,scrollToBtm }: { text: string,scrollToBtm:()=>void }) => {
    const typeWriterRef=useRef<HTMLDivElement>(null)
   
    return (
        <div className='flex gap-4' ref={typeWriterRef}>
            <img src='/images/machine-learning.png' className='w-8 h-8' draggable='false'/>
            <div className='flex flex-col'>
            <span className='font-bold'>Paraphased text:</span>
            <Typewriter
                options={{
                    strings: text,
                    autoStart: true,
                    loop: false,
                    delay: -10,
                    cursor:"",
                }}
                onInit={(typewriter) => {
                    
                    const scrollInterval = setInterval(scrollToBtm, 100);
                    typewriter
                      .typeString(text)
                      .callFunction(() => {
                        clearInterval(scrollInterval); 
                        console.log('Typewriter animation complete');
                      })
                      .start();
                  }}
            />
            </div>
        </div>
    );
};