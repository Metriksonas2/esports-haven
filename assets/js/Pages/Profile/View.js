import React, {useState} from 'react';
import Page from "@/Components/Page/Page";
import {usePage} from "@inertiajs/inertia-react";
import CsgoBox from "@/Components/Games/GameBoxes/CsgoBox";
import DotaBox from "@/Components/Games/GameBoxes/DotaBox";
import LeagueOfLegendsBox from "@/Components/Games/GameBoxes/LeagueOfLegendsBox";
import RocketLeagueBox from "@/Components/Games/GameBoxes/RocketLeagueBox";
import { CircularProgressbar } from 'react-circular-progressbar';
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const Index = () => {
    const user = usePage().props.user;
    const isMe = usePage().props.isMe;
    const isFriend = usePage().props.isFriend;

    const fullName = user.firstName + ' ' + user.lastName;
    const userProgression = {
        level: 5,
        percentage: 70
    }

    return (
        <Page pageIndex=''>
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />
            <main className="profile-page">
                <section className="relative block h-[500px]">
                    <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
                    }}>
                        <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
                        style={{
                            transform: "translateZ(0px)"
                        }}>
                        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                             preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="text-gray-200 fill-current"
                                     points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </section>
                <section className="relative py-16 bg-gray-200">
                    <div className="container mx-auto px-6">
                        <div
                            className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div id='profile-section' className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative">
                                            <img id='profile-image' alt="Profile image"
                                                 src="/assets/images/profile-avatar.jpg"
                                                 className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -mt-[42px] -ml-[75px] max-w-[150px] z-20 ease-linear transition-all duration-200" />
                                            <div className='w-48 h-48 align-middle absolute -m-16 -ml-24 lg:-ml-22 z-10'>
                                                <CircularProgressbar value={userProgression.percentage}
                                                                     text={`${userProgression.level}`}
                                                                     background='true'
                                                />;
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className={`py-6 px-3 mt-32 sm:mt-0 ${isFriend ? 'flex justify-end' : ''}`}>
                                            {(!isFriend && !isMe) && (
                                                <button
                                                    className="btn-indigo uppercase text-white font-semibold hover:shadow-md shadow text-xs px-6 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Add Friend
                                                </button>
                                            )}

                                            {isFriend && (
                                                <div
                                                    className="w-32 flex gap-x-2 items-center bg-indigo-900 uppercase text-white font-semibold shadow text-xs px-6 py-4 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                >
                                                    <div>Friends</div>
                                                    <CheckBadgeIcon className='w-6' />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span
                                                    className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span
                                                className="text-sm text-blueGray-400">Friends</span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span
                                                    className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span
                                                className="text-sm text-blueGray-400">Tournaments</span>
                                            </div>
                                            <div className="lg:mr-4 p-3 text-center">
                                                <span
                                                    className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span
                                                className="text-sm text-blueGray-400">Wins</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {fullName}
                                    </h3>
                                    <div
                                        className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        Kaunas, Lithuania
                                    </div>
                                    <div className="mb-4 text-blueGray-600 mt-10">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Solution Manager - Creative Tim Officer
                                    </div>
                                    <div className="mb-2 text-blueGray-600 flex flex-col lg:flex-row justify-center items-center">
                                        {/*<i className="fas fa-gamepad mr-2 text-lg text-blueGray-400"></i>*/}
                                        <div className='flex flex-wrap gap-y-3 mt-4'>
                                            <div className='basis-full md:basis-1/2 lg:basis-1/3 mx-8 md:mx-0'>
                                                <LeagueOfLegendsBox endorsements='12' />
                                            </div>
                                            <div className='basis-full md:basis-1/2 lg:basis-1/3 mx-8 md:mx-0'>
                                                <CsgoBox />
                                            </div>
                                            <div className='basis-full md:basis-1/2 lg:basis-1/3 mx-8 md:mx-0'>
                                                <DotaBox endorsements='4' />
                                            </div>
                                            <div className='basis-full md:basis-1/2 lg:basis-1/3 mx-8 md:mx-0'>
                                                <RocketLeagueBox />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                An artist of considerable range, Jenna the name taken by
                                                Melbourne-raised, Brooklyn-based Nick Murphy writes,
                                                performs and records all of his own music, giving it a
                                                warm, intimate feel with a solid groove structure. An
                                                artist of considerable range.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Page>
    );
}

export default Index;
