import React from 'react';

const GameBox = ({gameName, image, alt}) => {
    return (
        <div className='py-2 px-4 mx-2 rounded-lg bg-[#42e2b8] flex font-semibold'>
            <img className="w-6 mr-4" src={image} alt={alt}/>
            <div>{gameName}</div>
        </div>
    );
}

export default GameBox;
