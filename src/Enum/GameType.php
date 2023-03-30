<?php

namespace App\Enum;

enum GameType: string
{
    case NONE = "none";
    case LEAGUE_OF_LEGENDS = "League of Legends";
    case DOTA_2 = "Dota 2";
    case CSGO = "CS:GO";
    case VALORANT = "Valorant";
    case ROCKET_LEAGUE = "Rocket League";
    case BRAWLHALLA = "Brawlhalla";
}
