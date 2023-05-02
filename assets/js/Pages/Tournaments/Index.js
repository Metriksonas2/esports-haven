import React, {useState} from 'react';
import {usePage} from "@inertiajs/inertia-react";
import Page from "@/Components/Page/Page";
import {
    SingleEliminationBracket,
    Match,
    SVGViewer,
} from '@g-loot/react-tournament-brackets';
import Heading from "@/Components/Page/Heading/Heading";
import {renderTournamentView} from "@/Services/functions";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";
import ParticipantsList from "@/Components/Tournaments/Participants/Participants";

const Index = () => {
    const [tournament, setTournament] = useState(usePage().props.tournament);
    const matchesArray = renderTournamentView(tournament.tournamentMatches);

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'View']}>
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
