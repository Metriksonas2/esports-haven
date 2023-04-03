import React from 'react';
import {UserMinusIcon} from "@heroicons/react/24/solid";
import route from "@/Services/route";

const Friend = ({ id, firstName, lastName, email, position, country }) => {
    const fullName = firstName + ' ' + lastName;

    return (
        <tr className="hover:bg-gray-100">
            <td className="p-4 w-4">
                <div className="flex items-center">
                    <input id="checkbox-1" aria-describedby="checkbox-1" type="checkbox"
                           className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-cyan-200 h-4 w-4 rounded" />
                    <label htmlFor="checkbox-1" className="sr-only">checkbox</label>
                </div>
            </td>
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
                {position}
            </td>
            <td className="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                {country}
            </td>
            <td className="p-4 whitespace-nowrap text-base font-normal text-gray-900">
                <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                    Active
                </div>
            </td>
            <td className="p-4 whitespace-nowrap space-x-2">
                {/*<button type="button" data-modal-toggle="user-modal"*/}
                {/*        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center">*/}
                {/*    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20"*/}
                {/*         xmlns="http://www.w3.org/2000/svg">*/}
                {/*        <path*/}
                {/*            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>*/}
                {/*        <path fill-rule="evenodd"*/}
                {/*              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"*/}
                {/*              clip-rule="evenodd"></path>*/}
                {/*    </svg>*/}
                {/*    Edit user*/}
                {/*</button>*/}
                <button type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg font-semibold text-xs inline-flex gap-2 items-center px-3 py-2 text-center">
                    <UserMinusIcon className='w-6 text-white' />
                    Remove friend
                </button>
            </td>
        </tr>
    );
}

export default Friend;
