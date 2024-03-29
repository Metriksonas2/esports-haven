import React, {useState} from 'react';

import {
    formatTournamentMatchesData,
    isPowerOfTwo,
    getCorrectDateFormatFromDateObject, participantsArrayIsValid
} from "@/Services/functions";
import Page from "@/Components/Page/Page";
import Participant from "@/Components/Tournaments/Form/Create/Participant";
import {createTheme, Match, SingleEliminationBracket, SVGViewer} from "@g-loot/react-tournament-brackets";
import {Disclosure} from '@headlessui/react'
import {ChevronUpIcon} from "@heroicons/react/24/solid";
import {Button, Tooltip} from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import route from "@/Services/route";
import DatePicker from "@/Components/UI/DatePicker/DatePicker";
import Heading from "@/Components/Page/Heading/Heading";
import {usePage} from "@inertiajs/inertia-react";
import {TournamentBracketTheme} from "@/Services/TournamentBracketTheme";
import TournamentPreview from "@/Components/Tournaments/Tournament/TournamentPreview/TournamentPreview";

const Create = () => {
    const gamesList = usePage().props.games;

    const initialParticipants = [
        {
            index: 1,
            name: 'Participant #1',
            user: null,
        },
        {
            index: 2,
            name: 'Participant #2',
            user: null,
        },
        {
            index: 3,
            name: 'Participant #3',
            user: null,
        },
        {
            index: 4,
            name: 'Participant #4',
            user: null,
        },
    ];

    const [participants, setParticipants] = useState(initialParticipants);

    const [users, setUsers] = useState(usePage().props.users);

    const [loading, setLoading] = useState(false);

    // Form data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [game, setGame] = useState('');
    const [startDate, setStartDate] = useState(getCorrectDateFormatFromDateObject(new Date()))
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
                    "resultText": null, // Any string works
                    "isWinner": false,
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
                    "resultText": null, // Any string works
                    "isWinner": false,
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
                    "id": 'TBD', // Unique identifier of any kind
                    "resultText": null, // Any string works
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                    "name": "TBD"
                },
                {
                    "id": 'TBD',
                    "resultText": null,
                    "isWinner": false,
                    "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                    "name": "TBD"
                }
            ]
        },
    ];
    const [singleMatches, setSingleMatches] = useState(singleMatchesArray);

    const addParticipantHandler = () => {
        setParticipants((prevParticipants => {
            const newIndex = prevParticipants[prevParticipants.length - 1].index + 1;
            const newParticipant = {
                index: newIndex,
                name: `Participant #${newIndex}`,
                user: null,
            }

            const newParticipants = [...prevParticipants, newParticipant];
            formatTournamentPreview(newParticipants);

            return newParticipants;
        }));
    }

    const changeParticipantNameHandler = (participant) => {
        setParticipants((prevParticipants => {
            const newParticipants = [...prevParticipants];
            newParticipants[participant.index - 1].name = participant.name;

            formatTournamentPreview(newParticipants)
            return newParticipants;
        }));
    }

    const formatTournamentPreview = (participants) => {
        setSingleMatches(formatTournamentMatchesData(participants));
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();

        if (!participantsArrayIsValid(participants)) {
            toast.error("Participants aren't valid. Please check everything and try again...")
        } else if (game === '' || game === 'none') {
            toast.error("Please select a game for the tournament")
        } else if (name === '') {
            toast.error("Please enter the name of the tournament")
        } else {
            try {
                const body = {
                    name,
                    description,
                    game,
                    withThirdPlaceMatch: isThirdPlaceMatch,
                    rules,
                    startDate,
                    bracketType,
                    participants,
                    matches: singleMatches
                };
                const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

                setLoading(true);
                const response = await axios.post('/api/tournaments', body, {
                    headers: headers
                });
                toast.success('Tournament has been created!')
                location.replace(route('tournaments?tournament=created'));
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong... Please try again later')
                console.log(error);
                setSingleMatches(singleMatchesArray);
                setParticipants(initialParticipants)
                setUsers(usePage().props.users)
            }
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

    const handleDateChange = (date) => {
        setStartDate(date);
    }

    const userChangeHandler = (user, participantIndex) => {
        setUsers((prevUsers) => {
            return prevUsers.filter(x => x.id !== user.id);
        })

        setParticipants((prevParticipants) => {
            const newParticipants = [...prevParticipants];
            newParticipants[participantIndex - 1].user = user.id;

            return newParticipants;
        })
    }

    const addBackUserHandler = (user) => {
        setUsers((prevUsers) => {
            return [...prevUsers, user];
        })
    }

    return (
    <Page pageIndex='tournaments' breadcrumbsPathArray={['Tournaments', 'Create tournament']}>
        <Heading title='Create tournament' subtitle='Create tournament with live tournament preview.' />
        {loading
            ? (<React.Fragment>
                <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Creating your tournament:</h2>
                <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
                    <li className="flex items-center">
                        <svg aria-hidden="true"
                             className="w-6 h-6 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Create coolest tournament name
                    </li>
                    <li className="flex items-center">
                        <svg aria-hidden="true"
                             className="w-6 h-6 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"></path>
                        </svg>
                        Add competitive participants
                    </li>
                    <li className="flex items-center">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        Prepare to win
                    </li>
                </ul>
            </React.Fragment>)
            : (<React.Fragment>
                <div className='flex flex-col items-stretch xl:flex-row'>
                    <div className='basis-2/5 overflow-y-auto overflow-x-hidden max-h-[40rem]
                                scrollbar-thin scrollbar-thumb-indigo-900 scrollbar-track-indigo-600 pr-5'>
                        <form id="create-tournament-form" onSubmit={formSubmitHandler} className="w-full max-w-lg mt-2 mx-auto mb-10">
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
                                            <option value="Double Elimination" disabled>Double Elimination (Coming Soon)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label htmlFor="types"
                                               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Game
                                        </label>
                                        <select id="types"
                                                className="bg-gray-200 border border-gray-200 text-gray-700 text-sm rounded-lg focus:bg-white focus:outline-none focus:border-gray-500 block w-full p-2.5"
                                                onChange={(e) => setGame(e.target.value) }>
                                            <option value="none" defaultValue>-</option>
                                            {gamesList.map((game, index) => {
                                                if (index !== 0) {
                                                    return (
                                                        <option value={game}>{game}</option>
                                                    );
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="">
                                            Start Date
                                        </label>
                                        <DatePicker setDate={handleDateChange}/>
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
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                               htmlFor="">
                                            Rules
                                        </label>
                                        <textarea id="" rows="4"
                                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-200 rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-gray-500"
                                                  placeholder="Write your thoughts here..."
                                                  onChange={(e) => setRules(e.target.value) }>
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
                                                        content="Select a user for each participant and create it's tournament username!"
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
                                                                 users={users}
                                                                 userChangeHandler={userChangeHandler}
                                                                 addBackUserHandler={addBackUserHandler}
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
                                                <input type="checkbox" disabled={true} onChange={thirdPlaceMatchHandler} value="" className="sr-only peer" />
                                                <div
                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all focus:outline-none focus:border-gray-500 peer-checked:bg-indigo-900"></div>
                                                <span
                                                    className="ml-3 text-sm font-medium text-gray-700">3rd place match (Coming soon)</span>
                                            </label>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" disabled={true} value="" className="sr-only peer" />
                                                <div
                                                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all focus:outline-none focus:border-gray-500 peer-checked:bg-indigo-900"></div>
                                                <span
                                                    className="ml-3 text-sm font-medium text-gray-700">Show title (Coming soon)</span>
                                            </label>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                            <button type="submit" form='create-tournament-form'
                                    className="align-end mt-4 w-24 focus:outline-none text-white bg-indigo-900 hover:bg-indigo-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                Create
                            </button>
                        </form>
                    </div>
                    <div className='basis-3/5 pl-2 self-center'>
                        <TournamentPreview matches={singleMatches}/>
                    </div>
                </div>
            </React.Fragment>)
        }
    </Page>
  );
}

export default Create;
