<?php

declare(strict_types=1);


namespace App\Controller\Friends;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/friends', name: 'app_friends_')]
class FriendController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        return $inertia->render("Friends/Index", []);
    }
}