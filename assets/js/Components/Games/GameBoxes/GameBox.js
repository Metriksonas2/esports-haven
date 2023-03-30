import React from 'react';

const GameBox = ({gameName, image, alt, endorsements = 0}) => {
    return (
        <div className='py-2 px-4 mx-2 rounded-lg bg-[#42e2b8] flex font-semibold relative'>
            <img className="w-6 mr-4" src={image} alt={alt}/>
            <div>{gameName}</div>
            {endorsements !== 0 && (
                <div className='h-5 w-5 rounded-full max-w-5 min-h-5 flex items-center justify-center absolute -top-1.5 -right-1.5 text-[12px] font-semibold bg-indigo-700 text-white'>
                    {endorsements}
                </div>
            )}
        </div>
    );
}

export default GameBox;
