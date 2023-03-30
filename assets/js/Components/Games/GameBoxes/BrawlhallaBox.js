import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const BrawlhallaBox = ({ endorsements = 0 }) => {
    return (
        <GameBox gameName='Brawlhalla'
                 image='/assets/images/games/icons/brawlhalla_icon.ico'
                 alt='Brawlhalla icon'
                 endorsements={endorsements}
        />
    );
}

export default BrawlhallaBox;
