import React from 'react';
import Match from "@/Components/Tournaments/Tournament/Edit/Matches/Match";

const Matches = ({ structuredMatches, winnerChoiceHandler }) => {
    let matchIndex = 0;

    return (
        <div className="flex flex-col mb-6">
            {
                structuredMatches.map((round) => (
                    <div className='mb-4'>
                        <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{round.name}</span>
                        {round.matches.map((match) => {
                            matchIndex++;
                            return (
                                <div key={match.id}>
                                    <Match
                                        id={match.id}
                                        participants={match.participants}
                                        matchIndex={matchIndex}
                                        winnerParticipant={match.winnerParticipant}
                                        winnerChoiceHandler={winnerChoiceHandler}
                                    />
                                </div>
                            );
                        })}
                        <div className='mt-6'></div>
                    </div>
                ))
            }
        </div>
    );
}

export default Matches;
