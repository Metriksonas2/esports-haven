import React, {useEffect, useState} from 'react';

import {formatTournamentMatchesData, isPowerOfTwo} from "@/Services/functions";
import Page from "@/Components/Page/Page";
import Participant from "@/Components/Tournaments/Form/Create/Participant";
import {
    createTheme,
    DoubleEliminationBracket,
    Match,
    SingleEliminationBracket,
    SVGViewer
} from "@g-loot/react-tournament-brackets";
import {Disclosure, Transition} from '@headlessui/react'
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {Button, Tooltip} from "flowbite-react";
import axios from "axios";

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

const Create = () => {
    const [participants, setParticipants] = useState([
        {
            index: 1,
            name: 'First',
        },
        {
            index: 2,
            name: 'Second',
        },
        {
            index: 3,
            name: 'Third',
        },
        {
            index: 4,
            name: 'Fourth',
        },
    ]);
    const [enablePreview, setEnablePreview] = useState(true);

    // Form data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [game, setGame] = useState('');
    const [isThirdPlaceMatch, setIsThirdPlaceMatch] = useState(false);
    const [rules, setRules] = useState('');
    const [bracketType, setBracketType] = useState('Single Elimination');

    const singleMatchesArray = [
        {
            "id": 1,
            "name": "Semifinal - Match",
            "nextMatchId": 3, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "3d2c1bdd-e61f-4fd6-8c4d-f4a750504119", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": participants[0].name
                },
                {
                    "id": "5c8264cf-2dcb-4c51-9134-367eaf7885a4",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": participants[1].name
                }
            ]
        },
        {
            "id": 2,
            "name": "Semifinal - Match",
            "nextMatchId": 3, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
            "tournamentRoundText": "4", // Text for Round Header
            "startTime": "2021-05-30",
            "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
            "participants": [
                {
                    "id": "feb4a46c-87f5-45d9-9d75-4f364933ed1c", // Unique identifier of any kind
                    "resultText": "WON", // Any string works
                    "isWinner": true,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": participants[2].name
                },
                {
                    "id": "16419b92-076d-4de1-8ef4-4aa0f62d5a0c",
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": participants[3].name
                }
            ]
        },
        {
            "id": 3,
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
    const [singleMatches, setSingleMatches] = useState(singleMatchesArray);

    const doubleMatches = {
        'upper': [
            {
                "id": 260001, // Unique identifier of any kind
                "name": "Semi Final - Match",
                "nextMatchId": 260003,  // Id for the next match in upper bracket, if it's final match it must be null OR undefined
                "nextLooserMatchId": 260004,  // Id for the next match in lower bracket, if it's final match or a lower bracket match it must be null OR undefined
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": "LOST", // Any string works
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            },
            {
                "id": 260002, // Unique identifier of any kind
                "name": "Semi Final - Match",
                "nextMatchId": 260003,  // Id for the next match in upper bracket, if it's final match it must be null OR undefined
                "nextLooserMatchId": 260004,  // Id for the next match in lower bracket, if it's final match or a lower bracket match it must be null OR undefined
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": "LOST", // Any string works
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            },
            {
                "id": 260003, // Unique identifier of any kind
                "name": "Semi Final - Match",
                "nextMatchId": 260005,  // Id for the next match in upper bracket, if it's final match it must be null OR undefined
                "nextLooserMatchId": null,  // Id for the next match in lower bracket, if it's final match or a lower bracket match it must be null OR undefined
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": "LOST", // Any string works
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            },
            {
                "id": 260006, // Unique identifier of any kind
                "name": "Final - Match",
                "nextMatchId": null,  // Id for the next match in upper bracket, if it's final match it must be null OR undefined
                "nextLooserMatchId": null,  // Id for the next match in lower bracket, if it's final match or a lower bracket match it must be null OR undefined
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": "LOST", // Any string works
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            }
        ],
        'lower': [
            {
                "id": 260004,
                "name": "Semi Final - Match",
                "nextMatchId": 260005,
                "nextLooserMatchId": 260005,
                "tournamentRoundText": "4",
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": null,
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            },
            {
                "id": 260005,
                "name": "Semi Final - Match",
                "nextMatchId": 260006,
                "nextLooserMatchId": null,
                "tournamentRoundText": "4",
                "startTime": "2021-05-30",
                "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
                "participants": [
                    {
                        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                        "resultText": "WON", // Any string works
                        "isWinner": false,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                        "name": "giacomo123"
                    },
                    {
                        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                        "resultText": null,
                        "isWinner": true,
                        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                        "name": "Ant"
                    }
                ]
            }
        ],
    };

    const addParticipantHandler = () => {
        setParticipants((prevParticipants => {
            const newIndex = prevParticipants[prevParticipants.length - 1].index + 1;
            const newParticipant = {
                index: newIndex,
                name: '-'
            }
            setEnablePreview(isPowerOfTwo(newIndex));

            const newParticipants = [...prevParticipants, newParticipant];

            formatTournamentPreview(newParticipants);

            return newParticipants;
        }));
    }

    const changeParticipantNameHandler = (participant) => {
        setParticipants((prevParticipants => {
            const newParticipants = [...prevParticipants];
            newParticipants[participant.index - 1] = participant;

            formatTournamentPreview(newParticipants)
            return newParticipants;
        }));
    }

    const formatTournamentPreview = (participants) => {
        if (isPowerOfTwo(participants.length)) {
            setSingleMatches(formatTournamentMatchesData(participants, true));
        }
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const body = {
                name,
                description,
                game,
                withThirdPlaceMatch: isThirdPlaceMatch,
                rules,
                bracketType,
            };

            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };
            const response = await axios.post('/api/tournaments', body, {
                headers: headers
            });
        } catch (error) {
            console.log(error);
        }
    }

    const thirdPlaceMatchHandler = () => {
        setIsThirdPlaceMatch((prevState) => {
            if (!prevState && isPowerOfTwo(participants.length)) {
                setSingleMatches(formatTournamentMatchesData(participants, true));
            }
            return !prevState;
        });
    }

    return (
    <Page pageIndex='tournaments'>
            <h1 className="mb-8 text-3xl font-bold">Create tournament</h1>
            <div className='flex'>
                <div className='basis-2/5 overflow-y-auto overflow-x-hidden max-h-[40rem]
                                scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-600 pr-5'>
                    <form id="create-tournament-form" onSubmit={formSubmitHandler} className="w-full max-w-lg mt-2">
                        <div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                           htmlFor="">
                                        Tournament name
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="" type="text" placeholder="Baltic LoL Cup #2" onChange={(e) => setName(e.target.value) } />
                                    {/*<p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>*/}
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label htmlFor="types"
                                           className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Tournament Type
                                    </label>
                                    <select id="types"
                                            className="bg-gray-200 border border-gray-200 text-gray-700 text-sm rounded-lg focus:bg-white focus:outline-none focus:border-gray-500 block w-full p-2.5"
                                            onChange={(e) => setBracketType(e.target.value) }>
                                        <option value="Single Elimination" defaultValue>Single Elimination</option>
                                        <option value="Double Elimination">Double Elimination</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                           htmlFor="">
                                        Description
                                    </label>
                                    <textarea id="" rows="4"
                                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-gray-500"
                                              placeholder="Write your thoughts here..."
                                              onChange={(e) => setDescription(e.target.value) }>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>Participants</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-white`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                                        <div className="flex flex-col mb-6">
                                            <div className="w-12 self-end">
                                                <Tooltip
                                                    content='Number of participants should be the power of two ("4, 8, 16, 32" and etc.)'
                                                    animation="duration-300"
                                                >
                                                    <Button className='text-md text-white bg-indigo-900 hover:bg-indigo-600'>
                                                        ?
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                            {participants.map((p, index) => (
                                                <Participant key={index} index={p.index} name={p.name}
                                                             changeParticipantName={changeParticipantNameHandler}
                                                />
                                            ))}
                                            <div
                                                className="flex items-center justify-center cursor-pointer h-12 mt-2 mb-4 rounded bg-gray-200 hover:bg-gray-50"
                                                onClick={addParticipantHandler}
                                            >
                                                <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>Other</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-white`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 flex flex-col gap-y-5">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" onChange={thirdPlaceMatchHandler} value="" className="sr-only peer" />
                                                <div
                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all focus:outline-none focus:border-gray-500 peer-checked:bg-indigo-900"></div>
                                                <span
                                                    className="ml-3 text-sm font-medium text-gray-700">3rd place match</span>
                                        </label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            <div
                                                className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all focus:outline-none focus:border-gray-500 peer-checked:bg-indigo-900"></div>
                                            <span
                                                className="ml-3 text-sm font-medium text-gray-700">Show title</span>
                                        </label>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </form>
                </div>
                <div className='basis-3/5 pl-2'>
                    <h1 className='text-xl font-semibold'>Tournament preview</h1>
                    <hr/>
                    {enablePreview && (
                        <SingleEliminationBracket
                            matches={singleMatches}
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
                                <SVGViewer width={750} height={750} {...props}
                                           background="#FFF" SVGBackground="#F0F4F9"
                                >
                                    {children}
                                </SVGViewer>
                            )}
                        />
                    )}
                    {!enablePreview && (
                        <div>
                            <div className='text-md font-semibold'>
                                Tournament preview will be available once you add eligible number of participants.
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button type="submit" form='create-tournament-form'
                    className="align-end mt-2 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                Create
            </button>
    </Page>
  );
}

export default Create;
