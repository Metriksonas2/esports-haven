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

    const matches = [
        {
            "id": 260001,
            "name": "Quarterfinal - Match",
            "nextMatchId": 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                    "resultText": false, // Any string works
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Adrijus"
                },
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119",
                    "resultText": 'WON',
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": name
                }
            ]
        },
        {
            "id": 260002,
            "name": "Quarterfinal - Match",
            "nextMatchId": 260005, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "5c8264cf-2dcb-4c51-9134-367eaf7885a4", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Laimis"
                },
                {
                    "id": "0c869df7-042a-4161-93ba-d76acc04e965",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Bernardas"
                }
            ]
        },
        {
            "id": 260003,
            "name": "Quarterfinal - Match",
            "nextMatchId": 260006, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "1d0f2254-72bf-4b9c-871c-95a672621621", // Unique identifier of any kind
                    "resultText": null, // Any string works
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Leonas"
                },
                {
                    "id": "feb4a46c-87f5-45d9-9d75-4f364933ed1c",
                    "resultText": 'WON',
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Ignas"
                }
            ]
        },
        {
            "id": 260004,
            "name": "Quarterfinal - Match",
            "nextMatchId": 260006, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "16419b92-076d-4de1-8ef4-4aa0f62d5a0c", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Mantas"
                },
                {
                    "id": "4ceb91be-3e91-40d4-8ac2-69882da910a8",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Laurynas"
                }
            ]
        },
        {
            "id": 260005,
            "name": "Semifinal - Match",
            "nextMatchId": 260007, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Erikas"
                },
                {
                    "id": "5c8264cf-2dcb-4c51-9134-367eaf7885a4",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Laimis"
                }
            ]
        },
        {
            "id": 260006,
            "name": "Semifinal - Match",
            "nextMatchId": 260007, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "feb4a46c-87f5-45d9-9d75-4f364933ed1c", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Ignas"
                },
                {
                    "id": "16419b92-076d-4de1-8ef4-4aa0f62d5a0c",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Mantas"
                }
            ]
        },
        {
            "id": 260007,
            "name": "Final - Match",
            "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "Erikas"
                },
                {
                    "id": "feb4a46c-87f5-45d9-9d75-4f364933ed1c",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "Ignas"
                }
            ]
        },
    ];

    return (
        <Page pageIndex='tournaments'>
            <h1 className="mb-8 text-3xl font-bold">{tournament.name}</h1>
            <SingleEliminationBracket
                matches={matches}
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
                    <SVGViewer width={1500} height={1500}{...props}
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
