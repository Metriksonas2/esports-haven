import React from 'react';
import {Disclosure} from "@headlessui/react";
import {ChevronUpIcon} from "@heroicons/react/24/solid";

const Match = ({ matchIndex}) => {
    return (
        <Disclosure as="div" className="mt-2">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-900 px-4 py-2 text-left text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>Match {matchIndex}</span>
                        <ChevronUpIcon
                            className={`${
                                open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-white`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 flex flex-col gap-y-5">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
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
    );
}

export default Match;
