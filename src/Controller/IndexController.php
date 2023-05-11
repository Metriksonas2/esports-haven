<?php

namespace App\Controller;

use App\Enum\GameType;
use App\Service\TournamentService;
use Doctrine\ORM\EntityManagerInterface;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function confirm(InertiaInterface $inertia, TournamentService $tournamentService): Response
    {
        $isLoggedIn = (bool)$this->getUser();

        if ($isLoggedIn) {
            $tournamentCountForEachGame = $tournamentService->getTournamentCountForEachGame();

            return $inertia->render("Tournaments/Dashboard", [
                'tournamentCountForEachGame' => $tournamentCountForEachGame,
            ]);
        }

        return $inertia->render("Index/IndexNew", [
            'isLoggedIn' => $isLoggedIn
        ]);
    }
}