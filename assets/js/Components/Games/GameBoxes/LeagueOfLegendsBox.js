import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const LeagueOfLegendsBox = ({ endorsements = 0 }) => {
    return (
        <GameBox gameName='League of Legends'
                 image='/assets/images/games/icons/lol_icon.png'
                 alt='LoL icon'
                 endorsements={endorsements}
        />
    );
}

export default LeagueOfLegendsBox;
