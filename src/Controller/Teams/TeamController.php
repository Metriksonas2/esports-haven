<?php

declare(strict_types=1);


namespace App\Controller\Teams;

use App\Entity\User;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/teams', name: 'app_teams_')]
class TeamController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        /** @var User $user */
        $user = $this->getUser();

        return $inertia->render("Teams/Index", []);
    }
}