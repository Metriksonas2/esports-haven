<?php

declare(strict_types=1);


namespace App\Controller\Schedule;

use App\Entity\Tournament;
use App\Service\TournamentService;
use Doctrine\ORM\EntityManagerInterface;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/schedule', name: 'app_schedule_')]
class ScheduleController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager,
    )
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia, TournamentService $tournamentService)
    {
        $user = $this->getUser();
        $tournamentsForEachDay = $this->entityManager->getRepository(Tournament::class)->findTournamentsByDay($user);
        $tournamentDtoForEachDay = $tournamentService->tournamentDtosFromTournamentForEachDay($tournamentsForEachDay);

        return $inertia->render("Schedule/Index", [
            'tournamentsForEachDay' => $tournamentDtoForEachDay
        ]);
    }
}