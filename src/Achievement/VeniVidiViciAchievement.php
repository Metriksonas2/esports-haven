<?php

namespace App\Achievement;

use App\AchievementInterface;
use App\Entity\User;
use App\Enum\AchievementType;

class VeniVidiViciAchievement implements AchievementInterface
{
    public static function getName(): string
    {
        return AchievementType::VENI_VIDI_VICI->value;
    }

    public function check(User $user): bool
    {
        // TODO: Implement check() method.
    }
}