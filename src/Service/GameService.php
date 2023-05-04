<?php

namespace App\Service;

use App\Dto\UserDto;
use App\Entity\Endorsement;
use App\Entity\Game;
use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\User;
use App\Enum\GameType;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class GameService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function generateSelectedGamesArray(Collection $selectedGames, User $user): array
    {
        $selectedGamesArray = [];

        foreach ($selectedGames as $game) {
            $endorsements = $this->entityManager->getRepository(Endorsement::class)->findBy([
                'endorsedUser' => $user, 'game' => $game
            ]);
            $endorsementCount = count($endorsements);

            $selectedGamesArray[] = [
                'value' => $game->getName(),
                'label' => $game->getName(),
                'endorsements' => $endorsementCount,
            ];
        }

        return $selectedGamesArray;
    }

    public function addNewSelectedGames(User $user, array $games, $flush = false): void
    {
        $user->getSelectedGames()->clear();

        foreach ($games as $game) {
            $game = $this->entityManager->getRepository(Game::class)->findOneBy(['name' => $game]);
            $user->addSelectedGame($game);
        }

        if ($flush) {
            $this->entityManager->flush();
        }
    }

    public function getSelectedGamesForUsersDto(array $users): array
    {
        $selectedGamesForUsers = [];

        foreach ($users as $user) {
            $userObj = $this->entityManager->getRepository(User::class)->find($user->getId());
            $selectedGames = $userObj->getSelectedGames();
            $selectedGamesArray = $this->generateSelectedGamesArray($selectedGames, $userObj);

            $selectedGamesForUser = [];
            foreach ($selectedGamesArray as $game) {
                $selectedGamesForUser[] = $game['value'];
            }

            $selectedGamesForUsers[] = $selectedGamesForUser;
        }

        return $selectedGamesForUsers;
    }
}