import React, {useEffect, useState} from 'react';
import Participants from '@/Components/Tournaments/Table/Participants';
import Status from "@/Components/Tournaments/Table/Status";
import Host from "@/Components/Tournaments/Table/Host";
import Actions from "@/Components/Tournaments/Table/Actions/Actions";
import route from "@/Services/route";
import {getQueryParam} from "@/Services/functions";

const Table = ({ tournaments, isHosted }) => {
    const [tournamentCreated, setTournamentCreated] = useState(false);

    useEffect(() => {
        let getTournamentQuery = getQueryParam('tournament');

        if (getTournamentQuery !== null && getTournamentQuery === 'created') {
            setTournamentCreated(true);
        }
    }, []);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-full min-h-full bg-gray-100 flex bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-11/12">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Tournament</th>
                                <th className="py-3 px-6 text-left">Host</th>
                                <th className="py-3 px-6 text-center">Participants</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {tournaments.map(({ id, name, game, bracketType, host }, index) => {
                                return (
                                    <tr key={id}
                                        className={`border-b border-gray-200 ${index % 2 === 0 && 'bg-gray-50'} 
                                                    hover:bg-gray-100 ${tournamentCreated && index === 0 ? 'animate-bounce new-tournament' : ''}`}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img className="w-8 h-8 rounded-full" src="/assets/images/default-tournament-icon.png" alt="Default tournament icon" />
                                                </div>
                                                <span className="font-medium">{name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <Host name={host.username} />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Participants />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Status status='Active' />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Actions
                                                viewRoute={route('tournaments', id)}
                                                editRoute={route('tournaments.manage', id)}
                                                deleteRoute={''}
                                                isHosted={isHosted}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
