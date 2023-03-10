<?php

namespace App\Controller\Tournaments;

use App\Entity\Tournament;
use App\Repository\TournamentRepository;
use App\Service\JsonSerializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Rompetomp\InertiaBundle\Service\InertiaInterface;

#[Route('/tournaments', name: 'app_tournaments_')]
class TournamentController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(
        InertiaInterface $inertia,
        TournamentRepository $tournamentRepository,
        JsonSerializer $jsonSerializer
    ): Response
    {
        $isLoggedIn = (bool)$this->getUser();
        $serializationGroups = ['tournaments', 'users'];
        $tournaments = $tournamentRepository->findBy([], ['createdAt' => 'DESC']);
        $jsonTournaments = $jsonSerializer->serializeToJson($tournaments, $serializationGroups);

        return $inertia->render("Tournaments/Tournaments", [
            "tournaments" => $jsonTournaments,
            "isLoggedIn" => $isLoggedIn
        ]);
    }

    #[Route('/create', name: 'create')]
    public function create(
        InertiaInterface $inertia,
    ): Response
    {
        return $inertia->render("Tournaments/Create", []);
    }

    #[Route('/{tournament}', name: 'view')]
    public function view(
        InertiaInterface $inertia,
        Tournament $tournament
    ): Response
    {
        return $inertia->render("Tournaments/Index", [
            'tournament' => $tournament
        ]);
    }
}
