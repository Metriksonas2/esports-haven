import React, {useState} from 'react';
import {usePage} from "@inertiajs/inertia-react";
import Page from "@/Components/Page/Page";
import {
    SingleEliminationBracket,
    Match,
    SVGViewer,
} from '@g-loot/react-tournament-brackets';
import Heading from "@/Components/Page/Heading/Heading";
import {getTournamentDataForCsv, renderTournamentView} from "@/Services/functions";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";
import ParticipantsList from "@/Components/Tournaments/Participants/Participants";
import {ArrowUpOnSquareIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid";
import {CSVLink} from "react-csv";

const Index = () => {
    const [tournament, setTournament] = useState(usePage().props.tournament);
    const matchesArray = renderTournamentView(tournament.tournamentMatches);
    const csvData = getTournamentDataForCsv(tournament.tournamentMatches, tournament.name);

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'View']}>
            <CSVLink data={csvData} filename={"tournament-data.csv"} className="btn-indigo w-60 flex gap-x-2 justify-center items-center uppercase text-white font-semibold hover:shadow-md shadow text-xs px-6 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                <div className='whitespace-nowrap'>Export data to CSV</div>
                <ArrowUpOnSquareIcon className='w-6 text-white' />
            </CSVLink>
            <Heading title={tournament.name} />
            <div className='flex gap-2'>
                <div>
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
                            <SVGViewer width={1200} height={750}{...props}
                                       background="#FFF" SVGBackground="#F0F4F9"
                            >
                                {children}
                            </SVGViewer>
                        )}
                    />
                </div>
                <div className='ml-6'>
                    <ParticipantsList participants={tournament.participants} winner={tournament.winner}/>
                </div>
            </div>
        </Page>
    );
}

export default Index;
