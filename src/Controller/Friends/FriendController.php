<?php

declare(strict_types=1);


namespace App\Controller\Friends;

use App\Service\FriendService;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/friends', name: 'app_friends_')]
class FriendController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia, FriendService $friendService)
    {
        $user = $this->getUser();
        $friends = $friendService->getUsersDtoArrayFromFriendsArray($user->getFriends());
        $friendRequests = $friendService->getUsersDtoArrayFromFriendsArray(
            $friendService->getFromUserArrayFromFriendRequests($user->getFriendRequests())
        );

        return $inertia->render("Friends/Index", [
            'friends' => $friends,
            'friendRequests' => $friendRequests,
        ]);
    }
}