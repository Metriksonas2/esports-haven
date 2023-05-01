<?php

namespace App\Service;

use App\AchievementInterface;
use App\Entity\Achievement;
use App\Entity\User;
use App\Enum\AchievementType;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;

class AchievementService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @throws \Exception
     */
    public function unlockAchievement(User $user, AchievementType $achievementType): void
    {
        $achievement = $this->entityManager->getRepository(Achievement::class)->findOneBy([
            'name' => $achievementType->value,
        ]);

        if ($achievement !== null) {
            $user->addAchievement($achievement);

            $this->entityManager->flush();
        } else {
            throw new \Exception('Achievement is not in the database, please check and try again...');
        }
    }

    public function hasAchievement(User $user, AchievementType $achievementType): bool
    {
        $achievements = $user->getAchievements();

        foreach ($achievements as $achievement) {
            if ($achievement->getName() === $achievementType->value) {
                return true;
            }
        }
        return false;
    }

    public function checkForAchievement(User $user, AchievementInterface $achievement): bool
    {
        return $achievement->check($user);
    }

    public function formatAchievementsForRendering(User $user): array
    {
        $achievements = [];

        foreach (AchievementType::cases() as $achievementType) {
            $achievementsDataArray = AchievementType::getAchievementData($achievementType);
            $achievementsDataArray['earned'] = $this->hasAchievement($user, $achievementType);
            $achievementsDataArray['image'] = $this->getAchievementImage($achievementType);

            $achievements[] = $achievementsDataArray;
        }

        return $achievements;
    }

    public function getAchievementImage(AchievementType $achievementType): string
    {
        return '/assets/images/achievements/' . $achievementType->value . '.png';
    }
}