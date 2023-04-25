<?php

namespace App\Service;

use App\Dto\TournamentDto;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use Doctrine\ORM\EntityManagerInterface;

class TournamentService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function tournamentDtosFromTournamentForEachDay(array $tournamentsForEachDay)
    {
        $newTournamentsArray = $tournamentsForEachDay;

        for ($i = 1; $i <= count($tournamentsForEachDay); $i++) {
            $tournamentDtoArray = [];
            foreach ($tournamentsForEachDay[$i] as $tournament) {
                $tournamentDtoArray[] = TournamentDto::createFromTournament($tournament);
            }
            $newTournamentsArray[$i] = $tournamentDtoArray;
        }

        return $newTournamentsArray;
    }
}