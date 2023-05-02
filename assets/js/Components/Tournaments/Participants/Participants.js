import React from 'react';

const Participants = ({ participants, winner }) => {
    return (
        <div className="max-w-2xl w-1/2 mx-auto">
            <div className="p-4 max-w-[35rem] w-[35rem] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Participants</h3>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {participants.map((participant) => (
                            <li className='py-3 sm:py-4'>
                                <div className="flex items-center space-x-4">
                                    <div className='flex-shrink-0 relative'>
                                        <img className='w-8 h-8 rounded-full' src={participant.profileImage} alt="Bonnie image" />
                                        {participant.user === winner && (
                                            <div className='w-11 h-11 absolute -top-1.5 -left-1.5 rounded-full border-2 border-yellow-400'></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {participant.tournamentName}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {participant.firstName} {participant.lastName}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {participant.eliminated && (
                                            <div className='text-sm uppercase text-red-600'>
                                                eliminated
                                            </div>
                                        )}

                                        {(!participant.eliminated && participant.user !== winner) && (
                                            <div className='text-sm uppercase text-indigo-600'>
                                                in competition
                                            </div>
                                        )}

                                        {participant.user === winner && (
                                            <div className='text-sm uppercase text-green-600 font-bold'>
                                                winner
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Participants;
