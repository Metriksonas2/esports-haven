<?php

namespace App\Service;

use App\Dto\UserDto;
use App\Entity\Participant;
use App\Entity\Tournament;
use App\Entity\User;
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

    public function generateSelectedGamesArray(Collection $selectedGames): array
    {
        $selectedGamesArray = [];

        foreach ($selectedGames as $game) {
            $selectedGamesArray[] = [
                'value' => $game->getName(),
                'label' => $game->getName(),
            ];
        }

        return $selectedGamesArray;
    }
}