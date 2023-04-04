<?php

declare(strict_types=1);


namespace App\Controller\Profile;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/profile', name: 'app_profile_')]
class ProfileController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        $user = $this->getUser();

        return $inertia->render("Profile/View", [
            'user' => $user,
            'isMe' => true,
            'isFriend' => false,
            'isRequestSent' => false,
            'isRequestingToBeFriend' => false,
        ]);
    }
}