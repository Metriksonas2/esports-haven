<?php

declare(strict_types=1);


namespace App\EventListener;

use App\Entity\TournamentMatch;
use App\Enum\TournamentStatusType;
use App\Event\AfterTournamentCreatedEvent;
use Doctrine\ORM\EntityManagerInterface;

class TournamentListener implements \Symfony\Component\EventDispatcher\EventSubscriberInterface
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            AfterTournamentCreatedEvent::class => 'checkTournamentStatus',
        ];
    }

    public function setCorrectNextMatchIds(AfterTournamentCreatedEvent $event): void
    {
        try {
            $tournament = $event->getTournament();
            $matches = $tournament->getTournamentMatches();
            $indexForNextMatch = (count($matches) + 1) / 2;
            $iterator = 1;

            for ($i = $matches[0]->getId(); $i < $matches[count($matches) - 1]->getId(); $i++) {
                if ($iterator % 2 === 0) {
                    $indexForNextMatch--;
                }

                $nextMatch = $this->entityManager->getRepository(TournamentMatch::class)->find($indexForNextMatch);

                $matches[$i]->setNextMatch($nextMatch);
                $this->entityManager->persist($matches[$i]);

                $iterator++;
            }

            // Set final match's next match = 'null'
            $matches[count($matches) - 1]->setNextMatch(null);
            $this->entityManager->persist($matches[count($matches) - 1]);
            $this->entityManager->flush();
        } catch (\Exception $e) {
            throw new \Exception('Something went wrong, when setting tournament next matches');
        }
    }

    public function checkTournamentStatus(AfterTournamentCreatedEvent $event): void
    {
        $tournament = $event->getTournament();

        if ($tournament->getStartDate() <= new \DateTime()) {
            $tournament->setStatus(TournamentStatusType::IN_PROGRESS);

            $this->entityManager->flush();
        }
    }
}