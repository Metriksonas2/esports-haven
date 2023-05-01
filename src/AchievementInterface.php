<?php

namespace App;

use App\Entity\User;

interface AchievementInterface
{
    public static function getName(): string;

    public function check(User $user): bool;
}