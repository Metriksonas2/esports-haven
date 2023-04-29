import React from 'react'
import { HandThumbUpIcon } from "@heroicons/react/24/solid";

const Endorsement = ({ game, gameIcon, endorsed }) => {
    return (
        <div className='w-3/4 flex justify-between items-center px-10 py-4 my-2 border'>
            <div className='flex items-center'>
                <img className='w-8 h-8 mr-4' src={gameIcon} alt=""/>
                <div>{game}</div>
            </div>
            {!endorsed && (
                <button
                    className="w-40 h-10 btn-indigo uppercase text-white font-semibold hover:shadow-md shadow text-xs px-6 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button">
                    Endorse
                </button>
            )}
            {endorsed && (
                <div
                    className="w-40 h-10 flex gap-x-2 justify-center items-center bg-indigo-900 uppercase text-white font-semibold shadow text-xs px-6 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                >
                    <div className='whitespace-nowrap'>Endorsed</div>
                    <HandThumbUpIcon className='w-6' />
                </div>
            )}
        </div>
    );
}

export default Endorsement;