<?php

declare(strict_types=1);


namespace App\Controller\Achievements;

use App\Entity\User;
use App\Enum\AchievementType;
use App\Service\AchievementService;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/achievements', name: 'app_achievements_')]
class AchievementController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia, AchievementService $achievementService)
    {
        /** @var User $user */
        $user = $this->getUser();

        $achievements = $achievementService->formatAchievementsForRendering($user);

        return $inertia->render("Achievements/Index", [
            'achievements' => $achievements
        ]);
    }
}