<?php

declare(strict_types=1);


namespace App\EventListener;

use App\Achievement\UnstoppableForceAchievement;
use App\Entity\TournamentMatch;
use App\Enum\AchievementType;
use App\Enum\ExperiencePointsType;
use App\Enum\TournamentStatusType;
use App\Event\AfterFriendAddedEvent;
use App\Event\AfterMatchPlayedEvent;
use App\Event\AfterTournamentCreatedEvent;
use App\Event\AfterTournamentEndedEvent;
use App\Service\AchievementService;
use App\Service\LevelingService;
use Doctrine\ORM\EntityManagerInterface;

class FriendListener implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;
    private LevelingService $levelingService;

    public function __construct(
        EntityManagerInterface $entityManager,
        LevelingService $levelingService,
    )
    {
        $this->entityManager = $entityManager;
        $this->levelingService = $levelingService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            AfterFriendAddedEvent::class => [
                ['addExperienceToBothFriends', 0],
            ]
        ];
    }

    public function addExperienceToBothFriends(AfterFriendAddedEvent $event): void
    {
        $userOne = $event->getUserOne();
        $userTwo = $event->getUserTwo();

        $this->levelingService->addExperiencePoints($userOne, ExperiencePointsType::FRIEND_ADDED);
        $this->levelingService->addExperiencePoints($userTwo, ExperiencePointsType::FRIEND_ADDED);
    }
}