import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {InertiaLink} from "@inertiajs/inertia-react";
import NotificationBell from "@/Components/Page/Topbar/NotificationBell";
import route from "@/Services/route";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Topbar = ({ open }) => {
  return (
      <div className={`${open ? 'pr-72' : 'pr-20'} flex fixed w-full h-24 bg-[#FEFFFE] z-40 border border-t-0 border-x-0 border-b-gray-200 duration-300`}>
          <form className='basis-2/6 pt-4 pl-4 mx-auto'>
              <label htmlFor="default-search"
                     className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none"
                           stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                  </div>
                  <input type="search" id="default-search"
                         className="block w-full p-4 pl-10 text-sm text-gray-900 border border-indigo-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-indigo-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Search users" required />
                  <button type="submit"
                          className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                  </button>
              </div>
          </form>
          <ul className='flex items-center'>
              <li className='px-4'>
                  <NotificationBell />
              </li>
              <li className='px-4'>
                  <Menu as="div" className="relative inline-block text-left">
                      <div>
                          <Menu.Button className="inline-flex w-full justify-center px-4 py-2 hover:opacity-90">
                              {/*Options*/}
                              {/*<ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />*/}
                              <img className="w-14 h-14 rounded-full p-1 ring-2 ring-gray-300" src="/assets/images/avatar.jpg" alt="Rounded avatar" />
                          </Menu.Button>
                      </div>

                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                  <Menu.Item>
                                      {({ active }) => (
                                          <InertiaLink
                                              href={route('profile')}
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              View profile
                                          </InertiaLink>
                                      )}
                                  </Menu.Item>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href="#"
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Edit profile
                                          </a>
                                      )}
                                  </Menu.Item>
                              </div>
                              <div className="py-1">
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href="#"
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Archive
                                          </a>
                                      )}
                                  </Menu.Item>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href="#"
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Move
                                          </a>
                                      )}
                                  </Menu.Item>
                              </div>
                              <div className="py-1">
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href="#"
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Share
                                          </a>
                                      )}
                                  </Menu.Item>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href="#"
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Add to favorites
                                          </a>
                                      )}
                                  </Menu.Item>
                              </div>
                              <div className="py-1">
                                  <Menu.Item>
                                      {({ active }) => (
                                          <InertiaLink
                                              href={route('logout')}
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Logout
                                          </InertiaLink>
                                      )}
                                  </Menu.Item>
                              </div>
                          </Menu.Items>
                      </Transition>
                  </Menu>
              </li>
          </ul>
      </div>
  );
}

export default Topbar;
