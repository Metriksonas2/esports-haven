<?php

declare(strict_types=1);


namespace App\Controller\Achievements;

use App\Entity\User;
use Rompetomp\InertiaBundle\Service\InertiaInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/achievements', name: 'app_achievements_')]
class AchievementController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(InertiaInterface $inertia)
    {
        /** @var User $user */
        $user = $this->getUser();

        return $inertia->render("Achievements/Index", []);
    }
}