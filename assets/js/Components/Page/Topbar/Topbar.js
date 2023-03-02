import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/20/solid";
import {InertiaLink} from "@inertiajs/inertia-react";
import route from "@/Services/route";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Topbar = ({ open }) => {
  return (
      <div className={`${open ? 'pr-72' : 'pr-20'} flex fixed w-full justify-end h-24 bg-[#FEFFFE] z-40 border border-t-0 border-x-0 border-b-gray-200 duration-300`}>
          <ul className='flex items-center'>
              <li className='px-4'>
                  <img className="w-12 h-12 rounded-full p-1 ring-2 ring-gray-300" src="/assets/images/avatar.png" alt="Rounded avatar" />
              </li>
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
              <li className='px-4'>
                  <InertiaLink href={route('logout')}>Logout</InertiaLink>
              </li>
          </ul>
      </div>
  );
}

export default Topbar;
