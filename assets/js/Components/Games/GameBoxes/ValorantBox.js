import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const ValorantBox = ({ endorsements = 0 }) => {
    return (
        <GameBox gameName='Valorant'
                 image='/assets/images/games/icons/valorant_icon.png'
                 alt='Valorant icon'
                 endorsements={endorsements}
        />
    );
}

export default ValorantBox;
