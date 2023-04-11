import React, {useState} from 'react';
import {usePage} from "@inertiajs/inertia-react";
import Page from "@/Components/Page/Page";
import {
    SingleEliminationBracket,
    DoubleEliminationBracket,
    Match,
    MATCH_STATES,
    SVGViewer,
    createTheme
} from '@g-loot/react-tournament-brackets';
import Heading from "@/Components/Page/Heading/Heading";
import {renderTournamentView} from "@/Services/functions";

const WhiteTheme = createTheme({
    textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
    matchBackground: { wonColor: '#daebf9', lostColor: '#96c6da' },
    score: {
        background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
        text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
    },
    border: {
        color: '#CED1F2',
        highlightedColor: '#F0F4F9',
    },
    roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
    connectorColor: '#CED1F2',
    connectorColorHighlight: '#da96c6',
    svgBackground: '#FAFAFA',
});

const Index = () => {
    const [name, setName] = useState('Erikas');
    const [tournament, setTournament] = useState(usePage().props.tournament);

    const matchesArray = renderTournamentView(tournament.tournamentMatches);

    return (
        <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'View']}>
            <Heading title={tournament.name} />
            <SingleEliminationBracket
                matches={matchesArray}
                theme={WhiteTheme}
                options={{
                    style: {
                        roundHeader: { backgroundColor: '#312E81' },
                        connectorColor: '#312E81',
                        connectorColorHighlight: '#000',
                    },
                }}
                matchComponent={Match}
                svgWrapper={({ children, ...props }) => (
                    <SVGViewer width={1500} height={750}{...props}
                               background="#FFF" SVGBackground="#F0F4F9"
                    >
                        {children}
                    </SVGViewer>
                )}
            />
        </Page>
    );
}

export default Index;
