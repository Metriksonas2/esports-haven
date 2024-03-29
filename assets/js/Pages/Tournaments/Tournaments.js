import React, {useEffect, useState} from 'react';
import route from "@/Services/route";

import Page from "@/Components/Page/Page";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import Table from "@/Components/Tournaments/Table/Table";
import { Tab } from '@headlessui/react'
import {classNames} from "@/Services/functions";

const Tournaments = () => {
    const [tournaments, setTournaments] = useState(usePage().props.tournaments);
    const [hostedTournaments, setHostedTournaments] = useState(usePage().props.hostedTournaments);
    const [wonTournaments, setWonTournaments] = useState(usePage().props.wonTournaments);
    const [inProgressTournaments, setInProgressTournaments] = useState(tournaments.filter(x => x.status === 'In progress'));
    const [finishedTournaments, setFinishedTournaments] = useState(tournaments.filter(x => x.status === 'Finished'));

    const tournamentCategories = {
        "All": tournaments,
        "Hosted": hostedTournaments,
        "Won": wonTournaments,
        "In Progress": inProgressTournaments,
        "Finished": finishedTournaments,
    };

    const deleteTournamentHandler = (id) => {
        setTournaments((prevTournaments) => {
            return prevTournaments.filter(x => x.id !== id);
        });

        setHostedTournaments((prevTournaments) => {
            return prevTournaments.filter(x => x.id !== id);
        });

        setWonTournaments((prevTournaments) => {
            return prevTournaments.filter(x => x.id !== id);
        });

        setInProgressTournaments((prevTournaments) => {
            return prevTournaments.filter(x => x.id !== id);
        });

        setFinishedTournaments((prevTournaments) => {
            return prevTournaments.filter(x => x.id !== id);
        });
    }

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments']}>
            <div className="flex items-center justify-between mb-6">
                <InertiaLink
                    className="btn-indigo focus:outline-none"
                    href={route('tournaments.create')}
                >
                    <span>Create</span>
                    <span className="hidden md:inline"> Tournament</span>
                </InertiaLink>
            </div>
            <Tab.Group>
                <div className="w-full max-w-md px-2 sm:px-0">
                        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            {Object.keys(tournamentCategories).map((category, index) => (
                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }
                                >
                                    {category}
                                </Tab>
                            ))}
                        </Tab.List>
                </div>
                <Tab.Panels>
                    {Object.values(tournamentCategories).map((tournaments, index) => (
                        <Tab.Panel>
                            <Table
                                tournaments={tournaments}
                                isHosted={index === 1}
                                deleteTournamentHandler={deleteTournamentHandler}/>
                        </Tab.Panel>
                    ))}

                </Tab.Panels>
            </Tab.Group>
        </Page>
    );
}

export default Tournaments;
