<?php

namespace App\Achievement;

use App\AchievementInterface;
use App\Entity\User;
use App\Enum\AchievementType;

class UnstoppableForceAchievement implements AchievementInterface
{
    public static function getName(): string
    {
        return AchievementType::UNSTOPPABLE_FORCE->value;
    }

    public function check(User $user): bool
    {
        // TODO: Implement check() method.
    }
}