<?php

declare(strict_types=1);


namespace App\Controller\Profile;

use App\Dto\UserDto;
use App\Entity\User;
use App\Enum\GameType;
use App\Service\GameService;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/profile', name: 'app_profile_')]
class ProfileController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia, GameService $gameService)
    {
        /** @var User $user */
        $user = $this->getUser();
        $friendsCount = count($user->getFriends());
        $hostedTournamentsCount = count($user->getHostedTournaments());
        $wonTournamentsCount = count($user->getWonTournaments());
        $selectedGames = $user->getSelectedGames();
        $selectedGamesArray = $gameService->generateSelectedGamesArray($selectedGames, $user);
        $userDto = UserDto::createFromUser($user);

        return $inertia->render("Profile/View", [
            'user' => $userDto,
            'friends' => $friendsCount,
            'hostedTournaments' => $hostedTournamentsCount,
            'wonTournaments' => $wonTournamentsCount,
            'selectedGames' => $selectedGamesArray,
            'isMe' => true,
            'isFriend' => false,
            'isRequestSent' => false,
            'isRequestingToBeFriend' => false,
        ]);
    }

    #[Route('/edit', name: 'edit')]
    public function edit(InertiaInterface $inertia, GameService $gameService)
    {
        $user = $this->getUser();
        $gamesList = GameType::cases();
        $selectedGames = $user->getSelectedGames();
        $selectedGamesArray = $gameService->generateSelectedGamesArray($selectedGames, $user);

        array_shift($gamesList);
        $userDto = UserDto::createFromUser($user);

        return $inertia->render("Profile/Edit", [
            'user' => $userDto,
            'games' => $gamesList,
            'selectedGames' => $selectedGamesArray
        ]);
    }
}