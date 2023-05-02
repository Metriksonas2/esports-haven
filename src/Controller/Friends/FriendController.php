<?php

declare(strict_types=1);


namespace App\Controller\Friends;

use App\Service\FriendService;
use App\Service\GameService;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/friends', name: 'app_friends_')]
class FriendController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia, FriendService $friendService, GameService $gameService)
    {
        $user = $this->getUser();
        $friends = $friendService->getUsersDtoArrayFromFriendsArray($user->getFriends());
        $friendRequests = $friendService->getUsersDtoArrayFromFriendsArray(
            $friendService->getFromUserArrayFromFriendRequests($user->getFriendRequests())
        );

        $friendsSelectedGames = $gameService->getSelectedGamesForUsersDto($friends);
        $friendRequestsSelectedGames = $gameService->getSelectedGamesForUsersDto($friendRequests);

        return $inertia->render("Friends/Index", [
            'friends' => $friends,
            'friendRequests' => $friendRequests,
            'friendsSelectedGames' => $friendsSelectedGames,
            'friendRequestsSelectedGames' => $friendRequestsSelectedGames,
        ]);
    }
}