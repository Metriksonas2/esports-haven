import React, {useState} from 'react';
import Page from "@/Components/Page/Page";
import DatePicker from "@/Components/UI/DatePicker/DatePicker";
import {Disclosure, Tab} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {Button, Tooltip} from "flowbite-react";
import Participant from "@/Components/Tournaments/Form/Create/Participant";
import {Match, SingleEliminationBracket, SVGViewer} from "@g-loot/react-tournament-brackets";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";
import {classNames, getStructuredTournamentMatches, renderTournamentView} from "@/Services/functions";
import {usePage} from "@inertiajs/inertia-react";
import Heading from "@/Components/Page/Heading/Heading";
import GeneralSettings from "@/Components/Tournaments/Tournament/Edit/General/General";
import ParticipantSettings from "@/Components/Tournaments/Tournament/Edit/Participants/Participants";
import MatchesSettings from "@/Components/Tournaments/Tournament/Edit/Matches/Matches";
import TournamentPreview from "@/Components/Tournaments/Tournament/TournamentPreview/TournamentPreview";
import axios from "axios";
import toast from "react-hot-toast";


const Edit = () => {
    const [tournament, setTournament] = useState(usePage().props.tournament);
    const matchesArray = renderTournamentView(tournament.tournamentMatches);
    const gamesList = usePage().props.games;
    console.log(tournament)
    const winnerChoiceHandler = async (matchId, winnerParticipant) => {
        try {
            setTournament((prevTournament) => {
                let newTournament = {...prevTournament};
                let match = newTournament.tournamentMatches.find(x => x.id === matchId);
                let nextMatch = match.nextMatch;

                match.winnerParticipant = winnerParticipant;
                if (nextMatch !== null) {
                    nextMatch = newTournament.tournamentMatches.find(x => x.id === nextMatch);
                    nextMatch.participants.push(newTournament.participants.find(x => x.id === winnerParticipant));
                }

                return newTournament;
            })

            const body = {
                matchId: matchId,
                winnerParticipantId: winnerParticipant
            };

            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

            const response = await axios.post(`/api/tournaments/${tournament.id}/winner`, body, {
                headers: headers
            });

            toast.success('Winner declared successfully!')
        } catch (error) {
            toast.error('Something went wrong... Please try again later')
            console.log(error);
        }
    }

    const formSubmitHandler = () => {
        console.log('form submitted')
    }

    const manageTabs = {
        "General": <GeneralSettings tournament={tournament}/>,
        "Participants": <ParticipantSettings participants={tournament.participants}/>,
        "Matches": <MatchesSettings
            structuredMatches={getStructuredTournamentMatches(tournament)}
            winnerChoiceHandler={winnerChoiceHandler}
        />,
    };

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'Manage tournament']}>
            <Heading title={tournament.name} />

            <React.Fragment>
                <div className='flex flex-col items-stretch xl:flex-row'>
                    <div className='basis-2/5 overflow-y-auto overflow-x-hidden max-h-[40rem]
                                scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-600 pr-5'>
                        <Tab.Group>
                                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-6">
                                    {Object.keys(manageTabs).map((category, index) => (
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
                            <Tab.Panels>
                                {Object.values(manageTabs).map((data, index) => (
                                    <Tab.Panel>
                                        <div className="flex flex-wrap -mx-3 mb-4">
                                            <div className="flex-none w-full max-w-full px-3">
                                                {data}
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                ))}

                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                    <div className='basis-3/5 pl-2 self-center'>
                        <TournamentPreview matches={matchesArray}/>
                    </div>
                </div>
                <button type="submit" form='create-tournament-form'
                        className="align-end mt-2 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                    Edit
                </button>
            </React.Fragment>
        </Page>
    );
}

export default Edit;
