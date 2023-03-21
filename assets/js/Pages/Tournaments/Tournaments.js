import React, {useState} from 'react';
import route from "@/Services/route";

import Page from "@/Components/Page/Page";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import {PencilSquareIcon} from "@heroicons/react/24/solid";
import Table from "@/Components/Tournaments/Table/Table";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState(JSON.parse(usePage().props.tournaments));

  return (
      <Page pageIndex='tournaments'>
          <div className="flex items-center justify-between mb-6">
              <InertiaLink
                className="btn-indigo focus:outline-none"
                href={route('tournaments.create')}
              >
                <span>Create</span>
                <span className="hidden md:inline"> Tournament</span>
              </InertiaLink>
          </div>
          <Table tournaments={tournaments} />
      {/*<div>*/}
      {/*  <h1 className="mb-8 text-3xl font-bold">Tournaments</h1>*/}
      {/*  <div className="flex items-center justify-between mb-6">*/}
      {/*    <InertiaLink*/}
      {/*        className="btn-indigo focus:outline-none"*/}
      {/*        href={route('tournaments.create')}*/}
      {/*    >*/}
      {/*      <span>Create</span>*/}
      {/*      <span className="hidden md:inline"> Tournament</span>*/}
      {/*    </InertiaLink>*/}
      {/*  </div>*/}
      {/*  <div className="overflow-x-auto bg-white rounded shadow">*/}
      {/*    <table className="w-full whitespace-nowrap">*/}
      {/*      <thead>*/}
      {/*      <tr className="font-bold text-left">*/}
      {/*        <th className="px-6 pt-5 pb-4">Name</th>*/}
      {/*        <th className="px-6 pt-5 pb-4">Game</th>*/}
      {/*        <th className="px-6 pt-5 pb-4" colSpan="2">*/}
      {/*          Bracket type*/}
      {/*        </th>*/}
      {/*      </tr>*/}
      {/*      </thead>*/}
      {/*      <tbody>*/}
      {/*      {tournaments.map(({ id, name, game, bracketType }) => {*/}
      {/*        return (*/}
      {/*            <tr*/}
      {/*                key={id}*/}
      {/*                className="hover:bg-gray-100 focus-within:bg-gray-100"*/}
      {/*            >*/}
      {/*              <td className="border-t">*/}
      {/*                <InertiaLink*/}
      {/*                    href={route('tournaments', id)}*/}
      {/*                    className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"*/}
      {/*                >*/}
      {/*                  {name}*/}
      {/*                </InertiaLink>*/}
      {/*              </td>*/}
      {/*              <td className="border-t">*/}
      {/*                <InertiaLink*/}
      {/*                    tabIndex="-1"*/}
      {/*                    href={route('tournaments', id)}*/}
      {/*                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"*/}
      {/*                >*/}
      {/*                  {game}*/}
      {/*                </InertiaLink>*/}
      {/*              </td>*/}
      {/*              <td className="border-t">*/}
      {/*                <InertiaLink*/}
      {/*                    tabIndex="-1"*/}
      {/*                    href={route('tournaments', id)}*/}
      {/*                    className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"*/}
      {/*                >*/}
      {/*                  {bracketType}*/}
      {/*                </InertiaLink>*/}
      {/*              </td>*/}
      {/*              <td className="w-px border-t">*/}
      {/*                <InertiaLink*/}
      {/*                    tabIndex="-1"*/}
      {/*                    href={route('tournaments', id)}*/}
      {/*                    className="flex items-center px-4 focus:outline-none"*/}
      {/*                >*/}
      {/*                  <PencilSquareIcon className='w-6' />*/}
      {/*                </InertiaLink>*/}
      {/*              </td>*/}
      {/*            </tr>*/}
      {/*        );*/}
      {/*      })}*/}
      {/*      {tournaments.length === 0 && (*/}
      {/*          <tr>*/}
      {/*            <td className="px-6 py-4 border-t" colSpan="4">*/}
      {/*              No tournaments found.*/}
      {/*            </td>*/}
      {/*          </tr>*/}
      {/*      )}*/}
      {/*      </tbody>*/}
      {/*    </table>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </Page>
  );
}

export default Tournaments;
