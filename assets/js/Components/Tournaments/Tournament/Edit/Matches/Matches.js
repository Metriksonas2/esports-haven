import React from 'react';
import Match from "@/Components/Tournaments/Tournament/Edit/Matches/Match";

const Matches = ({ matches }) => {
    return (
        <div className="flex flex-col mb-6">
            <div className='mb-4'>
                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Round 1</span>
                <div>
                    <Match matchIndex={1}/>
                </div>
            </div>
            <div className='mb-4'>
                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Quarterfinals</span>
                <div>
                    <Match matchIndex={2}/>
                </div>
            </div>
            <div className='mb-4'>
                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Semifinals</span>
                <div>
                    <Match matchIndex={3}/>
                </div>
            </div>
            <div>
                <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Final</span>
                <div>
                    <Match matchIndex={4}/>
                </div>
            </div>
        </div>
    );
}

export default Matches;
