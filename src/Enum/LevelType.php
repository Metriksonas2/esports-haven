<?php

namespace App\Enum;

enum LevelType: int
{
    case LEVEL_1 = 0;
    case LEVEL_2 = 100;
    case LEVEL_3 = 200;
    case LEVEL_4 = 300;
    case LEVEL_5 = 400;
    case LEVEL_6 = 500;
    case LEVEL_7 = 600;
    case LEVEL_8 = 700;
    case LEVEL_9 = 800;
    case LEVEL_10 = 900;

    public static function getLastLevel(): int
    {
        return count(self::cases());
    }
}