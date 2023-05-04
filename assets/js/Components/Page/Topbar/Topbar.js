import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {InertiaLink} from "@inertiajs/inertia-react";
import NotificationBell from "@/Components/Page/Topbar/NotificationBell";
import route from "@/Services/route";
import axios from "axios";
import Search from "@/Components/Page/Topbar/Search/Search";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Topbar = ({ open }) => {
  const [profileImage, setProfileImage] = useState('/assets/images/avatar_placeholder.png');

  useEffect(() => {
      const profileImageInLocalStorage = window.localStorage.getItem('profile-image');
      const profileImageSynced = window.localStorage.getItem('profile-image-synced') === 'true';

      if (profileImageInLocalStorage === null || !profileImageSynced) {
          (async () => {
              await axios.get('/api/users/profileimage')
                  .then(response => {
                      const imageData = response.data;
                      setProfileImage(response.data.path);
                      window.localStorage.setItem('profile-image', response.data.path);
                  })
                  .catch(error => {
                      console.log(error);
                  });
          })()

          window.localStorage.setItem('profile-image-synced', 'true')
      } else {
          setProfileImage(profileImageInLocalStorage);
      }
  }, []);

  return (
      <div className={`${open ? 'pr-72' : 'pr-20'} flex fixed w-full h-24 bg-[#FEFFFE] z-40 border border-t-0 border-x-0 border-b-gray-200 duration-300`}>
          <form className='basis-2/6 pt-4 pl-4 mx-auto'>
              <Search />
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
                              <img className="w-14 h-14 rounded-full p-1 ring-2 ring-gray-300" src={profileImage} alt="Rounded avatar" />
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
                                          <InertiaLink
                                              href={route('profile.edit')}
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Edit profile
                                          </InertiaLink>
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
