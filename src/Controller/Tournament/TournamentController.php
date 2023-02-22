<?php

namespace App\Controller\Tournament;

use App\Repository\TournamentRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Rompetomp\InertiaBundle\Service\InertiaInterface;

class TournamentController extends AbstractController
{
    #[Route('/', name: 'app_tournament')]
    public function index(
        InertiaInterface $inertia,
        TournamentRepository $tournamentRepository,
    ): Response
    {
        $tournaments = $tournamentRepository->findBy([], ['createdAt' => 'DESC']);

        return $inertia->render("Tournaments/Index", [
            "tournaments" => $tournaments
        ]);
    }

    #[Route('/tournaments/confirm', name: 'app_tournament_create')]
    public function confirm(InertiaInterface $inertia): Response
    {
        return $inertia->render("Tournaments/Confirm", []);
    }
}
