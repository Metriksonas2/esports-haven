<?php

namespace App\Enum;

enum AchievementType: string
{
    case FIRST_TASTE = 'first_taste';
    case JACK_OF_ALL_TRADES = 'jack_of_all_trades';
    case UNSTOPPABLE_FORCE = 'unstoppable_force';
    case VENI_VIDI_VICI = 'veni_vidi_vici';
    case FUTURE_PLANS = 'future_plans';
    case MR_WORLDWIDE = 'mr_worldwide';

    public static function getAchievementData(self $achievement)
    {
        $achievements = [
            self::FIRST_TASTE->name => [
                'name' => self::FIRST_TASTE->value,
                'title' => 'First taste',
                'description' => 'Win a tournament.'
            ],
            self::JACK_OF_ALL_TRADES->name => [
                'name' => self::JACK_OF_ALL_TRADES->value,
                'title' => 'Jack of all trades',
                'description' => "Win 5 tournaments! Woah!"
            ],
            self::UNSTOPPABLE_FORCE->name => [
                'name' => self::UNSTOPPABLE_FORCE->value,
                'title' => 'Unstoppable force',
                'description' => 'Win 10 matches.'
            ],
            self::VENI_VIDI_VICI->name => [
                'name' => self::VENI_VIDI_VICI->value,
                'title' => 'Veni, vidi, vici',
                'description' => 'Win a tournament in 3 different games, expert!'
            ],
            self::FUTURE_PLANS->name => [
                'name' => self::FUTURE_PLANS->value,
                'title' => 'Future plans',
                'description' => 'Host a tournament'
            ],
            self::MR_WORLDWIDE->name => [
                'name' => self::MR_WORLDWIDE->value,
                'title' => 'Mr. Worldwide',
                'description' => 'Make 5 friends, you friendly human!'
            ],
        ];

        return $achievements[$achievement->name];
    }
}
