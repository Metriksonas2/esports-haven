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
        array $matches,
        bool $flush = false
    ): bool|array
    {
        try {
            $tournamentMatchesArray = [];

            $participantsIndex = 0;

            foreach ($matches as $match) {
                $newTournamentMatch = new TournamentMatch();

                // Check if "ghost" match
                $isGhostMatch = $this->checkIfGhostMatch($match, $newTournamentMatch);

                if (!$isGhostMatch) {
                    $this->tryAddParticipant(0, $match, $newTournamentMatch, $participantsIndex, $participants);
                    $this->tryAddParticipant(1, $match, $newTournamentMatch, $participantsIndex, $participants);
                }

                $newTournamentMatch->setTournament($tournament);
                $newTournamentMatch->setName($matchName);
                $newTournamentMatch->setStartDate(new \DateTime($match['startTime']));
                $newTournamentMatch->setState($match['state']);

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

    private function tryAddParticipant(
        int $participantNumber, array $matchArrayObject,
        TournamentMatch $newTournamentMatch, int &$participantsIndex,
        array $participants,
    )
    {
        if ($matchArrayObject['participants'][$participantNumber]['id'] !== '-' &&
            $matchArrayObject['participants'][$participantNumber]['id'] !== 'TBD'
        ) {
            $newTournamentMatch->addParticipant($participants[$participantsIndex]);
            $participantsIndex++;
        }
    }

    private function checkIfGhostMatch(array $matchArrayObject, TournamentMatch $newTournamentMatch): bool
    {
        $isGhostMatch = false;

        if ($matchArrayObject['participants'][0]['id'] === '-' &&
            $matchArrayObject['participants'][1]['id'] === '-'
        ) {
            $isGhostMatch = true;
        }

        $newTournamentMatch->setIsGhostMatch($isGhostMatch);
        return $isGhostMatch;
    }

    public function syncNextMatchIds(Tournament $tournament): void
    {
        try {
            $matches = $tournament->getTournamentMatches()->toArray();
            $indexForNextMatch = (count($matches) + 1) / 2;
            $iterator = 1;

            for ($i = $matches[0]->getId(); $i < $matches[count($matches) - 1]->getId(); $i++) {
                if ($iterator % 2 === 0) {
                    $indexForNextMatch--;
                }

                $nextMatch = $this->entityManager->getRepository(TournamentMatch::class)->find($i + $indexForNextMatch);
                $matches[$iterator - 1]->setNextMatch($nextMatch);

                $iterator++;
            }

            // Set final match's next match = 'null'
            $matches[count($matches) - 1]->setNextMatch(null);
            $tournament->setMatchesSynced(true);

            $this->entityManager->flush();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}