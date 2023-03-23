<?php

namespace App\Service;

use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use Doctrine\ORM\EntityManagerInterface;

class TournamentMatchService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function saveTournamentMatches(
        Tournament $tournament,
        string $matchName,
        string $state,
        array $participants,
        bool $flush = false
    ): bool|array
    {
        try {
            $tournamentMatchesArray = [];

            // Creating first matches for the tournament
            for ($i = 0; $i < sizeof($participants); $i += 2) {
                $newTournamentMatch = new TournamentMatch();
                $newTournamentMatch->setTournament($tournament);
                $newTournamentMatch->setName($matchName);
                $newTournamentMatch->setStartDate(new \DateTime());
                $newTournamentMatch->setState($state);
                $newTournamentMatch->addParticipant($participants[$i]);
                $newTournamentMatch->addParticipant($participants[$i + 1]);

                $tournamentMatchesArray[] = $newTournamentMatch;
                $this->entityManager->persist($newTournamentMatch);
            }

            // This part is for creating other upcoming matches for the tournament
            // Example: 8 (7 matches, 7 - (8 / 2) = 3 matches to create)
            $emptyUpcomingMatchesCount = (sizeof($participants) - 1) - (sizeof($participants) / 2);
            for ($i = 0; $i < $emptyUpcomingMatchesCount; $i++) {
                $newTournamentMatch = new TournamentMatch();
                $newTournamentMatch->setTournament($tournament);
                $newTournamentMatch->setName($matchName);
                $newTournamentMatch->setState('NOT_STARTED');

                $tournamentMatchesArray[] = $newTournamentMatch;
                $this->entityManager->persist($newTournamentMatch);
            }

            if ($flush) {
                $this->entityManager->flush();
            }

            return $tournamentMatchesArray;
        } catch (\Exception $e) {
            return false;
        }
    }
}