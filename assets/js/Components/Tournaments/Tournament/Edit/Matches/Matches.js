import React from 'react';
import Match from "@/Components/Tournaments/Tournament/Edit/Matches/Match";

const Matches = ({ structuredMatches }) => {
    let matchIndex = 0;

    return (
        <div className="flex flex-col mb-6">
            {
                structuredMatches.map((match) => (
                    <div className='mb-4'>
                        <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{match.name}</span>
                        {match.matches.map(() => {
                            matchIndex++;
                            return (
                                <div>
                                    <Match matchIndex={matchIndex}/>
                                </div>
                            );
                        })}
                    </div>
                ))
            }
        </div>
    );
}

export default Matches;
