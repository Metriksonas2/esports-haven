import React from 'react';
import {CloudArrowUpIcon} from "@heroicons/react/24/solid";

const ChangeButton = ({ object }) => {
    return (
        <button type="submit"
                className="max-w-[210px] w-[210px] bg-indigo-700 hover:bg-indigo-600 text-white focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
            Change&nbsp;<span className='font-bold'>{object}</span>&nbsp;image
            <CloudArrowUpIcon className='w-5 h-5 ml-2 -mr-1' />
        </button>
    );
}

export default ChangeButton;
