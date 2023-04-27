import React from 'react';

const Participants = ({ participants }) => {
    console.log(participants)
    return (
        <div className="max-w-2xl w-1/2 mx-auto">
            <div className="p-4 max-w-[35rem] w-[35rem] bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Participants</h3>
                    {/*<a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">*/}
                    {/*    View all*/}
                    {/*</a>*/}
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {participants.map((participant) => (
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={participant.profileImage} alt="Bonnie image" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {participant.tournamentName}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            email@windster.com
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        $3467
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
