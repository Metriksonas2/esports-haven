<?php

namespace App\Achievement;

use App\AchievementInterface;
use App\Entity\User;
use App\Enum\AchievementType;

class FirstTasteAchievement implements AchievementInterface
{

    public static function getName(): string
    {
        return AchievementType::FIRST_TASTE->value;
    }

    public function check(User $user): bool
    {
        // TODO: Implement check() method.
    }
}