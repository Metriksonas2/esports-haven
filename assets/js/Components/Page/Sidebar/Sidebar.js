import React, {useEffect, useState} from 'react';
import route from "@/Services/route";
import {InertiaLink} from "@inertiajs/inertia-react";
import {
    ChartBarSquareIcon, Cog8ToothIcon, DocumentIcon,
    NewspaperIcon,
    RocketLaunchIcon, TableCellsIcon,
    TrophyIcon, UsersIcon
} from "@heroicons/react/24/solid";
import {isSidebarOpen} from "@/Services/functions";

const Sidebar = ({ pageIndex, minimizeHandler }) => {
    const [open, setOpen] = useState(isSidebarOpen());
    const Tabs = [
        { key: 'dashboard', title: "Dashboard", src: "", icon: <TableCellsIcon className='w-6' /> },
        { key: 'tournaments', title: "Tournaments", src: "tournaments", icon: <TrophyIcon className='w-6' /> },
        { key: 'games', title: "Games", src: "games", gap: true, icon: <RocketLaunchIcon className='w-6' /> },
        { key: 'schedule', title: "Schedule ", src: "schedule", icon: <NewspaperIcon className='w-6' /> },
        { key: 'friends', title: "Friends", src: "friends", icon: <UsersIcon className='w-6' /> },
        { key: 'analytics', title: "Analytics", src: "", icon: <ChartBarSquareIcon className='w-6' /> },
        { key: 'files', title: "Files", src: "", gap: true, icon: <DocumentIcon className='w-6' /> },
        { key: 'settings', title: "Settings", src: "", icon: <Cog8ToothIcon className='w-6' /> },
    ];

    const onButtonClick = () => {
        setOpen((prevState) => {
            minimizeHandler(!prevState);
            return !prevState;
        });
    }

  return (
      <div className={
          `
                    ${open ? 'w-72' : 'w-20'}
                    bg-indigo-900 h-full p-5 pt-8 fixed duration-300
                `
      }>
          <img
              src="/assets/images/arrow.png"
              className={`absolute cursor-pointer z-50 -right-3 top-9 w-7 border-indigo-900 border-2 rounded-full ${!open && "rotate-180"}`}
              onClick={() => onButtonClick()}
          />
          <div className='flex gap-x-4 h-14 items-center align-center'>
              <img
                  src="/assets/images/logo.png"
                  className={`w-10 cursor-pointer duration-500 
                            ${open && "rotate-[360deg]"}
                        `}
              />
              <h1 className={`
                        text-2xl font-bold text-white duration-200 origin-left 
                        ${!open && "scale-0"}
                    `}>
                  <InertiaLink href={route('')} className='text-md'>eSportsHaven</InertiaLink>
              </h1>
          </div>
          <ul className='pt-6'>
              {Tabs.map((Menu, index) => (
                  <InertiaLink key={Menu.key} href={route(Menu.src)}>
                      <li
                          className={
                              `
                                flex rounded-md p-2 cursor-pointer hover:bg-indigo-600 text-white text-sm items-center gap-x-4
                                ${Menu.gap ? 'mt-9' : 'mt-2'}
                                ${Menu.key === pageIndex && "navbar__active"}
                              `
                          }
                      >
                          {Menu.icon}
                          <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    {Menu.title}
                                </span>
                      </li>
                  </InertiaLink>
              ))}
          </ul>
      </div>
  );
}

export default Sidebar;
