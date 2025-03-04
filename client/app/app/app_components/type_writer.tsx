import Typewriter from 'typewriter-effect';

export const  RenderSummarizedResponse = ({ text }: { text: string }) => {
    return (
        <div>
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
    );
};