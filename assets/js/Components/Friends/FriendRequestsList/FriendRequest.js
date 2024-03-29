import React from 'react';
import route from "@/Services/route";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import axios from "axios";
import toast from "react-hot-toast";
import {getGameIcon} from "@/Services/GameData";

const FriendRequest = ({ index, friendRequest, selectedGames, acceptHandler, declineHandler }) => {
    const id = friendRequest.id;
    const firstName = friendRequest.firstName;
    const lastName = friendRequest.lastName;
    const email = friendRequest.email;
    // const position = friendRequest.position;
    // const country = friendRequest.country;
    const position = 'PHP Developer';
    const country = 'Lithuania';

    const fullName = firstName + ' ' + lastName;

    const acceptFriendRequestHandler = async (e) => {
        e.preventDefault();

        try {
            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

            const response = await axios.post(`/api/friends/accept/${id}`, {}, {
                headers: headers
            });

            toast.success(`You're now friends with ${firstName}!`)

            acceptHandler(friendRequest);
        } catch (error) {
            toast.error('Something went wrong... Please try again later')
            console.log(error);
        }
    }

    const declineFriendRequestHandler = async (e) => {
        e.preventDefault();

        try {
            const headers = { 'Content-Type': 'application/json;charset=UTF-8' };

            const response = await axios.post(`/api/friends/decline/${id}`, {}, {
                headers: headers
            });

            toast.success(`Successfully declined!`)

            declineHandler(id, index);
        } catch (error) {
            toast.error('Something went wrong... Please try again later')
            console.log(error);
        }
    }

    return (
        <tr className="hover:bg-gray-100">
            {/*<td className="p-4 w-4">*/}
            {/*    <div className="flex items-center">*/}
            {/*        <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"*/}
            {/*               className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />*/}
            {/*        <label htmlFor="checkbox-1" className="sr-only">checkbox</label>*/}
            {/*    </div>*/}
            {/*</td>*/}
            <td>
                <a href={route('user', id)} className='flex items-center p-4 whitespace-nowrap space-x-6 mr-12 lg:mr-0'>
                    <img className="h-10 w-10 rounded-full"
                         src="/assets/images/avatar.jpg"
                         alt="Avatar" />
                    <div className="text-sm font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">{fullName}</div>
                        <div className="text-sm font-normal text-gray-500">
                            {email}
                        </div>
                    </div>
                </a>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                <div className="flex items-center gap-x-2">
                    {selectedGames.map(game => (
                        <img className='w-6 h-6' src={getGameIcon(game)} alt=""/>
                    ))}
                </div>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                {country}
            </td>
            <td className="p-4 whitespace-nowrap space-x-2">
                <button type="button"
                        className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg font-semibold text-xs inline-flex gap-2 items-center px-3 py-2 text-center"
                        onClick={acceptFriendRequestHandler}
                >
                    <CheckIcon className='w-6 text-white' />
                    Accept
                </button>
                <button type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg font-semibold text-xs inline-flex gap-2 items-center px-3 py-2 text-center"
                        onClick={declineFriendRequestHandler}
                >
                    <XMarkIcon className='w-6 text-white' />
                    Decline
                </button>
            </td>
        </tr>
    );
}

export default FriendRequest;
