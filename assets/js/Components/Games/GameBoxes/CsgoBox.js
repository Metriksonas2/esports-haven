import React from 'react';
import GameBox from "@/Components/Games/GameBoxes/GameBox";

const CsgoBox = () => {
    return (
        <GameBox gameName='CS:GO'
                 image='/assets/images/games/icons/csgo_icon.webp'
                 alt='CS:GO icon'
        />
    );
}

export default CsgoBox;
