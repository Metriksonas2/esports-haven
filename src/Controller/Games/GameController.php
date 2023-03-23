<?php

declare(strict_types=1);


namespace App\Controller\Games;

use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/games', name: 'app_games_')]
class GameController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        return $inertia->render("Games/Index", []);
    }
}