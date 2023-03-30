import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const DotaBox = ({ endorsements = 0 }) => {
    return (
        <GameBox gameName='Dota 2'
                 image='/assets/images/games/icons/dota_icon.png'
                 alt='Dota 2 icon'
                 endorsements={endorsements}
        />
    );
}

export default DotaBox;
