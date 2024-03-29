import React, {useEffect, useState} from 'react';
import Page from "@/Components/Page/Page";
import FileUploadForm from "@/Components/Profile/FileUploadForm/FileUploadForm";
import ChangeButton from "@/Components/Profile/ChangeButton/ChangeButton";
import {usePage} from "@inertiajs/inertia-react";
import GamesSelector from "@/Components/Profile/GamesSelector/GamesSelector";
import {getGameIcon} from "../../Services/GameData";
import LeagueOfLegendsBox from "../../Components/Games/GameBoxes/LeagueOfLegendsBox";
import CsgoBox from "../../Components/Games/GameBoxes/CsgoBox";
import DotaBox from "../../Components/Games/GameBoxes/DotaBox";
import RocketLeagueBox from "../../Components/Games/GameBoxes/RocketLeagueBox";
import {getGameBox} from "../../Services/GameBoxComponentsSelector";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
    const [user, setUser] = useState(usePage().props.user);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [username, setUsername] = useState(user.username);
    const [position, setPosition] = useState(user.position);
    const [country, setCountry] = useState(user.country);
    const [description, setDescription] = useState(user.description);

    const games = usePage().props.games;
    const [gameOptions, setGameOptions] = useState([]);
    const selectedGames = usePage().props.selectedGames;
    const [gamesList, setGamesList] = useState(selectedGames.map(game => game.value));


    const onSaveHandler = async () => {
        try {
            const body = {
                firstName,
                lastName,
                email,
                username,
                position,
                country,
                description,
                games: gamesList,
            }

            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

            const response = await axios.post(`/api/profile/edit/${user.id}`, body, {
                headers: headers
            });

            toast.success('Profile was edited successfully!')
            setTimeout(() => {
                location.reload();
            }, 1500);
        } catch (error) {
            toast.error('Something went wrong... Please try again later')
            console.log(error);
        }
    }

    const onGameChangeHandler = (newGames) => {
        const newGamesList = newGames.map(game => game.value);
        setGamesList(newGamesList);
    }

    useEffect(() => {
        let gameOptionsArray = []
        games.forEach((game) => {
            gameOptionsArray.push({
                value: game,
                label: game,
            })
        });
        setGameOptions(gameOptionsArray);
    }, [])

    return (
        <Page>
            <React.Fragment>
                <div
                    className="relative flex flex-col flex-auto min-w-0 p-4 mb-6 overflow-hidden break-words bg-white border-0 shadow-3xl rounded-2xl bg-clip-border">
                    <div className="flex flex-wrap -mx-3">
                        <div className="flex-none w-auto max-w-full px-3 self-center">
                            <div
                                className="relative inline-flex items-center justify-center text-white transition-all duration-200 ease-in-out text-base h-16 w-16 rounded-xl">
                                <img src={user.profileImage} alt="profile_image"
                                     className="w-full shadow-2xl rounded-xl"/>
                            </div>
                        </div>
                        <div className="flex-none w-auto max-w-full px-3 my-auto">
                            <div className="h-full">
                                <h5 className="mb-1">{user.firstName} {user.lastName}</h5>
                                <p className="mb-0 font-semibold leading-normal text-sm">{user.position}</p>
                            </div>
                        </div>
                        <div
                            className="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-3/5">
                            <div className="relative right-0">
                                <div className="flex flex-wrap gap-4 p-1 justify-end">
                                    <FileUploadForm user={user.id} uploadedFileType='profile' button={<ChangeButton object='profile' />} />
                                    <FileUploadForm user={user.id} uploadedFileType='cover' button={<ChangeButton object='cover' />} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3'>
                    <div className="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                            <div className="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                                <div className="flex items-center">
                                    <p className="mb-0">Edit Profile</p>
                                    <button type="button"
                                            onClick={onSaveHandler}
                                            className="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-indigo-700 border-0 rounded-lg shadow-md cursor-pointer text-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Save
                                    </button>
                                </div>
                            </div>
                            <div className="flex-auto p-6">
                                <p className="leading-normal uppercase text-sm">User
                                    Information</p>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="username"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Username</label>
                                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="email"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Email
                                                address</label>
                                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="first name"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">First
                                                name</label>
                                            <input type="text" name="first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="last name"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Last
                                                name</label>
                                            <input type="text" name="last name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                </div>
                                <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent"/>
                                <p className="leading-normal uppercase text-sm">Contact
                                    Information</p>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-1/2 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="country"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Country</label>
                                            <input type="text" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-1/2 md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="postal code"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Position</label>
                                            <input type="text" name="postal code" value={position} onChange={(e) => setPosition(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                </div>
                                <hr className="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent"/>
                                <p className="leading-normal uppercase text-sm">About me</p>
                                <div className="flex flex-wrap -mx-3">
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="about me"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Description</label>
                                            <input type="text" name="about me"
                                                   value={description} onChange={(e) => setDescription(e.target.value)}
                                                   className="focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"/>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 shrink-0 md:w-full md:flex-0">
                                        <div className="mb-4">
                                            <label htmlFor="about me"
                                                   className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700">Your games</label>
                                            <GamesSelector games={gameOptions} selectedGames={selectedGames} onChange={onGameChangeHandler}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
                            <img className="w-full rounded-t-2xl" src={user.coverImage}
                                 alt="profile cover image" />
                            <div className="flex flex-wrap justify-center -mx-3">
                                <div className="w-4/12 max-w-full px-3 flex-0 ">
                                    <div className="mb-6 -mt-6 lg:mb-0 lg:-mt-16">
                                        <img
                                            className="h-auto max-w-full border-2 border-white border-solid rounded-circle"
                                            src={user.profileImage} alt="profile image" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto p-6 pt-0">
                                <div className="mt-6 text-center">
                                    <h5>
                                        {user.firstName} {user.lastName}
                                    </h5>
                                    <div
                                        className="mb-2 font-semibold leading-relaxed text-base text-slate-700">
                                        <i className="mr-2 ni ni-pin-3"></i>
                                        {user.country} | {user.position}
                                    </div>
                                    <div className="mb-2 text-blueGray-600 flex flex-col lg:flex-row justify-center items-center">
                                        <div className='flex justify-center flex-wrap gap-y-3 mt-4'>
                                            {selectedGames.map((game) => {
                                                return (
                                                    <div className='w-[240px] mx-8 md:mx-0'>
                                                        {getGameBox(game.value, game.endorsements)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div
                                        className="mt-6 mb-2 font-semibold leading-relaxed text-base text-slate-700">
                                        <i className="mr-2 ni ni-briefcase-24"></i>
                                        {user.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </Page>
    );
}

export default Edit;
