import React, {useState} from 'react';
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon, TrophyIcon} from "@heroicons/react/24/solid";
import MatchWinnerButton from "@/Components/Tournaments/Tournament/Edit/Matches/MatchWinnerButton";

const Match = ({ id, participants, matchIndex, winnerParticipant, winnerChoiceHandler }) => {
    const getMatchTitle = () => {
        if (getParticipantsLength() === 0) {
            return 'TBD VS TBD';
        } else if (getParticipantsLength() === 1) {
            return `${participants[0].tournamentName} VS TBD`;
        } else {
            return `${participants[0].tournamentName} VS ${participants[1].tournamentName}`;
        }
    }

    const getParticipantsLength = () => {
        if (!Array.isArray(participants) && Object.keys(participants).length === 0) {
            return 0;
        } else if (participants.length === 1) {
            return 1;
        } else {
            return 2;
        }
    }

    return (
        <Disclosure as="div" className="mt-2">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Match {matchIndex}</span>
                        <ChevronUpIcon
                            className={`${
                                open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-white`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 flex flex-col gap-y-5">
                        <h2 className='font-semibold'>{getMatchTitle()}</h2>

                        {(winnerParticipant === null && getParticipantsLength() === 0) && (
                            <div className='flex w-full justify-between px-4'>
                                Waiting for players to finish their matches...
                            </div>
                        )}

                        {(winnerParticipant === null && getParticipantsLength() === 1) && (
                            <div className='flex w-full justify-between px-4'>
                                Waiting for other player match to finish...
                            </div>
                        )}

                        {(winnerParticipant === null && getParticipantsLength() === 2) && (
                            <div className='flex w-full justify-between px-4'>
                                <MatchWinnerButton
                                    matchId={id}
                                    participant={participants[0]}
                                    winnerChoiceHandler={winnerChoiceHandler}
                                />
                                <MatchWinnerButton
                                    matchId={id}
                                    participant={participants[1]}
                                    winnerChoiceHandler={winnerChoiceHandler}
                                />
                            </div>
                        )}

                        {winnerParticipant !== null && (
                            <h2 className="flex items-center text-2xl font-extrabold text-indigo-700">{winnerParticipant.tournamentName}<span
                                className="bg-yellow-100 text-yellow-800 text-xl font-semibold mr-2 px-2.5 py-0.5 rounded ml-2">WINNER</span>
                            </h2>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default Match;
