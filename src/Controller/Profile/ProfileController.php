<?php

declare(strict_types=1);


namespace App\Controller\Profile;

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

        return $inertia->render("Profile/View", [
            'user' => $user,
            'friends' => $friendsCount,
            'hostedTournaments' => $hostedTournamentsCount,
            'wonTournaments' => $wonTournamentsCount,
            'isMe' => true,
            'isFriend' => false,
            'isRequestSent' => false,
            'isRequestingToBeFriend' => false,
        ]);
    }
}