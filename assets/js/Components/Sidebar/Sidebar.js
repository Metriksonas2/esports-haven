import React, {useState} from 'react';
import route from "@/Services/route";
import {InertiaLink} from "@inertiajs/inertia-react";
import {ChartBarSquareIcon} from "@heroicons/react/20/solid";

const Sidebar = ({ pageIndex }) => {
    const [open, setOpen] = useState(true);
    const Tabs = [
        { key: 'dashboard', title: "Dashboard", src: "" },
        { key: 'tournaments', title: "Tournaments", src: "tournaments" },
        { key: 'accounts', title: "Accounts", src: "", gap: true },
        { key: 'schedule', title: "Schedule ", src: "" },
        { key: 'search', title: "Search", src: "" },
        { key: 'analytics', title: "Analytics", src: "" },
        { key: 'files', title: "Files", src: "", gap: true },
        { key: 'setting', title: "Setting", src: "" },
    ];

  return (
      <div className={
          `
                    ${open ? 'w-72' : 'w-20'}
                    bg-indigo-900 h-screen p-5 pt-8 relative duration-300
                `
      }>
          <img
              src="/assets/images/arrow.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-indigo-900 border-2 rounded-full ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
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
                          <ChartBarSquareIcon className='w-6' />
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
