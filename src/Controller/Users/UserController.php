<?php

declare(strict_types=1);


namespace App\Controller\Users;

use App\Entity\User;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user', name: 'app_user_')]
class UserController extends AbstractController
{
    #[Route('/{user}', name: 'index')]
    public function index(User $user, InertiaInterface $inertia)
    {
        return $inertia->render("Profile/View", [
            'user' => $user,
        ]);
    }
}