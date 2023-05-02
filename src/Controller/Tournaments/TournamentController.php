<?php

namespace App\Controller\Tournaments;

use App\Dto\TournamentDto;
use App\Dto\UserDto;
use App\Entity\Tournament;
use App\Enum\GameType;
use App\Repository\TournamentRepository;
use App\Repository\UserRepository;
use App\Service\JsonSerializer;
use App\Service\TournamentMatchService;
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
    ): Response
    {
        $user = $this->getUser();

        $tournaments = $tournamentRepository->findBy([], ['createdAt' => 'DESC']);
        $hostedTournaments = $tournamentRepository->findBy(['host' => $user], ['createdAt' => 'DESC']);
        $wonTournaments = $tournamentRepository->findBy(['winner' => $user], ['createdAt' => 'DESC']);

        $tournamentsDto = TournamentDto::createFromTournaments($tournaments);
        $hostedTournamentsDto = TournamentDto::createFromTournaments($hostedTournaments);
        $wonTournamentsDto = TournamentDto::createFromTournaments($wonTournaments);

        return $inertia->render("Tournaments/Tournaments", [
            'tournaments' => $tournamentsDto,
            'hostedTournaments' => $hostedTournamentsDto,
            'wonTournaments' => $wonTournamentsDto,
        ]);
    }

    #[Route('/create', name: 'create')]
    public function create(
        InertiaInterface $inertia,
        UserRepository $userRepository,
    ): Response
    {
        $users = $userRepository->findAll();
        $usersDto = UserDto::createFromUsers($users);

        return $inertia->render("Tournaments/Create", [
            'games' => GameType::cases(),
            'users' => $usersDto,
        ]);
    }

    #[Route('/{tournament}', name: 'view')]
    public function view(
        InertiaInterface $inertia,
        Tournament $tournament,
        TournamentMatchService $tournamentMatchService,
    ): Response
    {
        if (!$tournament->isMatchesSynced()) {
            $tournamentMatchService->syncNextMatchIds($tournament);
        }

        $tournamentDto = TournamentDto::createFromTournament($tournament);

        return $inertia->render("Tournaments/Index", [
            'tournament' => $tournamentDto
        ]);
    }

    #[Route('/manage/{tournament}', name: 'manage')]
    public function manage(
        InertiaInterface $inertia,
        Tournament $tournament,
        TournamentMatchService $tournamentMatchService,
    ): Response
    {
        $isTournamentHost = $tournament->getHost() === $this->getUser();
        if ($isTournamentHost || $this->isGranted('ROLE_ADMIN')) {
            if (!$tournament->isMatchesSynced()) {
                $tournamentMatchService->syncNextMatchIds($tournament);
            }

            $tournamentDto = TournamentDto::createFromTournament($tournament);

            return $inertia->render("Tournaments/Edit", [
                'tournament' => $tournamentDto,
                'games' => GameType::cases(),
            ]);
        } else {
            return $this->redirectToRoute('app_index');
        }
    }
}
