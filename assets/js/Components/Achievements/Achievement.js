import React from 'react'
import {LockClosedIcon} from "@heroicons/react/24/solid";

const Achievement = ({ achievement }) => {
    return (
        <div className='flex w-3/4 h-20 border-2 hover:scale-105 duration-200'>
            <div className={`w-20 h-22 relative ${!achievement.earned ? 'grayscale' : ''}`}>
                <img className='w-full h-full' src={achievement.image} alt=""/>
                {!achievement.earned && (
                    <LockClosedIcon className='w-7 p-1 bg-black text-white absolute top-[29px] left-[26px]' />
                )}
            </div>
            <div className='pl-4 bg-white grow flex flex-col border-l justify-center'>
                <div className='text-lg'>{achievement.title}</div>
                <div className='text-sm'>{achievement.description}</div>
            </div>
        </div>
    );
}

export default Achievement;