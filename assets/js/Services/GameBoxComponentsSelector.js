import React from 'react';
import LeagueOfLegendsBox from "@/Components/Games/GameBoxes/LeagueOfLegendsBox";
import DotaBox from "@/Components/Games/GameBoxes/DotaBox";
import CsgoBox from "@/Components/Games/GameBoxes/CsgoBox";
import RocketLeagueBox from "@/Components/Games/GameBoxes/RocketLeagueBox";
import ValorantBox from "@/Components/Games/GameBoxes/ValorantBox";
import BrawlhallaBox from "@/Components/Games/GameBoxes/BrawlhallaBox";

const getGameBox = (game, endorsements) => {
    switch (game) {
        case "League of Legends":
            return <LeagueOfLegendsBox endorsements={endorsements} />;
        case "Dota 2":
            return <DotaBox endorsements={endorsements} />;
        case "CS:GO":
            return <CsgoBox endorsements={endorsements} />;
        case "Rocket League":
            return <RocketLeagueBox endorsements={endorsements} />;
        case "Valorant":
            return <ValorantBox endorsements={endorsements} />;
        case "Brawlhalla":
            return <BrawlhallaBox endorsements={endorsements} />;
    }
}

export { getGameBox, };