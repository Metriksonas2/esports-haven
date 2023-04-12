import React, {useState} from 'react';
import Page from "@/Components/Page/Page";
import DatePicker from "@/Components/UI/DatePicker/DatePicker";
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {Button, Tooltip} from "flowbite-react";
import Participant from "@/Components/Tournaments/Form/Create/Participant";
import {Match, SingleEliminationBracket, SVGViewer} from "@g-loot/react-tournament-brackets";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";
import {renderTournamentView} from "@/Services/functions";
import {usePage} from "@inertiajs/inertia-react";
import Heading from "@/Components/Page/Heading/Heading";

const Edit = () => {
    const [tournament, setTournament] = useState(usePage().props.tournament);
    const matchesArray = renderTournamentView(tournament.tournamentMatches);
    const gamesList = usePage().props.games;

    const formSubmitHandler = () => {
        console.log('form submitted')
    }

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'Manage tournament']}>
            <Heading title={tournament.name} />
            <React.Fragment>
                <div className='flex flex-col items-stretch xl:flex-row'>
                    <div className='basis-2/5 overflow-y-auto overflow-x-hidden max-h-[40rem]
                                scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-600 pr-5'>
                        <form id="create-tournament-form" onSubmit={formSubmitHandler} className="w-full max-w-lg mt-2 mx-auto mb-10">

                        </form>
                    </div>
                    <div className='basis-3/5 pl-2 self-center'>
                        <h1 className='text-xl font-semibold'>Tournament preview</h1>
                        <hr/>
                        <SingleEliminationBracket
                            matches={matchesArray}
                            theme={TournamentBracketTheme}
                            options={{
                                style: {
                                    roundHeader: { backgroundColor: '#312E81' },
                                    connectorColor: '#312E81',
                                    connectorColorHighlight: '#000',
                                },
                            }}
                            matchComponent={Match}
                            svgWrapper={({ children, ...props }) => (
                                <SVGViewer width={750} height={750} {...props}
                                           background="#FFF" SVGBackground="#F0F4F9"
                                >
                                    {children}
                                </SVGViewer>
                            )}
                        />
                    </div>
                </div>
                <button type="submit" form='create-tournament-form'
                        className="align-end mt-2 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                    Create
                </button>
            </React.Fragment>
        </Page>
    );
}

export default Edit;
