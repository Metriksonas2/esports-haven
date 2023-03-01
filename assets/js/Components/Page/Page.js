import React, {Fragment} from 'react';
import Sidebar from "@/Components/Sidebar/Sidebar";
import {Menu, Transition} from "@headlessui/react";
import route from "@/Services/route";
import {InertiaLink} from "@inertiajs/inertia-react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Page = ({ pageIndex, children }) => {
  return (
      <div className='flex'>
          <Sidebar pageIndex={pageIndex} />
          <div className="h-screen flex flex-col flex-1 pb-7 bg-[#F0F4F9]">
              <div className='flex justify-end h-24 pr-8 bg-[#FEFFFE]'>
                  <ul className='flex items-center'>
                      <li>
                          <Menu as="div" className="relative inline-block text-left">
                              <div>
                                  <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-indigo-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                      Options
                                      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
                                                  <a
                                                      href="#"
                                                      className={classNames(
                                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                          'block px-4 py-2 text-sm'
                                                      )}
                                                  >
                                                      Edit
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
                                                      Duplicate
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
                                          <Menu.Item disabled>
                                              {({ active }) => (
                                                  <a
                                                      href="#"
                                                      className={classNames(
                                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                          'block px-4 py-2 text-sm'
                                                      )}
                                                  >
                                                      Delete
                                                  </a>
                                              )}
                                          </Menu.Item>
                                      </div>
                                  </Menu.Items>
                              </Transition>
                          </Menu>
                      </li>
                      <li className='px-4'>
                          <InertiaLink href={route('logout')}>Logout</InertiaLink>
                      </li>
                  </ul>
              </div>
              <div className='w-full px-7 pt-7'>
                  {children}
              </div>
          </div>
      </div>
  );
}

export default Page;