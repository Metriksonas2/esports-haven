<?php

namespace App\Enum;

enum AchievementType: string
{
    case FIRST_TASTE = 'first_taste';
    case UNSTOPPABLE_FORCE = 'unstoppable_force';
    case VENI_VIDI_VICI = 'veni_vidi_vici';

    public static function getAchievementData(self $achievement)
    {
        $achievements = [
            self::FIRST_TASTE->name => [
                'name' => self::FIRST_TASTE->value,
                'title' => 'First taste',
                'description' => 'Win a tournament'
            ],
            self::UNSTOPPABLE_FORCE->name => [
                'name' => self::UNSTOPPABLE_FORCE->value,
                'title' => 'Unstoppable force',
                'description' => 'Win 10 matches'
            ],
            self::VENI_VIDI_VICI->name => [
                'name' => self::VENI_VIDI_VICI->value,
                'title' => 'Veni, vidi, vici',
                'description' => 'Win a tournament in 3 different games'
            ],
        ];

        return $achievements[$achievement->name];
    }
}
