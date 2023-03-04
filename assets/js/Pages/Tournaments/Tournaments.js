import React, {useState} from 'react';
import route from "@/Services/route";

import Page from "@/Components/Page/Page";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import {PencilSquareIcon} from "@heroicons/react/24/solid";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState(usePage().props.tournaments);

  const data = [
    {
      id: 1,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 2,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 3,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 4,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
    {
      id: 5,
      name: 'Test',
      city: 'Kaunas',
      phone: '888-396-1844',
      deleted_at: false
    },
  ];

  return (
    <Page pageIndex='tournaments'>
      <div>
        <h1 className="mb-8 text-3xl font-bold">Tournaments</h1>
        <div className="flex items-center justify-between mb-6">
          {/*<SearchFilter />*/}
          <InertiaLink
              className="btn-indigo focus:outline-none"
              href={route('tournaments.create')}
          >
            <span>Create</span>
            <span className="hidden md:inline"> Tournament</span>
          </InertiaLink>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full whitespace-nowrap">
            <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Name</th>
              <th className="px-6 pt-5 pb-4">Game</th>
              <th className="px-6 pt-5 pb-4" colSpan="2">
                Bracket type
              </th>
            </tr>
            </thead>
            <tbody>
            {tournaments.map(({ id, name, game, bracketType }) => {
              return (
                  <tr
                      key={id}
                      className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                          href={route('tournaments', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                      >
                        {name}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                          tabIndex="-1"
                          href={route('tournaments', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {game}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                          tabIndex="-1"
                          href={route('tournaments', id)}
                          className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {bracketType}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                          tabIndex="-1"
                          href={route('tournaments', id)}
                          className="flex items-center px-4 focus:outline-none"
                      >
                        <PencilSquareIcon className='w-6' />
                        {/*<img*/}
                        {/*    src="/assets/images/arrow.png"*/}
                        {/*    className='block w-7 h-6 border-indigo-900 border-2 rounded-full'*/}
                        {/*/>*/}
                        {/*<Icon*/}
                        {/*    name="cheveron-right"*/}
                        {/*    className="block w-6 h-6 text-gray-400 fill-current"*/}
                        {/*/>*/}
                      </InertiaLink>
                    </td>
                  </tr>
              );
            })}
            {data.length === 0 && (
                <tr>
                  <td className="px-6 py-4 border-t" colSpan="4">
                    No organizations found.
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

export default Tournaments;