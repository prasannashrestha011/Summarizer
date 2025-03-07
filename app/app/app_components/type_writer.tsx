import Typewriter from 'typewriter-effect';

export const  RenderSummarizedResponse = ({ text }: { text: string }) => {
    return (
        <div className='flex gap-4'>
            <img src='/icons/ai.png' className='w-8 h-8' draggable='false'/>
            <div className='flex flex-col'>
            <span className='font-bold'>Paraphased text:</span>
            <Typewriter
                options={{
                    strings: text,
                    autoStart: true,
                    loop: false,
                    delay: 5,
                    cursor:"",
                }}
            />
            </div>
        </div>
    );
};