<?php

namespace App\Service;

use App\Dto\TournamentDto;
use App\Entity\Tournament;
use App\Entity\TournamentMatch;
use App\Enum\GameType;
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

    public function getTournamentCountForEachGame(): array
    {
        $tournamentsCountForEachGame = [];
        $games = GameType::cases();
        array_shift($games);

        $tournamentRepository = $this->entityManager->getRepository(Tournament::class);;

        foreach ($games as $game) {
            $tournaments = $tournamentRepository->findBy(['game' => $game->value]);
            $tournamentsCountForEachGame[$game->value] = count($tournaments);
        }

        return $tournamentsCountForEachGame;
    }
}