import React from 'react';

const Cell = ({ day, isEmpty = false }) => {
    return (isEmpty
            ? (<div></div>)

            : (<div className="relative flex flex-col bg-white group h-[171px]">
                <span className="mx-2 my-1 text-xs font-bold">{day}</span>
                <div className="flex flex-col px-1 py-1 overflow-auto h-full scrollbar-thin scrollbar-thumb-gray-600">
                    <button
                        className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 border border-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">8:30am</span>
                        <span className="ml-2 font-medium leading-none truncate">An unconfirmed event</span>
                    </button>
                    <button className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200">
                        <span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>
                        <span className="ml-2 font-light leading-none">2:15pm</span>
                        <span className="ml-2 font-medium leading-none truncate">A confirmed event</span>
                    </button>
                </div>
                <button className="absolute bottom-0 right-0 flex items-center justify-center hidden w-6 h-6 mb-2 mr-2 text-white bg-gray-400 rounded group-hover:flex hover:bg-gray-500">
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 plus">
                        <path fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"></path>
                    </svg>
                </button>
            </div>)
    );
}

export default Cell;