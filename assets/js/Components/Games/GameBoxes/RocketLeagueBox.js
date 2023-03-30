import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const RocketLeagueBox = ({ endorsements = 0 }) => {
    return (
        <GameBox gameName='Rocket League'
                 image='/assets/images/games/icons/rocket_league_icon.webp'
                 alt='Rocket League icon'
                 endorsements={endorsements}
        />
    );
}

export default RocketLeagueBox;
