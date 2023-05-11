<?php

declare(strict_types=1);


namespace App\EventListener;

use App\Achievement\UnstoppableForceAchievement;
use App\Entity\TournamentMatch;
use App\Enum\AchievementType;
use App\Enum\ExperiencePointsType;
use App\Enum\TournamentStatusType;
use App\Event\AfterMatchPlayedEvent;
use App\Event\AfterTournamentCreatedEvent;
use App\Event\AfterTournamentEndedEvent;
use App\Service\AchievementService;
use App\Service\LevelingService;
use Doctrine\ORM\EntityManagerInterface;

class TournamentListener implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;
    private LevelingService $levelingService;
    private AchievementService $achievementService;

    public function __construct(
        EntityManagerInterface $entityManager,
        LevelingService $levelingService,
        AchievementService $achievementService,
    )
    {
        $this->entityManager = $entityManager;
        $this->levelingService = $levelingService;
        $this->achievementService= $achievementService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            AfterTournamentCreatedEvent::class => [
                ['checkTournamentStatus', 0],
                ['addExperienceToHost', 0],
                ['addHostAchievement', 0]
            ],
            AfterTournamentEndedEvent::class => [
                ['changeTournamentStatusAfterFinal', 0],
            ],
            AfterMatchPlayedEvent::class => [
                ['setAfterMatchTournamentData', 0]
            ],
        ];
    }

    public function checkTournamentStatus(AfterTournamentCreatedEvent $event): void
    {
        $tournament = $event->getTournament();

        if ($tournament->getStartDate() <= new \DateTime()) {
            $tournament->setStatus(TournamentStatusType::IN_PROGRESS);

            $this->entityManager->flush();
        }
    }

    public function addExperienceToHost(AfterTournamentCreatedEvent $event): void
    {
        $tournament = $event->getTournament();
        $host = $tournament->getHost();
        $this->levelingService->addExperiencePoints($host, ExperiencePointsType::TOURNAMENT_HOST);

        $this->entityManager->flush();
    }

    public function addHostAchievement(AfterTournamentCreatedEvent $event)
    {
        $tournament = $event->getTournament();
        $host = $tournament->getHost();

        if (!$this->achievementService->hasAchievement($host, AchievementType::FUTURE_PLANS)) {
            $this->achievementService->unlockAchievement($host, AchievementType::FUTURE_PLANS);
        }
    }

    public function changeTournamentStatusAfterFinal(AfterTournamentEndedEvent $event): void
    {
        $tournament = $event->getTournament();
        $tournament->setStatus(TournamentStatusType::FINISHED);

        $this->entityManager->flush();
    }

    public function setAfterMatchTournamentData(AfterMatchPlayedEvent $event)
    {
        $winner = $event->getWinnerParticipant()->getUser();
        $loser = $event->getLoserParticipant()->getUser();
        $isFinal = $event->isFinalMatch();
        $tournament = $event->getWinnerParticipant()->getTournament();

        $this->levelingService->addExperiencePoints($loser, ExperiencePointsType::MATCH_LOSS);

        if ($isFinal) {
            $this->levelingService->addExperiencePoints($winner, ExperiencePointsType::TOURNAMENT_WIN);
            $tournament->setWinner($winner);

            if (!$this->achievementService->hasAchievement($winner, AchievementType::FIRST_TASTE)) {
                $this->achievementService->unlockAchievement($winner, AchievementType::FIRST_TASTE);
            }
        } else {
            $this->levelingService->addExperiencePoints($winner, ExperiencePointsType::MATCH_WIN);

//            if ($this->achievementService->checkForAchievement($winner, new UnstoppableForceAchievement())) {
//                $this->achievementService->unlockAchievement($winner, AchievementType::UNSTOPPABLE_FORCE);
//            }
        }

        $this->entityManager->flush();
    }
}