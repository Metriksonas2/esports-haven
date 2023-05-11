import React, {Fragment, useState} from 'react';
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {Menu, Transition} from "@headlessui/react";
import route from "@/Services/route";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [nav, setNav] = useState(true);

    const handleNav = () => {
        setNav(!nav);
    }

    return (
        <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-indigo-800'>
          <h1 className='w-full text-3xl font-bold text-[#00DF9A]'>eSports Haven</h1>
          <ul className='text-[#00DF9A] hidden md:flex md:gap-2 font-semibold'>
              <li className='p-4 cursor-pointer hover:border-b hover:border-b-[#00DF9A] duration-150'>
                  <a href="#home">Home</a>
              </li>
              <li className='p-4 cursor-pointer hover:border-b hover:border-b-[#00DF9A] duration-150'>
                  <a href="#about">About</a>
              </li>
              <li>
                  <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className='p-4 cursor-pointer bg-white hover:opacity-75 text-indigo-600 rounded-lg duration-150'>
                          Authentication
                      </Menu.Button>
                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className='py-1'>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href={route('login')}
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Log In
                                          </a>
                                      )}
                                  </Menu.Item>
                                  <Menu.Item>
                                      {({ active }) => (
                                          <a
                                              href={route('register')}
                                              className={classNames(
                                                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                  'block px-4 py-2 text-sm'
                                              )}
                                          >
                                              Sign Up
                                          </a>
                                      )}
                                  </Menu.Item>
                              </div>
                          </Menu.Items>
                      </Transition>
                  </Menu>
              </li>
          </ul>
          <div onClick={handleNav} className='block md:hidden'>
              {!nav && <XMarkIcon className='w-6'/> }
              {nav && <Bars3Icon className='w-6' /> }
          </div>
          <div className={!nav
              ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-indigo-200 bg-[#F0F4F9] ease-in-out duration-300'
              : 'fixed left-[-100%]'}>
              <h1 className='w-full text-3xl font-bold text-indigo-800 m-4 ml-7'>eSports Haven</h1>
              <ul className='p-4 uppercase'>
                  <li className='p-4 border-b border-b-indigo-200'>Home</li>
                  <li className='p-4 border-b border-b-indigo-200'>About</li>
                  <li className='p-4 border-b border-b-indigo-200'>Log In</li>
                  <li className='p-4'>Sign Up</li>
              </ul>
          </div>
        </div>
  );
}

export default Navbar;
