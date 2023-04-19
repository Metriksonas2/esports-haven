<?php

declare(strict_types=1);


namespace App\Controller\Profile;

use App\Dto\UserDto;
use App\Entity\User;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/profile', name: 'app_profile_')]
class ProfileController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        /** @var User $user */
        $user = $this->getUser();
        $friendsCount = count($user->getFriends());
        $hostedTournamentsCount = count($user->getHostedTournaments());
        $wonTournamentsCount = count($user->getWonTournaments());

        $userDto = UserDto::createFromUser($user);

        return $inertia->render("Profile/View", [
            'user' => $userDto,
            'friends' => $friendsCount,
            'hostedTournaments' => $hostedTournamentsCount,
            'wonTournaments' => $wonTournamentsCount,
            'isMe' => true,
            'isFriend' => false,
            'isRequestSent' => false,
            'isRequestingToBeFriend' => false,
        ]);
    }

    #[Route('/edit', name: 'edit')]
    public function edit(InertiaInterface $inertia)
    {
        $user = $this->getUser();

        return $inertia->render("Profile/Edit", [
            'user' => $user,
        ]);
    }
}