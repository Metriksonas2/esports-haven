import React from 'react';
import {getGameIcon} from "@/Services/GameData";
import route from "@/Services/route";
import {InertiaLink} from "@inertiajs/inertia-react";

const Cell = ({ day, tournaments = [], isEmpty = false }) => {
    return (isEmpty
            ? (<div></div>)

            : (<div className="relative flex flex-col bg-white group">
                <span className="mx-2 my-1 text-xs font-bold">{day}</span>
                <div className="flex flex-col px-1 py-1 overflow-auto h-full scrollbar-thin scrollbar-thumb-gray-600">
                    {tournaments.map((tournament) => (
                        <InertiaLink
                            className="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200"
                            href={route("tournaments", tournament.id)}
                        >
                            {/*<span className="flex-shrink-0 w-2 h-2 bg-gray-500 rounded-full"></span>*/}
                            <div className="flex-shrink-0 w-4 h-4 rounded-full">
                                <img src={getGameIcon(tournament.game)} alt=""/>
                            </div>
                            {/*<span className="ml-2 font-light text-md leading-none">&#183;</span>*/}
                            <span className="ml-2 font-medium leading-none truncate">{tournament.name}</span>
                        </InertiaLink>
                    ))}
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