<?php

namespace App\Service;

use App\Entity\User;
use App\Enum\ExperiencePointsType;
use App\Enum\LevelType;
use Doctrine\ORM\EntityManagerInterface;

class LevelingService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function checkLevelUp(User $user, $fromDb = true, $newExperiencePoints = null): void
    {
        $nextLevel = $user->getLevel() + 1;
        $levels = LevelType::cases();

        if ($fromDb) {
            if ($nextLevel <= LevelType::getLastLevel() && ($currentXp = $user->getExperiencePoints()) >= $levels[$nextLevel - 1]->value) {
                $exceededXp = $currentXp - $levels[$nextLevel - 1]->value;
                $user->setLevel($nextLevel);
                $user->setExperiencePoints($exceededXp);
            }
        } else {
            if ($nextLevel <= LevelType::getLastLevel() && $newExperiencePoints >= $levels[$nextLevel - 1]->value) {
                $exceededXp = $newExperiencePoints - $levels[$nextLevel - 1]->value;
                $user->setLevel($nextLevel);
                $user->setExperiencePoints($exceededXp);
            }
        }
    }

    public function addExperiencePoints(User $user, ExperiencePointsType $type): void
    {
        $currentXp = $user->getExperiencePoints();
        $newXp = $currentXp + $type->value;
        $user->setExperiencePoints($newXp);
        $this->checkLevelUp($user, false, $newXp);
    }

    public function getUserPercentage(User $user): int
    {
        $currentXp = $user->getExperiencePoints();
        $currentLevel = $user->getLevel();
        $nextLevel = $currentLevel + 1;
        $levels = LevelType::cases();

        if ($currentLevel < LevelType::getLastLevel()) {
            $targetXp = $levels[$nextLevel - 1]->value;

            return floor($currentXp * 100 / $targetXp);
        }

        return 100;
    }
}