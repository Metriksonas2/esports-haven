<?php

namespace App\Enum;

enum ExperiencePointsType: int
{
    case FRIEND_ADDED = 5;
    case MATCH_LOSS = 10;
    case TOURNAMENT_HOST = 15;
    case MATCH_WIN = 20;
    case TOURNAMENT_WIN = 50;
}
