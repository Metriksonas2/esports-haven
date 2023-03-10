import React from 'react';
import Participants from '@/Components/Tournaments/Table/Participants';
import Status from "@/Components/Tournaments/Table/Status";
import Host from "@/Components/Tournaments/Table/Host";
import Actions from "@/Components/Tournaments/Table/Actions/Actions";
import route from "@/Services/route";

const Table = ({ tournaments }) => {
    return (
        <div className="overflow-x-auto">
            <div className="min-w-full min-h-full bg-gray-100 flex bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-11/12">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Tournament</th>
                                <th className="py-3 px-6 text-left">Host</th>
                                <th className="py-3 px-6 text-center">Participants</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {tournaments.map(({ id, name, game, bracketType, host }, index) => {
                                return (
                                    <tr key={id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-gray-100`}>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">
                                                    <img className="w-8 h-8 rounded-full" src="/assets/images/default-tournament-icon.png" alt="Default tournament icon" />
                                                </div>
                                                <span className="font-medium">{name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            <Host name={host.username} />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Participants />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Status status='Active' />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <Actions viewRoute={route('tournaments', id)} editRoute={''} deleteRoute={''} />
                                        </td>
                                    </tr>
                                );
                            })}
                            {/*<tr className="border-b border-gray-200 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left whitespace-nowrap">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8 rounded-full" src="/assets/images/default-tournament-icon.png" alt="Default tournament icon" />*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">React Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Eshal Rosas</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Active' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/100/000000/vue-js.png"/>*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">Vue Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/women/2.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Anita Rodriquez</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Completed' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/100/000000/angularjs.png"/>*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">Angular Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/3.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Taylan Bush</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Scheduled' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/laravel-64.png"/>*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">Laravel Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/4.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Tarik Novak</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Pending' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/48/000000/git.png" />*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">GIT Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/5.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Oscar Howard</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Active' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/48/000000/nodejs.png" />*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">NodeJS Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/women/6.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Melisa Moon</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Scheduled' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/48/000000/javascript.png"/>*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">JavaScript Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/women/7.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Cora Key</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Pending' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            {/*<tr className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-8 h-8" src="https://img.icons8.com/color/48/000000/php.png"/>*/}
                            {/*            </div>*/}
                            {/*            <span className="font-medium">PHP Project</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-left">*/}
                            {/*        <div className="flex items-center">*/}
                            {/*            <div className="mr-2">*/}
                            {/*                <img className="w-6 h-6 rounded-full" src="https://randomuser.me/api/portraits/men/8.jpg"/>*/}
                            {/*            </div>*/}
                            {/*            <span>Kylan Dorsey</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Participants />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <Status status='Pending' />*/}
                            {/*    </td>*/}
                            {/*    <td className="py-3 px-6 text-center">*/}
                            {/*        <div className="flex item-center justify-center">*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">*/}
                            {/*                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                            {/*                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />*/}
                            {/*                </svg>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;
