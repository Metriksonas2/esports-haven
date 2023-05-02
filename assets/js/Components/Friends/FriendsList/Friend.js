import React from 'react';
import axios from 'axios';
import {UserMinusIcon} from "@heroicons/react/24/solid";
import route from "@/Services/route";
import ModalButton from "@/Components/UI/Modal/ModalButton";
import toast from "react-hot-toast";
import {getGameIcon} from "../../../Services/GameIcons";

const Friend = ({ friend, selectedGames, removeFriendHandler }) => {
    const fullName = friend.firstName + ' ' + friend.lastName;

    const removeFriendApiCall = async () => {
        try {
            await axios.delete(`/api/friends/${friend.id}`);
            toast.success('Friend has been removed!');

            removeFriendHandler(friend.id);
        } catch (error) {
            toast.error('Something went wrong... Please try again later');
            console.error(error); // log any errors
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
                <a href={route('user', friend.id)} className='flex items-center p-4 whitespace-nowrap space-x-6 mr-12 lg:mr-0'>
                    <img className="h-10 w-10 rounded-full"
                         src={friend.profileImage}
                         alt="Avatar" />
                    <div className="text-sm font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">{fullName}</div>
                        <div className="text-sm font-normal text-gray-500">
                            {friend.email}
                        </div>
                    </div>
                </a>
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                {friend.position}
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                {friend.country}
            </td>
            <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                <div className="flex items-center gap-x-2">
                    {selectedGames.map(game => (
                        <img className='w-6 h-6' src={getGameIcon(game)} alt=""/>
                    ))}
                </div>
            </td>
            <td className="p-4 whitespace-nowrap space-x-2">
                <ModalButton
                    className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg font-semibold text-xs inline-flex gap-2 items-center px-3 py-2 text-center'
                    title='Are you sure you want to remove this friend?'
                    message=''
                    onYesClick={removeFriendApiCall}
                    onNoClick={() => console.log('declined')}
                >
                    <UserMinusIcon className='w-6 text-white' />
                    Remove friend
                </ModalButton>
            </td>
        </tr>
    );
}

export default Friend;
