import React from 'react';

import './TournamentsList.css';
import Tournament from "@/Components/Tournaments/Tournament/Tournament";

const TournamentsList = ({tournaments, onDelete}) => {
  return (
    <ul className='tournaments-list'>
      {tournaments.map(tournament => (
          <Tournament key={tournament.id} id={tournament.id} onDelete={onDelete}>
            {tournament.name}
          </Tournament>
      ))}
    </ul>
  );
}

export default TournamentsList;
